package com.mxtecorg.xchat;
import android.content.*;
import android.app.*;
import android.os.*;

public class NotificationBuilder
{
	
	private Context ctx;
	Notification.MessagingStyle style;
	Notification.Builder mBuilder;
	NotificationManager manager;
	NotificationBuilder(Context ctx){
		this.ctx = ctx;
	}
	
	public void createChannel(String id) {
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
			CharSequence name = "Notification";
			String description = "Descripción";
			int importance = NotificationManager.IMPORTANCE_DEFAULT;
			NotificationChannel channel = new NotificationChannel(id, name, importance);

			channel.setDescription(description);
			channel.enableVibration(false);
			channel.setShowBadge(false);
			NotificationManager manager = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
			manager.createNotificationChannel(channel);
		}
	}
	
	
	public void createCNoti(String id , int noti_id , String title){
		Intent i = new Intent(ctx, MainActivity.class);
		PendingIntent p = PendingIntent.getActivity(ctx, 0, i, 0);
		style = new Notification.MessagingStyle("XChat");
		mBuilder = new Notification.Builder(ctx, id);
		manager = (NotificationManager) ctx.getSystemService(NotificationManager.class);
		
		style.setConversationTitle(title);

		mBuilder.setSmallIcon(R.drawable.ic_launcher);
		mBuilder.setColor(R.color.colorAccent);
		mBuilder.setContentIntent(p);
		mBuilder.setStyle(style);
		mBuilder.setPriority(Notification.PRIORITY_DEFAULT);
		manager.notify(noti_id, mBuilder.build());
	}
	
	public void addMessage(int noti_id , String name ,  String msg , int date){
		style.addMessage(msg , date , name);
		manager.notify(noti_id , mBuilder.build());
	}
	
	public void cancel(int noti_id) {
		String ns = Context.NOTIFICATION_SERVICE;
		NotificationManager nMgr = (NotificationManager) ctx.getSystemService(ns);
		nMgr.cancel(noti_id);
	}
}
