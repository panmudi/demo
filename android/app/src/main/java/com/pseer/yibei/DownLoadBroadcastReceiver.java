package com.pseer.yibei;

import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.net.Uri;
import android.widget.Toast;

import java.io.File;

public class DownLoadBroadcastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        long myDwonloadID = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
        SharedPreferences sPreferences = context.getSharedPreferences("yibei_download", 0);
        long refernece = sPreferences.getLong("yibei_download_apk", 0);
        if (refernece == myDwonloadID) {
            DownloadManager dManager = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);
            Intent install = new Intent(Intent.ACTION_VIEW);
            DownloadManager.Query querybyId = new DownloadManager.Query();
            querybyId.setFilterById(myDwonloadID);
            Cursor myDownload = dManager.query(querybyId);
            String donwloadName = null;
            if (myDownload.moveToFirst()) {
                int status = myDownload.getInt(myDownload.getColumnIndex(DownloadManager.COLUMN_STATUS));
                if (status == DownloadManager.STATUS_SUCCESSFUL) {
                    int fileNameIdx = myDownload.getColumnIndex(DownloadManager.COLUMN_LOCAL_FILENAME);
                    donwloadName = myDownload.getString(fileNameIdx);
                } else {
                    Toast.makeText(context, "下载失败", Toast.LENGTH_LONG).show();
                    dManager.remove(myDwonloadID);
                    myDownload.close();
                    return;
                }
                myDownload.close();
            }
            if (donwloadName == null) {
                return;
            }
            File file = new File(donwloadName);
            install.setDataAndType(Uri.fromFile(file), "application/vnd.android.package-archive");
            install.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.getApplicationContext().startActivity(install);
        }
    }
}
