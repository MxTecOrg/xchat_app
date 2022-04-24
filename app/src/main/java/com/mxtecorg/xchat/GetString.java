package com.mxtecorg.xchat;
import android.os.Environment;
import android.content.pm.ApplicationInfo;
import android.content.Context;

public class GetString
{
	Context context;
    GetString(Context context)
	{
		this.context = context;
	}
    public String get(String str)
	{
		try
		{
			switch (str)
			{
				case "host":
					return "https://mxtec-org-xchat.glitch.me";
				case "login":
					return "/auth/login";
				case "register":
					return "/auth/register";
				case "resendToken":
					return "/auth/resendToken";
				case "verify":
					return "/auth/verify";
				case "socket":
					return "/client";
				case "appPackage":
					return "com.mxtecorg.xchat";
				case "appName":
					return getApplicationName(context);
				case "dataStorage":
					return context.getExternalFilesDir("").getAbsolutePath();
				case "internalStorage":
					return Environment.getExternalStorageDirectory().getAbsolutePath();
				case "appStorage":
					return Environment.getDataDirectory().getAbsolutePath();
				default:
					return "null";
			}
		}
		catch (Exception e)
		{
			return e + "";
		}
	}

	public static String getApplicationName(Context context)
	{
		ApplicationInfo applicationInfo = context.getApplicationInfo();
		int stringId = applicationInfo.labelRes;
		return stringId == 0 ? applicationInfo.nonLocalizedLabel.toString() : context.getString(stringId);
	}

}
