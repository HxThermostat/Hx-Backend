import { useEffect, useState } from "react";

import * as Device from "expo-device";

const useIsTablet = (): boolean => {
  const [isTablet, setIsTablet] = useState(false);

  const discoverDeviceTypeAsync = async (): Promise<void> => {
    const deviceType = await Device.getDeviceTypeAsync();
    setIsTablet(deviceType === Device.DeviceType.TABLET);
  };

  useEffect(() => {
    discoverDeviceTypeAsync();
  }, []);

  return isTablet;
};

export default useIsTablet;
