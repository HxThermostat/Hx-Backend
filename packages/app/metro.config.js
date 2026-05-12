/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const getWorkspaces = require("get-yarn-workspaces");
const os = require("os");
const path = require("path");

module.exports = {
  ...(process.env["APPCENTER_BUILD_ID"]
    ? { maxWorkers: os.cpus().length }
    : undefined),
  watchFolders: [
    path.resolve(__dirname, "..", "..", "node_modules"),
    ...getWorkspaces(__dirname).filter(
      workspaceDir => !(workspaceDir === __dirname)
    ),
  ],
  transformer: {
    assetPlugins: ["expo-asset/tools/hashAssetFiles"],
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
