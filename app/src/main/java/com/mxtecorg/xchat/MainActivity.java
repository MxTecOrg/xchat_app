package com.mxtecorg.xchat;

import android.annotation.*;
import android.app.*;
import android.content.*;
import android.graphics.*;
import android.media.*;
import android.net.*;
import android.os.*;
import android.util.*;
import android.view.*;
import android.webkit.*;
import android.widget.*;
import java.lang.ref.*;
import android.view.View.*;
import android.provider.*;
import java.util.*;
import android.view.ViewTreeObserver.*;

public class MainActivity extends Activity
{ 
    public ValueCallback<Uri[]> uploadMessage;
	private ValueCallback<Uri> mUploadMessage;
	public static final int REQUEST_SELECT_FILE = 100;
	private final static int FILECHOOSER_RESULTCODE = 1;
	private WebView webview;
	private Button fakeClick;
	private TimerTask timerTask;
	private Splash splash; // = new Splash();

	public static WeakReference<MainActivity> weakActivity;
	public static MainActivity getmInstanceActivity()
	{
		return weakActivity.get();
	}

    @Override
    protected void onCreate(Bundle savedInstanceState)
	{
        super.onCreate(savedInstanceState);
		weakActivity = new WeakReference<>(MainActivity.this);

        setContentView(R.layout.activity_main);
		getExternalFilesDir(null);
        webview = findViewById(R.id.webview);
		splash = new Splash();
        splash.showDialog();


		webview.loadUrl("file:///android_asset/xchat.html");
		//webview.loadUrl("/sdcard/P/XChat/app/src/main/assets/xchat.html");


		JavaScriptInterface jsInterface = new JavaScriptInterface(this);
		webview.getSettings().setDomStorageEnabled(true);
		webview.getSettings().setAllowContentAccess(true);
		webview.getSettings().setAllowFileAccess(true);

		if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.KITKAT)
			webview.setLayerType(View.LAYER_TYPE_SOFTWARE, null);

		webview.getSettings().setJavaScriptEnabled(true);
		webview.addJavascriptInterface(jsInterface, "JSInterface");
		webview.setWebChromeClient(new WebChromeCli(webview));


		fakeClick = new Button(this);
        fakeClick.setOnClickListener(new View.OnClickListener() {

				@Override
				public void onClick(View v)
				{
					// TODO Auto-generated method stub
					fakeClick.playSoundEffect(0);
				}
			});
	}
	
	public boolean isLoaded = false;

	public void playSound()
	{
		fakeClick.performClick();
	}


    public void exitApp()
	{
		finishAffinity();
	}

	@Override
	protected void onPause()
	{
		// TODO: Implement this method
		super.onPause();
		//startService(new Intent(this, BgService.class));
		if (isLoaded) webview.loadUrl("javascript:OnPause(true);");
	}

	@Override
	protected void onResume()
	{
		// TODO: Implement this method
		super.onResume();
		//startService(new Intent(this, BgService.class));
		if (isLoaded) webview.loadUrl("javascript:OnResume(true);");
	}

	@Override
	public void onBackPressed()
	{
		// TODO: Implement this method
		//super.onBackPressed();

		if (isLoaded) webview.loadUrl("javascript:OnBack(true);");
	}



	class WebChromeCli extends WebChromeClient
	{
		private WebView webview;
		WebChromeCli(WebView webview)
		{
			this.webview = webview;
		}



		@Override
		public void onProgressChanged(WebView view, int newProgress)
		{
		    // TODO: Implement this method
			if (newProgress == 100) {
	            isLoaded = true;
				Timer timer = new Timer();
				timer.schedule(new TimerTask() {
						@Override
						public void run() {
							// Your database code here
							splash.closeDialog();
						}
					}, 1500);
		    }
			super.onProgressChanged(view, newProgress);
		}

		@Override
		public boolean onJsAlert(WebView view, String url, String message, JsResult result)
		{
			return super.onJsAlert(view, url, message, result);
	    }

		@Override
        public boolean onConsoleMessage(ConsoleMessage consoleMessage)
		{
		  webview.loadUrl("javascript:OnConsole(\"" + consoleMessage.message() + " -- From line "
							+ consoleMessage.lineNumber() + " of "
							+ consoleMessage.sourceId() + "\");");
			if(consoleMessage.messageLevel().toString().equals("ERROR")) webview.loadUrl("javascript:OnError(\"" + consoleMessage.message() + " -- From line "
							+ consoleMessage.lineNumber() + " of "
							+ consoleMessage.sourceId() + "\");");
							
			/*Log.i("Console" , consoleMessage.message() + " -- From line "
			 + consoleMessage.lineNumber() + " of "
			 + consoleMessage.sourceId());*/
            return super.onConsoleMessage(consoleMessage);
        }


		// For 3.0+ Devices (Start)
		// onActivityResult attached before constructor
		protected void openFileChooser(ValueCallback uploadMsg, String acceptType)
		{
			mUploadMessage = uploadMsg;
			Intent i = new Intent(Intent.ACTION_GET_CONTENT);
			i.addCategory(Intent.CATEGORY_OPENABLE);
			i.setType("*/*");
			startActivityForResult(Intent.createChooser(i, "File Chooser"), FILECHOOSER_RESULTCODE);
		}


		// For Lollipop 5.0+ Devices
		@TargetApi(Build.VERSION_CODES.LOLLIPOP)
		public boolean onShowFileChooser(WebView mWebView, ValueCallback<Uri[]> filePathCallback, FileChooserParams fileChooserParams)
		{
			if (uploadMessage != null)
			{
				uploadMessage.onReceiveValue(null);
				uploadMessage = null;
			}

			uploadMessage = filePathCallback;

			Intent intent = fileChooserParams.createIntent();
			try
			{
				startActivityForResult(intent, REQUEST_SELECT_FILE);
			}
			catch (ActivityNotFoundException e)
			{
				uploadMessage = null;
				Toast.makeText(MainActivity.this, "Ocurrio un error", Toast.LENGTH_LONG).show();
				return false;
			}
			return true;
		}

		//For Android 4.1 only
		protected void openFileChooser(ValueCallback<Uri> uploadMsg, String acceptType, String capture)
		{
			mUploadMessage = uploadMsg;
			Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
			intent.addCategory(Intent.CATEGORY_OPENABLE);
			intent.setType("*/*");
			startActivityForResult(Intent.createChooser(intent, "File Chooser"), FILECHOOSER_RESULTCODE);
		}

		protected void openFileChooser(ValueCallback<Uri> uploadMsg)
		{
			mUploadMessage = uploadMsg;
			Intent i = new Intent(Intent.ACTION_GET_CONTENT);
			i.addCategory(Intent.CATEGORY_OPENABLE);
			i.setType("*/*");
			startActivityForResult(Intent.createChooser(i, "File Chooser"), FILECHOOSER_RESULTCODE);
		}



	}

	public void setStatusBarColor(String color , String color2)
	{
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP)
		{
			Window w = getWindow();
			w.setStatusBarColor(Color.parseColor(color));
			w.setNavigationBarColor(Color.parseColor(color2));
		}
	}

	@Override
	public void onActivityResult(int requestCode, int resultCode, Intent intent)
	{
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP)
		{
			if (requestCode == REQUEST_SELECT_FILE)
			{
				if (uploadMessage == null)
					return;
				uploadMessage.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(resultCode, intent));
				uploadMessage = null;
			}
		}
		else if (requestCode == FILECHOOSER_RESULTCODE)
		{
			if (null == mUploadMessage)
				return;
			Uri result = intent == null || resultCode != MainActivity.RESULT_OK ? null : intent.getData();
			mUploadMessage.onReceiveValue(result);
			mUploadMessage = null;
		}
		else
			Toast.makeText(MainActivity.this, "Fallo al cargar el archivo", Toast.LENGTH_LONG).show();
	}

	public class Splash
	{
        final Dialog dialog = new Dialog(MainActivity.this , android.R.style.Theme_Black_NoTitleBar_Fullscreen );
		public void showDialog()
		{
			
			dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
			dialog.setCancelable(false);
			dialog.setContentView(R.layout.splash_screen);
            /*
			 TextView text = (TextView) dialog.findViewById(R.id.text_dialog);
			 text.setText(msg);

			 Button dialogButton = (Button) dialog.findViewById(R.id.btn_dialog);
			 dialogButton.setOnClickListener(new View.OnClickListener() {
			 @Override
			 public void onClick(View v) {
			 dialog.dismiss();
			 }
			 });
			 */
			dialog.show();

		}

		public void closeDialog()
		{
			dialog.dismiss();
		}
	}
} 
