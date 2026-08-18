import "./tracer";
import express from "express";
import { redirectToHTTPS } from "express-http-to-https";
import compression from "compression";
import cookieParser from "cookie-parser";
import path from "path";

import { IS_PRODUCTION, PORT } from "./config";

import buildServer, {
  buildSchema,
  context,
  applyActionsOnGoogleMiddleware,
  applyOauthMiddleware,
  applyWebhookMiddleware,
} from "./server";

const start = async (): Promise<void> => {
  const schema = await buildSchema();

  const server = buildServer(schema, context);

  const app = express();

  app.set("view engine", "pug");

  app.use(compression());
  app.use(cookieParser());

  if (IS_PRODUCTION) {
    app.use(redirectToHTTPS([], [], 301));
  }

  app.get("/.well-known/assetlinks.json", (_, res) => {
    res.sendFile(path.resolve(process.cwd(), "static/.well-known/assetlinks.json"));
  });

  app.use(express.static("public"));
  app.use(express.static("views"));

  applyActionsOnGoogleMiddleware({ app });
  applyWebhookMiddleware({ app, path: "/ars_webhook" });
  await applyOauthMiddleware({ app });
  server.applyMiddleware({ app, path: "/" });

  try {
    app.listen(PORT, () => {
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

start();
