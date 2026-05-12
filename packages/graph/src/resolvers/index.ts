import {
  resolver as appResolver,
  queryResolver as appQueryResolver,
  mutationResolver as appMutationResolver,
} from "./appResolver";

import {
  resolver as authResolver,
  queryResolver as authQueryResolver,
  mutationResolver as authMutationResolver,
} from "./authResolver";

import {
  resolver as controllerResolver,
  queryResolver as controllerQueryResolver,
  mutationResolver as controllerMutationResolver,
} from "./controllerResolver";

import {
  resolver as locationResolver,
  queryResolver as locationQueryResolver,
  mutationResolver as locationMutationResolver,
} from "./locationResolver";

import {
  resolver as notificationResolver,
  queryResolver as notificationQueryResolver,
  mutationResolver as notificationMutationResolver,
} from "./notificationResolver";

import {
  resolver as shareResolver,
  queryResolver as shareQueryResolver,
  mutationResolver as shareMutationResolver,
} from "./shareResolver";

import {
  resolver as userResolver,
  queryResolver as userQueryResolver,
  mutationResolver as userMutationResolver,
} from "./userResolver";

export const typeResolvers = [
  appResolver,
  authResolver,
  controllerResolver,
  locationResolver,
  notificationResolver,
  shareResolver,
  userResolver,
];
export const queryResolvers = [
  appQueryResolver,
  authQueryResolver,
  controllerQueryResolver,
  locationQueryResolver,
  notificationQueryResolver,
  shareQueryResolver,
  userQueryResolver,
];
export const mutationResolvers = [
  appMutationResolver,
  authMutationResolver,
  controllerMutationResolver,
  locationMutationResolver,
  notificationMutationResolver,
  shareMutationResolver,
  userMutationResolver,
];
