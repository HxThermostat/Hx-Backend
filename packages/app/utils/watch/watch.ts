// This is kind of a weird hack to ensure that types between the two
// platform-specific files remains consistent while also exporting
// correct types for a platform-generic import that the TypeScript
// compiler is happy with. (At compile time the correct
// platform-specific implementation will still be used.)
// https://github.com/Microsoft/TypeScript/issues/8328#issuecomment-219583152

import * as ios from "./watch.ios";
import * as android from "./watch.android";

/* eslint-disable no-var */
declare var _test: typeof ios;
declare var _test: typeof android;
/* eslint-enable no-var */

// export to get the shape of the module
export * from "./watch.ios";
