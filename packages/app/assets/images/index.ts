// list bundled images here, so they're only required once at runtime
// and gives us autocomplete for referencing images

import { ImageRequireSource } from "react-native";

const images = {
  email: require("./email.png"),
  eye: require("./eye.png"),
  clear: require("./clear.png"),
  plane: require("./plane.png"),
  decrease: require("./decrease.png"),
  increase: require("./increase.png"),
  checkmark: require("./checkmark.png"),
  connect: require("./connect.png"),
  setup: require("./setup.png"),
  qr: require("./qr.png"),
  ssid: require("./ssid.png"),
  wifi: require("./wifi.png"),
  connected: require("./connected.png"),
  proWelcome: require("./pro-welcome.png"),
};

type TypedImages = Record<keyof typeof images, ImageRequireSource>;

export default images as TypedImages;
