import { tracer } from "dd-trace";
import { IncomingMessage } from "http";

import { ENABLE_DATADOG } from "./config";

// We're initializing in a different file to avoid hoisting
if (ENABLE_DATADOG) {
  tracer.init();
}

tracer.use("express", {
  hooks: {
    // Set the user.id tag on the root span
    // https://github.com/DataDog/dd-trace-js/issues/1091#issuecomment-696715080
    request: (
      span,
      req?: IncomingMessage & { user?: Record<string, string> }
    ) => {
      const user = req?.user;

      if (user && user["id"]) {
        span?.setTag("user.id", user["id"]);
      }
    },
  },
});

export default tracer;
