#!/usr/bin/env bash

# AppCenter doesn't appear to _fully_ know about Yarn Workspaces but
# luckily because of our nohoist usage we can just take the lockfile
# from the parent package
cp ../../yarn.lock yarn.lock

# Remove package.json from graph to avoid installing unecessary
# dependencies (FWIW not a huge fan of this, but we're fighting
# against build times)
rm ../graph/package.json

if [ -n "${APPCENTER_XCODE_PROJECT}" ]; then
# iOS-speciifc steps
  cd ios
  bundle install
  bundle exec fastlane ios app_center
else
  # Android-speciifc steps
  cd android
  bundle install
  bundle exec fastlane app_center
fi
