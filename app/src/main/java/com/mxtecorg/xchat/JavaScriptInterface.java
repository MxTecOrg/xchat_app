package com.mxtecorg.xchat;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Build;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.widget.Toast;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import es.dmoral.toasty.*;
import android.view.*;
import java.io.*;

public class JavaScriptInterface
{
    private Activity act;
	private Context ctx;
	private Vibrator vibrator;
	private NotificationBuilder nb;
	private DBHelper db;

	public JavaScriptInterface(Context ctx)
	{
		this.ctx = ctx;
		//this.act = act;
		this.vibrator = (Vibrator) ctx.getSystemService(Context.VIBRATOR_SERVICE);
        nb = new NotificationBuilder(ctx);
		db = new DBHelper(ctx);
	}



	@JavascriptInterface
	public void toast(String text , String type)
	{
		switch (type)
		{
			case "error":
		        Toasty.error(ctx, text, Toast.LENGTH_SHORT, true).show();
				break;
			case "success":
				Toasty.success(ctx, text, Toast.LENGTH_SHORT, true).show();
				break;
			case "warn":
				Toasty.warning(ctx, text, Toast.LENGTH_SHORT, true).show();
				break;
			case "info":
				Toasty.success(ctx, text, Toast.LENGTH_SHORT, true).show();
				break;
			default:
			    Toasty.normal(ctx, text).show();
				break;
		}
	}



	@JavascriptInterface
	public void createCNoti(String channel , int noti_id , String title)
	{
		nb.createCNoti(channel , noti_id , title);
	}

	@JavascriptInterface
	public void createChannel(String channel)
	{
		nb.createChannel(channel);
	}

	@JavascriptInterface
	public void addMess(int noti_id , String name , String msg , int date)
	{
		nb.addMessage(noti_id , name , msg , date);
	}

	@JavascriptInterface
	public void deleteNoti(int noti_id)
	{
		nb.cancel(noti_id);
	}


	@JavascriptInterface
	public void askPerms(String perm)
	{
		String permission = permissions(perm);

		try
		{
			if (Build.VERSION.SDK_INT >= 23) ActivityCompat.requestPermissions(act,
																			   new String[]{permission},
																			   1);
		}
		catch (Exception e)
		{
			toast("" + e , "error");
		}
	}

	@JavascriptInterface
	public String checkPerms(String perm)
	{
		String perms = permissions(perm);
		if (perms.equals("")) return "not_found";
		if (ContextCompat.checkSelfPermission(ctx, perms) != PackageManager.PERMISSION_GRANTED)
		{
            return "false";
        }
		return "true";
	}

	private String permissions(String perm)
	{
		switch (perm)
		{
			case "STORAGE":
				return Manifest.permission.WRITE_EXTERNAL_STORAGE;
			default:
				return "";
		}
	}

	@JavascriptInterface
	public void vibrate(long time)
	{
	    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
		{
			vibrator.vibrate(VibrationEffect.createOneShot(time, VibrationEffect.DEFAULT_AMPLITUDE));
		}
		else
		{
			vibrator.vibrate(time);
		}
	}


	@JavascriptInterface
	public String listDir(String _path)
	{
		try
		{
			File path = new File(_path);
			File[] directory = path.listFiles();
			String list = "";

			for (File file : directory)
			{
				if (list != "") list += ",";
				list += file.getName();
			}
			return list;
		}
		catch (Exception e)
		{
			return "__ERROR__," + e;
		}
	}


	@JavascriptInterface
	public String readFile(String _path)
	{

		try
		{
		    File file = new File(_path);

			StringBuilder text = new StringBuilder();


			BufferedReader br = new BufferedReader(new FileReader(file));
			String line;

			while ((line = br.readLine()) != null)
			{
				text.append(line);
				text.append('\n');
			}
			br.close();
			return  "DONE||||||||||" + text.toString();
		}
		catch (FileNotFoundException e)
		{
			return "ERROR||||||||||" + e;
	    }
		catch (IOException e)
		{
			return "ERROR||||||||||" + e;
		}
		catch (Exception e)
		{
			return "ERROR||||||||||" + e;
	    }
	}


	@JavascriptInterface
	public String writeFile(String path , String content , boolean append)
	{
		try
		{
			File file = new File(path);
			if(append){
				FileOutputStream fos = new FileOutputStream(file , true);

				OutputStreamWriter out = new OutputStreamWriter(fos); 
				out.append(content);
				out.flush();
				out.close();
				return "DONE";
			}
		    FileOutputStream fos = new FileOutputStream(file);
			
			fos.write(content.getBytes());
		
			fos.flush();
			fos.close();
			return "DONE";
		}
		catch (FileNotFoundException e)
		{
			return "ERROR||||||||||" + e;
	    }
		catch (IOException e)
		{
			return "ERROR||||||||||" + e;
		}
		catch (Exception e)
		{
			return "ERROR||||||||||" + e;
	    }
	}

	@JavascriptInterface
	public String createDir(String path)
	{
		try
		{
			File folder = new File(path);
			if (folder.mkdir())
			{
				return "done";
			}
			else return "false";

		}
		catch (Exception e)
		{
			return "ERROR||||||||||" + e;
	    }
	}

	@JavascriptInterface
	public void sound_click()
	{
		MainActivity.getmInstanceActivity().playSound();
	}
	
	@JavascriptInterface
	public void exitApp(){
		MainActivity.getmInstanceActivity().exitApp();
	}
	
	@JavascriptInterface
	public String fileExists(String path)
	{
		try
		{
			File file = new File(path);
			if (file.exists()) return "true";
			else return "false";
		}
		catch (Exception e)
		{
			return "ERROR||||||||||" + e;
	    }
	}

	@JavascriptInterface
	public String isFile(String path)
	{
		try
		{
			File file = new File(path);
			if (file.isFile()) return "true";
			else return "false";
		}
		catch (Exception e)
		{
			return "ERROR||||||||||" + e;
	    }
	}

	@JavascriptInterface
	public String isFolder(String path)
	{
		try
		{
			File file = new File(path);
			if (file.isDirectory()) return "true";
			else return "false";
		}
		catch (Exception e)
		{
			return "ERROR||||||||||" + e;
	    }
	}

	@JavascriptInterface
	public String getStatics()
	{
	    try
		{
			return "{ " +
				"\"host\" : \"" + new GetString(ctx).get("host") + "\"," +
				"\"login\" : \"" + new GetString(ctx).get("login") + "\"," +
				"\"register\" : \"" + new GetString(ctx).get("register") + "\"," +		
				"\"resendToken\" : \"" + new GetString(ctx).get("resendToken") + "\"," +
				"\"verify\" : \"" + new GetString(ctx).get("verify") + "\"," +
				"\"socket\" : \"" + new GetString(ctx).get("socket") + "\"," +
				"\"host\" : \"" + new GetString(ctx).get("host") + "\"," +
				"\"appPackage\" : \"" + new GetString(ctx).get("appPackage") + "\"," +
				"\"dataStorage\" : \"" + new GetString(ctx).get("dataStorage") + "\"," +
				"\"appName\" : \"" + new GetString(ctx).get("appName") + "\"," +
				"\"internalStorage\" : \"" + new GetString(ctx).get("internalStorage") + "\"," +
				"\"appStorage\" : \"" + new GetString(ctx).get("appStorage") + "\"," +
				"\"externalStorage\" : \"" + new GetString(ctx).get("externalStorage") + "\"" +
				"}";
	    }
		catch (Exception e)
		{
			Log.e("Statics" , ""+e);
			return "{}";
	    }
	}

	@JavascriptInterface
	public String hasInternet()
	{
		ConnectivityManager connectivityManager 
			= (ConnectivityManager) ctx.getSystemService(Context.CONNECTIVITY_SERVICE);
		NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
		return String.valueOf(activeNetworkInfo != null && activeNetworkInfo.isConnected());
	}

	@JavascriptInterface
	public void setStatusBarColor(String color , String color2)
	{
	    MainActivity.getmInstanceActivity().setStatusBarColor(color , color2);

	}



	@JavascriptInterface
	public void log(String tag , String msg)
	{
		Log.i(tag , msg);
	}
	
	@JavascriptInterface
	public void createRoomTable(){
		db.createRoomTable();
	}
	
	@JavascriptInterface
	public String createRoom(String chat_id , String pic , String type , String gType,
	String link , String name , String desc , String bgColor , String textColor , String owner, 
	String admins , String members , String banList , String bots, String pinned , String level)
{
		if(db.createRoom(chat_id , pic , type , gType,
			 link ,  name ,  desc , bgColor , textColor ,  owner, 
			admins , members , banList , bots, pinned , level)) return "true";
			else return "false";
	}
	
	@JavascriptInterface
	public String updateRoom(String chat_id , String pic , String type , String gType,
							 String link , String name , String desc , String bgColor , String textColor , String owner, 
							 String admins , String members , String banList , String bots, String pinned , String level)
	{
		if(db.updateRoom(chat_id , pic , type , gType,
						 link ,  name ,  desc , bgColor , textColor ,  owner, 
						 admins , members , banList , bots, pinned , level)) return "true";
		else return "false";
	}
	
	@JavascriptInterface
	public String updateRoomData(String chat_id , String key , String value){
		if(db.updateRoomData(chat_id , key , value)) return "true";
		else return "false";
	}
	
	@JavascriptInterface
	public String deleteRoom(String chat_id){
		return String.valueOf(db.deleteRoom(chat_id));
	}
	
	@JavascriptInterface
	public void createMessageTable(String chat_id){
		db.createMessageTable(chat_id);
	}
	
	@JavascriptInterface
	public String getAllRooms(){
		return db.getAllRooms();
	}
	
	@JavascriptInterface
	public String getRoomData(String chat_id){
		return db.getRoomData(chat_id);
	}
	
	@JavascriptInterface
	public String getAllRoomsData(){
		return db.getAllRoomsData();
	}
	
	@JavascriptInterface
	public String roomsLength(){
		return String.valueOf(db.roomsLength());
	}
	
	@JavascriptInterface
	public String addMessage(String mess_id , String user_id , String user_nick , String user_color,
							 String chat_id , String type , String reply , int shared , int isEdited , int isBot,
							 String receivedBy , String seenBy , String message , String inline , String keyboard , int date)
	{
		if(db.addMessage(mess_id , user_id , user_nick ,  user_color,
			chat_id , type , reply , shared , isEdited , isBot,
			 receivedBy ,  seenBy , message ,  inline ,  keyboard ,date)){
				return "true";
			}else return "false";
		
	}
	
	@JavascriptInterface
	public String updateMessage(String mess_id , String user_id , String user_nick , String user_color,
							 String chat_id , String type , String reply , int shared , int isEdited , int isBot,
							 String receivedBy , String seenBy , String message , String inline , String keyboard , int date)
	{
		if(db.updateMessage(mess_id , user_id , user_nick ,  user_color,
						 chat_id , type , reply , shared , isEdited , isBot,
						 receivedBy ,  seenBy , message ,  inline ,  keyboard ,date)){
			return "true";
		}else return "false";

	}
	
	@JavascriptInterface
	public String updateMessageData(String chat_id , String mess_id , String key , String value){
		if(db.updateMessageData(chat_id , mess_id , key , value)) return "true";
		else return "false";
	}
	
	@JavascriptInterface
	public String getMessageData(String chat_id , String mess_id){
		return db.getMessageData(chat_id , mess_id);
	}
	
	@JavascriptInterface
	public String getChatLength(String chat_id){
		return db.getChatLength(chat_id);
	}
	
	@JavascriptInterface
	public String getAllMessInRoom(String chat_id , String start , String end){
		return db.getAllMessInRoom(chat_id , start , end);
	}
	
	@JavascriptInterface
	public void deleteMessages(String chat_id){
		db.deleteMessages(chat_id);
	}
	
	@JavascriptInterface
	public String getRoomMessages(String chat_id){
		return db.getRoomMessages(chat_id);
	}
	
	@JavascriptInterface
	public void createContactsTable(){
		db.createContactsTable();
	}
	
	@JavascriptInterface
	public void addContact(int user_id , String email , String c_nick , String nick , String pic ,
	String desc , String color , String statuses){
		db.createContact(user_id , email , c_nick , nick , pic , desc , color , statuses);
	}
	
	@JavascriptInterface
	public void updateContact(int user_id , String email , String c_nick , String nick , String pic ,
						   String desc , String color , String statuses){
		db.updateContact(user_id , email , c_nick , nick , pic , desc , color , statuses);
	}
	
	@JavascriptInterface
	public void updateContactData(String user_id , String key , String value){
		db.updateContactData(user_id , key , value);
	}
	
	@JavascriptInterface
	public String getAllContacts(){
		return db.getAllContacts();
	}
	
	@JavascriptInterface
	public String getContactData(String user_id){
		return db.getContactData(user_id);
	}
	
	@JavascriptInterface
	public String getAllContactsData(){
		return db.getAllContactsData();
	}
	
	@JavascriptInterface
	public void deleteContact(String user_id){
		db.deleteContact(user_id);
	}
}
