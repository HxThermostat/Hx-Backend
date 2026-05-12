import { Observable, ApolloLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

import { getToken } from "~/utils/auth";
import { trackSegmentEvent } from "~/utils/segment";

import refresh from "./refreshToken";

const buildLink = (handleError?: () => Promise<void>): ApolloLink => {
  return ApolloLink.from([
    onError(({ graphQLErrors, operation, forward }) => {
      if (
        !graphQLErrors?.find(
          error => error.extensions?.code === "UNAUTHENTICATED"
        )
      ) {
        return;
      }

      console.debug("Unauthenticated");
      return new Observable(observer => {
        (async () => {
          try {
            console.debug("Getting token...");
            const token = await getToken();

            if (token && token.refreshToken) {
              trackSegmentEvent("Token Unauthenticated");
              console.debug("Refreshing token...");
              await refresh(token.refreshToken, handleError);
            } else {
              console.debug("No refresh token set!");
            }

            forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          } catch (error) {
            observer.error(error);
          }
        })();
      });
    }),
  ]);
};

export default buildLink;
