package com.mxtecorg.xchat;
import android.app.*;
import android.os.*;
import android.content.*;
import android.webkit.*;
import android.util.*;
import java.lang.ref.*;

public class BgService extends Service {
	private WebView webview;

	@Override
	public void onCreate()
	{
		// TODO: Implement this method
		super.onCreate();
		Log.i("Service" , "Created");
	}
	

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        // TODO do something useful
		Log.i("Service" , "Running");
        /*webview = new WebView(this);
		webview.loadUrl("file:///android_asset/xchat.html");
		JavaScriptInterface jsInterface = new JavaScriptInterface(this);
		webview.getSettings().setDomStorageEnabled(true);
		webview.getSettings().setAllowContentAccess(true);
		webview.getSettings().setAllowFileAccess(true);
		webview.getSettings().setJavaScriptEnabled(true);
		webview.addJavascriptInterface(jsInterface, "JSInterface");
	*/
        return Service.START_NOT_STICKY;
    }

    @Override
    public IBinder onBind(Intent intent) {
        // TODO for communication return IBinder implementation
        return null;
    }
}
