import { ApolloServer, AuthenticationError } from "apollo-server-express";
import { GraphQLSchema } from "graphql";

import buildSchema from "./schema";
import context from "./context";
import loaders from "./loaders";
import { metrics } from "./plugins";

import { isAxiosError } from "../ayla";
import { AppContext } from "../schema/context";

export { buildSchema, context, loaders };

export { default as applyActionsOnGoogleMiddleware } from "./actions_on_google";
export { default as applyOauthMiddleware } from "./oauth";
export { default as applyWebhookMiddleware } from "./webhook";

type AppContextFn = typeof context;

export default function buildServer(
  schema: GraphQLSchema,
  context: AppContext | AppContextFn
): ApolloServer {
  return new ApolloServer({
    schema,
    context,
    formatError: err => {
      const { originalError } = err;

      if (
        isAxiosError(originalError) &&
        originalError.response?.status === 401
      ) {
        return new AuthenticationError("Token invalid");
      }
      return err;
    },
    plugins: [metrics],
    playground: true,
    introspection: true,
  });
}
