import { Profile, Share } from "../ayla";
import { DeviceWithAccess } from "./context";

export type UserMapper = Profile & { email?: string };
export type LocationMapper = DeviceWithAccess;
export type DeviceMapper = DeviceWithAccess & { zone: number };
export type ShareMapper = Share;
export type PushTokenMapper = {
  endpointArn: string;
  subscriptionArn: string;
  topicArn: string;
};
