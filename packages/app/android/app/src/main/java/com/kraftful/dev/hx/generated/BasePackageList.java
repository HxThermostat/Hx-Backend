package com.kraftful.dev.hx.generated;

import java.util.Arrays;
import java.util.List;
import org.unimodules.core.interfaces.Package;

public class BasePackageList {
  public List<Package> getPackageList() {
    return Arrays.<Package>asList(
        new expo.modules.application.ApplicationPackage(),
        new expo.modules.barcodescanner.BarCodeScannerPackage(),
        new expo.modules.camera.CameraPackage(),
        new expo.modules.constants.ConstantsPackage(),
        new expo.modules.device.DevicePackage(),
        new expo.modules.filesystem.FileSystemPackage(),
        new expo.modules.haptics.HapticsPackage(),
        new expo.modules.imageloader.ImageLoaderPackage(),
        new expo.modules.localization.LocalizationPackage(),
        new expo.modules.location.LocationPackage(),
        new expo.modules.notifications.NotificationsPackage(),
        new expo.modules.permissions.PermissionsPackage(),
        new expo.modules.securestore.SecureStorePackage(),
        new expo.modules.taskManager.TaskManagerPackage(),
        new expo.modules.updates.UpdatesPackage()
    );
  }
}
