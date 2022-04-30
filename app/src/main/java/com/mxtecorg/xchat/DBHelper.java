package com.mxtecorg.xchat;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.DatabaseUtils;
import android.database.sqlite.SQLiteOpenHelper;
import android.database.sqlite.SQLiteDatabase;
import android.text.style.*;
import android.util.*;
import android.database.sqlite.*;
import android.database.*;
import java.util.*;

public class DBHelper extends SQLiteOpenHelper
{

	public static final String DATABASE_NAME = "database.db";

	private HashMap hp;

	public DBHelper(Context context)
	{
		super(context, DATABASE_NAME , null, 1);
	}

	@Override
	public void onCreate(SQLiteDatabase db)
	{
		Log.i("onCreate" , "true");
		db.execSQL(
			"CREATE TABLE IF NOT EXISTS rooms " +
			"(chat_id text , pic text , type text, gType text , link text , name text ," +
			"desc text , bgColor text , textColor text , owner text , admins text , " +
			"members text, banList text , bots text , pinned text , level text )"
		);
	}

	public void createRoomTable()
	{
		SQLiteDatabase db = this.getWritableDatabase();
		db.execSQL(
			"CREATE TABLE IF NOT EXISTS rooms " +
			"(chat_id text , pic text , type text, gType text , link text , name text ," +
			"desc text , bgColor text , textColor text , owner text , admins text , " +
			"members text, banList text , bots text , pinned text , level text )"
		);
	}

	public void createMessageTable(String chat_id)
	{
		SQLiteDatabase db = this.getWritableDatabase();
		db.execSQL(
		    "CREATE TABLE IF NOT EXISTS " + chat_id + " " +
			"(" +
			"mess_id text , user_id text , user_nick text , user_color text , chat_id text, " +
			"type text , reply text , shared integer , isEdited integer , isBot integer , " +
			"receivedBy text , seenBy text , message text , inline text , keyboard text , date integer" +
			")");
	}


	@Override
	public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion)
	{
		// TODO Auto-generated method stub
		//db.execSQL("DROP TABLE IF EXISTS rooms");
		onCreate(db);
	}

	public boolean createRoom(String chat_id , String pic , String type , String gType,
							  String link , String name , String desc , String bgColor , String textColor , String owner, 
							  String admins , String members , String banList , String bots, String pinned , String level)
	{
		SQLiteDatabase db = this.getWritableDatabase();
		ContentValues contentValues = new ContentValues();
		contentValues.put("chat_id", chat_id);
		contentValues.put("pic", pic);
		contentValues.put("type", type);	
		contentValues.put("gType", gType);
		contentValues.put("link", link);
		contentValues.put("name", name);
		contentValues.put("desc", desc);
		contentValues.put("bgColor", bgColor);	
		contentValues.put("textColor", textColor);
		contentValues.put("owner", owner);
		contentValues.put("admins", admins);
		contentValues.put("members", members);
		contentValues.put("banList", banList);	
		contentValues.put("bots", bots);
		contentValues.put("pinned", pinned);
		contentValues.put("level", level);
		try
		{
			db.insert("rooms", null, contentValues);
			return true;
		}
		catch (SQLiteException e)
		{
			Log.e("DB ex" , e + "");
			return false;
		}
	}

	public boolean updateRoom(String chat_id , String pic , String type , String gType,
							  String link , String name , String desc , String bgColor , String textColor , String owner, 
							  String admins , String members , String banList , String bots, String pinned , String level)
	{
		SQLiteDatabase db = this.getWritableDatabase();
		ContentValues contentValues = new ContentValues();
		contentValues.put("pic", pic);
		contentValues.put("type", type);	
		contentValues.put("gType", gType);
		contentValues.put("link", link);
		contentValues.put("name", name);
		contentValues.put("desc", desc);
		contentValues.put("bgColor", bgColor);	
		contentValues.put("textColor", textColor);
		contentValues.put("owner", owner);
		contentValues.put("admins", admins);
		contentValues.put("members", members);
		contentValues.put("banList", banList);	
		contentValues.put("bots", bots);
		contentValues.put("pinned", pinned);
		contentValues.put("level", level);
		try
		{
			db.update("rooms", contentValues , " chat_id = ? " , new String[] {chat_id});
			return true;
		}
		catch (SQLiteException e)
		{
			Log.e("Ex Db" , "" + e);
			return false;
		}
	}

	public boolean updateRoomData(String chat_id , String key , String value)
	{
		SQLiteDatabase db = this.getWritableDatabase();
		ContentValues contentValues = new ContentValues();
		contentValues.put(key, value);
		db.update("rooms", contentValues , " chat_id = ? " , new String[] {chat_id});
		return true;
	}

	public String getRoomData(String chat_id)
	{
		try
		{
			SQLiteDatabase db = this.getReadableDatabase();
			Cursor res =  db.rawQuery("SELECT * FROM  rooms WHERE chat_id='" + chat_id + "'" , null);
			res.moveToFirst();
			final String _chat_id = res.getString(res.getColumnIndex("chat_id"));
			final String pic = res.getString(res.getColumnIndex("pic"));
			final String type = res.getString(res.getColumnIndex("type"));	
			final String gType = res.getString(res.getColumnIndex("gType"));
			final String link = res.getString(res.getColumnIndex("link"));
			final String name = res.getString(res.getColumnIndex("name"));
			final String desc = res.getString(res.getColumnIndex("desc"));	
			final String bgColor = res.getString(res.getColumnIndex("bgColor"));
			final String textColor = res.getString(res.getColumnIndex("textColor"));	
			final String owner = res.getString(res.getColumnIndex("owner"));
			final String admins = res.getString(res.getColumnIndex("admins"));
			final String members = res.getString(res.getColumnIndex("members"));
			final String banList = res.getString(res.getColumnIndex("banList"));	
			final String bots = res.getString(res.getColumnIndex("bots"));
			final String pinned = res.getString(res.getColumnIndex("pinned"));	
			final String level = res.getString(res.getColumnIndex("level"));

			return "{\"chat_id\" : \"" + _chat_id + "\"," +
				"\"pic\" : \"" + pic + "\"," +
				"\"type\" : \"" + type + "\"," +
				"\"gType\" : \"" + gType + "\"," +
				"\"link\" : \"" + link + "\"," +
				"\"name\" : \"" + name + "\"," +
				"\"dec\" : \"" + desc + "\"," +
				"\"bgColor\" : \"" + bgColor + "\"," +
				"\"textColor\" : \"" + textColor + "\"," +
				"\"owner\" : \"" + owner + "\"," +
				"\"admins\" : \"" + admins + "\"," +
				"\"members\" : \"" + members + "\"," +
				"\"banList\" : \"" + banList + "\"," +
				"\"bots\" : \"" + bots + "\"," +
				"\"pinned\" : \"" + pinned + "\"," +
				"\"level\" : \"" + level + "\"" +
				"}";
		}
		catch (SQLiteException e)
		{
			Log.e("DB err" , "" + e);
			return "null";
		}
	}

	public String getAllRooms()
	{
		SQLiteDatabase db = this.getReadableDatabase();
		Cursor res =  db.rawQuery("SELECT * FROM  rooms" , null);
		String ret = "";
		int c = 0;
		res.moveToFirst();
		while (res.isAfterLast() == false)
		{
			ret += res.getString(res.getColumnIndex("chat_id")) + (c != 0 ? "," : "");
			res.moveToNext();
			c++;
		}
		return ret;
	}
	
	public String getAllRoomsData(){
		String[] rooms = getAllRooms().split(",");
		String ret = "{";
		int c = 0;
		for(String room : rooms){
			String data = getRoomData(room);
			ret += (c != 0 ? "," : "") + "\"" + room + "\":" + data;
			c++;
		}
		ret += "}";
		return ret;
	}

	public int roomsLength()
	{
		SQLiteDatabase db = this.getReadableDatabase();
		int numRows = (int) DatabaseUtils.queryNumEntries(db, "rooms");
		return numRows;
	}


	public Integer deleteRoom(String chat_id)
	{
		SQLiteDatabase db = this.getWritableDatabase();
		return db.delete("rooms", 
						 "chat_id = ? ", 
						 new String[] { chat_id });
	}


	public boolean addMessage(String mess_id , String user_id , String user_nick , String user_color,
							  String chat_id , String type , String reply , int shared , int isEdited , int isBot,
							  String receivedBy , String seenBy , String message , String inline , String keyboard , int date)
	{
		SQLiteDatabase db = this.getWritableDatabase();
		ContentValues contentValues = new ContentValues();
		contentValues.put("mess_id", mess_id);
		contentValues.put("user_id", user_id);	
		contentValues.put("user_nick", user_nick);
		contentValues.put("user_color", user_color);
		contentValues.put("chat_id", chat_id);
		contentValues.put("type", type);
		contentValues.put("reply", reply);	
		contentValues.put("shared", shared);
		contentValues.put("isEdited", isEdited);
		contentValues.put("isBot", isBot);
		contentValues.put("receivedBy", receivedBy);
		contentValues.put("seenBy", seenBy);	
		contentValues.put("message", message);
		contentValues.put("inline", inline);
		contentValues.put("keyboard", keyboard);
		contentValues.put("date", date);
		try
		{
			createMessageTable(chat_id);
			db.insert(chat_id, null, contentValues);
			return true;
		}
		catch (SQLiteException e)
		{
			Log.e("Ex Db" , "" + e);
			return false;
		}

	}

	public boolean updateMessage(String mess_id , String user_id , String user_nick , String user_color,
								 String chat_id , String type , String reply , int shared , int isEdited , int isBot,
								 String receivedBy , String seenBy , String message , String inline , String keyboard , int date)
	{
		SQLiteDatabase db = this.getWritableDatabase();
		ContentValues contentValues = new ContentValues();
		contentValues.put("mess_id", mess_id);
		contentValues.put("user_id", user_id);	
		contentValues.put("user_nick", user_nick);
		contentValues.put("user_color", user_color);
		contentValues.put("chat_id", chat_id);
		contentValues.put("type", type);
		contentValues.put("reply", reply);	
		contentValues.put("shared", shared);
		contentValues.put("isEdited", isEdited);
		contentValues.put("isBot", isBot);
		contentValues.put("receivedBy", receivedBy);
		contentValues.put("seenBy", seenBy);	
		contentValues.put("message", message);
		contentValues.put("inline", inline);
		contentValues.put("keyboard", keyboard);
		contentValues.put("date", date);
		try
		{
			createMessageTable(chat_id);
			db.update(chat_id , contentValues , " mess_id = ? " , new String[] {mess_id});
			return true;
		}
		catch (SQLiteException e)
		{
			Log.e("Ex Db" , "" + e);
			return false;
		}

	}

	public String getMessageData(String chat_id , String mess_id)
	{
		try
		{
			SQLiteDatabase db = this.getReadableDatabase();
			Cursor res =  db.rawQuery("SELECT * FROM " + chat_id + " WHERE mess_id='" + mess_id + "'" , null);
			res.moveToFirst();
			final String user_id = res.getString(res.getColumnIndex("user_id"));
			final String user_nick = res.getString(res.getColumnIndex("user_nick"));	
			final String user_color = res.getString(res.getColumnIndex("user_color"));
			final String type = res.getString(res.getColumnIndex("type"));
			final String reply = res.getString(res.getColumnIndex("reply"));
			final int shared = res.getInt(res.getColumnIndex("shared"));	
			final int isEdited = res.getInt(res.getColumnIndex("isEdited"));
			final int isBot = res.getInt(res.getColumnIndex("isBot"));	
			final String receivedBy = res.getString(res.getColumnIndex("receivedBy"));
			final String seenBy = res.getString(res.getColumnIndex("seenBy"));
			final String message = res.getString(res.getColumnIndex("message"));
			final String inline = res.getString(res.getColumnIndex("inline"));	
			final String keyboard = res.getString(res.getColumnIndex("keyboard"));	
			final int date = res.getInt(res.getColumnIndex("date"));

			return "{\"chat_id\" : \"" + chat_id + "\"," +
				"\"mess_id\" : \"" + mess_id + "\"," +
				"\"user_id\" : \"" + user_id + "\"," +
				"\"user_nick\" : \"" + user_nick + "\"," +
				"\"user_color\" : \"" + user_color + "\"," +
				"\"type\" : \"" + type + "\"," +
				"\"reply\" : \"" + reply + "\"," +
				"\"shared\" : \"" + shared + "\"," +
				"\"isEdited\" : \"" + isEdited + "\"," +
				"\"isBot\" : \"" + isBot + "\"," +
				"\"receivedBy\" : \"" + receivedBy + "\"," +
				"\"seenBy\" : \"" + seenBy + "\"," +
				"\"nessage\" : \"" + message + "\"," +
				"\"inline\" : \"" + inline + "\"," +
				"\"keyboard\" : \"" + keyboard + "\"," +
				"\"date\" : \"" + date + "\"" +
				"}";
		}
		catch (SQLiteException e)
		{
			Log.e("DB err" , "" + e);
			return "null";
		}
	}

	public String getChatLength(String chat_id){
		final String[] mess = getRoomMessages(chat_id).split(",");
		return (Arrays.asList(mess).contains("null") && mess.length == 1 ? "" + 0 : mess.length + "");
	}

	public String getAllMessInRoom(String chat_id , String _start , String _end){
		final String[] mess = getRoomMessages(chat_id).split(",");
		boolean has = false;
		int start = (_start != "null" ? Integer.parseInt(_start) : 0);
		int end = (_end != "null" ? Integer.parseInt(_end) : mess.length);
		String ret = "{";

		for(int c = start ; c < end ; c++){
			String data = getMessageData(chat_id , mess[c]);
			ret += (c != 0 ? "," : "") + "\"" + mess[c] + "\":" + data;
			has = true;
		}
		ret += "}";
		return (has ? ret : "null");
	}

	public boolean updateMessageData(String chat_id , String mess_id ,  String key , String value)
	{
		SQLiteDatabase db = this.getWritableDatabase();
		ContentValues contentValues = new ContentValues();
		contentValues.put(key, value);
		db.update(chat_id , contentValues , " mess_id = ? " , new String[] {mess_id});
		return true;
	}

	public void deleteMessages(String chat_id)
	{
		SQLiteDatabase db = this.getWritableDatabase();
		db.execSQL("DROP TABLE IF EXISTS " + chat_id);
	}

	public String getRoomMessages(String chat_id)
	{
		try
		{
			SQLiteDatabase db = this.getReadableDatabase();
			Cursor res =  db.rawQuery("SELECT * FROM " + chat_id, null);
			String ret = "";
			int c = 0;
			res.moveToFirst();
			while (res.isAfterLast() == false)
			{
				ret += res.getString(res.getColumnIndex("mess_id")) + (c != 0 ? "," : "");
				res.moveToNext();
				c++;
			}
			return ret;
		}
		catch (SQLException e)
		{
			return "null";
		}
	}


}
