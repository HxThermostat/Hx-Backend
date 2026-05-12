package com.kraftful.dev.hx;

import android.content.Intent;
import android.app.Activity;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;

public class OpenEmailClientIntent extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;

  OpenEmailClientIntent(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

  @Override
  public String getName() {
    return "OpenEmailClientIntent";
  }

  @ReactMethod
  public void open() {

    try {
      Activity currentActivity = getCurrentActivity();

      Intent intent = Intent.makeMainSelectorActivity(Intent.ACTION_MAIN, Intent.CATEGORY_APP_EMAIL);
      intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);// Min SDK 15

      currentActivity.startActivity(intent);

    } catch (Exception e) {
    }
  }
}
