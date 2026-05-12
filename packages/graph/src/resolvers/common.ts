import {
  NotFound as NF,
  NotSupported as NS,
  Offline as OL,
} from "../schema/resolvers-types";

export const NotFound = (message: string): NF => ({
  __typename: "NotFound",
  message,
});

export const NotSupported = (message: string): NS => ({
  __typename: "NotSupported",
  message,
});

export const Offline = (message: string): OL => ({
  __typename: "Offline",
  message,
});
