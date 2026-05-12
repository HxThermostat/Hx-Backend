#!/usr/bin/env bash

if [ -n "${APPCENTER_XCODE_PROJECT}" ]; then
  # iOS-speciifc steps
  cd ios
  pod install
else
  # Android-speciifc steps
  # Install a specific version of the ndk (21.0.6113669)
  echo "Installing Android NDK; 21.0.6113669"
  SDKMANAGER=$ANDROID_HOME/tools/bin/sdkmanager
  echo y | $SDKMANAGER "ndk;21.0.6113669"
  cd android
fi
