import DataLoader from "dataloader";

import { Client, Device, Share, Properties, Rule } from "../ayla";
import { Endpoint, Subscription } from "../sns";
import { AccessLevel } from "./resolvers-types";

export type DeviceWithAccess = Device & { accessLevel: AccessLevel };

export type PropertyId = {
  id: number;
  name: string;
};

export interface Loaders {
  device: DataLoader<string, DeviceWithAccess | null>;
  locationShares: DataLoader<string, Share[]>;
  metadata: DataLoader<string, Record<string, string | null>>;
  properties: DataLoader<string, Properties | null>;
  rule: DataLoader<[string, string], Rule | null>;
  rules: DataLoader<string, Rule[]>;
  snsEndpoint: DataLoader<string, Endpoint | null>;
  snsSubscriptions: DataLoader<string, Subscription[]>;
  share: DataLoader<string, Share | null>;
  timezone: DataLoader<string, string>;
}

export type User = {
  id: string;
  accessToken: string;
  email: string;
};

export interface AppContext {
  user: User | null;
  aylaClient: Client;
  loaders: Loaders;
}
