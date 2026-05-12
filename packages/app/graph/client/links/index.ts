import { ApolloLink } from "@apollo/client";
import authLink from "./authLink";
import buildRefreshTokenLink from "./refreshTokenLink";
import httpLink from "./httpLink";
import retryLink from "./retryLink";
import sentryLink from "./sentryLink";
import timeoutLink from "./timeoutLink";
import eventTrackingLink from "./eventTrackingLink";

const wrapLink = (link: ApolloLink): ApolloLink =>
  sentryLink.concat(eventTrackingLink.concat(link));

export const buildLink = (
  handleRefreshError?: () => Promise<void>
): ApolloLink => {
  const baseLink = retryLink.concat(timeoutLink.concat(httpLink));

  if (!handleRefreshError) {
    return wrapLink(baseLink);
  }

  return wrapLink(
    buildRefreshTokenLink(handleRefreshError).concat(authLink.concat(baseLink))
  );
};
