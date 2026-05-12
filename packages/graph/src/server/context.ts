import { AuthenticationError } from "apollo-server-express";

import { Client } from "../ayla";
import { AppContext, User } from "../schema/context";
import { decode, AccessTokenPayload } from "../utils/auth";

import loaders from "./loaders";

export default function context({ req }: any): AppContext {
  const token = (req.headers.authorization || "").replace(/^Bearer /, "");
  let user: User | null = null;

  try {
    const { accessToken, email, userId } = decode<AccessTokenPayload>(
      token,
      "access"
    );

    user = {
      accessToken,
      email,
      id: userId,
    };
  } catch (e) {
    if (e instanceof Error && e.name === "JWTExpired") {
      throw new AuthenticationError("Token expired");
    }
    // TODO(nleach): Are there good reasons to provide feedback to the
    // client in this case?
  }

  const aylaClient = new Client(user?.accessToken);

  // This is a bit of a hack so that we can annotate our dd-trace
  // spans with the current user's ID
  // https://github.com/DataDog/dd-trace-js/issues/1091#issuecomment-696715080
  req.user = user;

  return {
    user,
    aylaClient,
    loaders: loaders(aylaClient, user),
  };
}
