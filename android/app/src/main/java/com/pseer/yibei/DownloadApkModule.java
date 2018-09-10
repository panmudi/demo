package com.pseer.yibei;

import android.app.Activity;
import android.app.DownloadManager;
import android.content.Context;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Environment;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class DownloadApkModule extends ReactContextBaseJavaModule {

    public DownloadApkModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "DownloadApk";
    }

    DownloadManager downManager;
    Activity myActivity;

    @ReactMethod
    public void download(String url) {
        myActivity = getCurrentActivity();
        downManager = (DownloadManager) myActivity.getSystemService(Context.DOWNLOAD_SERVICE);

        Uri uri = Uri.parse(url);
        DownloadManager.Request request = new DownloadManager.Request(uri);
        request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_WIFI);

        //设置通知栏标题
        request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE);
        request.setMimeType("application/vnd.android.package-archive");
        request.setTitle("一呗App");
        request.setDescription("正在下载");
        request.setAllowedOverRoaming(false);

        //设置文件存放目录
        request.setDestinationInExternalFilesDir(myActivity, Environment.DIRECTORY_DOWNLOADS, "正在下载");
        long downloadid = downManager.enqueue(request);
        SharedPreferences sPreferences = myActivity.getSharedPreferences("yibei_download", 0);
        sPreferences.edit().putLong("yibei_download_apk", downloadid).commit();
    }
}
