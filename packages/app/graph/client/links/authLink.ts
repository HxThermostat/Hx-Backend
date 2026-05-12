import { setContext } from "@apollo/client/link/context";

import { getToken } from "~/utils/auth";
import { trackSegmentEvent } from "~/utils/segment";
import refresh from "./refreshToken";

const authLink = setContext(async (_, { headers }) => {
  const token = await getToken();
  let accessToken: string | null = null;

  if (token && token.expiresAt > new Date()) {
    ({ accessToken } = token);
  } else if (token && token.expiresAt < new Date()) {
    trackSegmentEvent("Token Expired");
    const newToken = await refresh(token.refreshToken, () => Promise.resolve());
    if (newToken) {
      ({ accessToken } = newToken);
    }
  }

  return {
    headers: {
      ...headers,
      ...{ authorization: accessToken ? `Bearer ${accessToken}` : null },
    },
  };
});

export default authLink;
