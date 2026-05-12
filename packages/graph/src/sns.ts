import {
  ListSubscriptionsByTopicCommand,
  SetEndpointAttributesCommand,
  SNSClient,
  Subscription as SubscriptionFields,
  Endpoint as EndpointFields,
  GetEndpointAttributesCommand,
  CreateTopicCommand,
  CreatePlatformEndpointCommand,
  SubscribeCommand,
  PublishCommand,
  UnsubscribeCommand,
} from "@aws-sdk/client-sns";

import { SmithyException } from "@aws-sdk/smithy-client";

import * as ARN from "@aws-sdk/util-arn-parser";

import { Required } from "utility-types";

import { PUSH_ANDROID_ARN, PUSH_ARN_BASE, PUSH_IOS_ARN } from "./config";

import { Platform } from "./schema/resolvers-types";

export const PLATFORM_ARNS: Record<Platform, string> = {
  [Platform.Ios]: PUSH_IOS_ARN,
  [Platform.Android]: PUSH_ANDROID_ARN,
};

const {
  partition: PARTITION,
  service: SERVICE,
  region: REGION,
  accountId: ACCOUNT_ID,
} = ARN.parse(PUSH_ARN_BASE);

export const buildArn = (resource: string | [string, string]): string =>
  ARN.build({
    partition: PARTITION,
    service: SERVICE,
    region: REGION,
    accountId: ACCOUNT_ID,
    resource: Array.isArray(resource) ? resource.join(":") : resource,
  });

export const topicName = (userId: string): string => `user-${userId}`;
export const topicArn = (userId: string): string => buildArn(topicName(userId));

export const client = new SNSClient({});

export type Subscription = Required<
  SubscriptionFields,
  "Endpoint" | "SubscriptionArn" | "TopicArn"
>;

export const isSubscription = (
  subscription: unknown
): subscription is Subscription => {
  if (!subscription) return false;

  const s = subscription as Subscription;

  return !!(s.Endpoint && s.SubscriptionArn && s.TopicArn);
};

export type Endpoint = Required<EndpointFields, "Attributes" | "EndpointArn">;

export const isEndpoint = (endpoint: unknown): endpoint is Endpoint => {
  if (!endpoint) return false;

  const e = endpoint as Endpoint;

  return !!(e.Attributes && e.EndpointArn);
};

export const subscriptionId = (subscriptionArn: string): string =>
  ARN.parse(subscriptionArn).resource;

export const subscriptionArn = (subscriptionId: string): string =>
  buildArn(subscriptionId);

export const isAWSError = (e: unknown): e is SmithyException => {
  return !!(e && (e as SmithyException).$fault && (e as SmithyException).name);
};

export const isClientError = (e: unknown): e is SmithyException =>
  isAWSError(e) && e.$fault === "client";

export async function listSubscriptions(
  userId: string
): Promise<Subscription[]> {
  let Subscriptions: SubscriptionFields[] | undefined;

  try {
    ({ Subscriptions } = await client.send(
      new ListSubscriptionsByTopicCommand({
        TopicArn: topicArn(userId),
      })
    ));
  } catch {
    return [];
  }

  const subscriptions: Subscription[] = [];

  (Subscriptions ?? []).forEach(subscription => {
    if (isSubscription(subscription)) {
      subscriptions.push(subscription);
    }
  });

  return subscriptions;
}

export async function setEndpointEnabled(
  endpointArn: string,
  enabled: boolean
): Promise<void> {
  await client.send(
    new SetEndpointAttributesCommand({
      EndpointArn: endpointArn,
      Attributes: { Enabled: enabled ? "true" : "false" },
    })
  );
}

const PUSH_IOS_ENDPOINT_PREFIX = ARN.parse(PUSH_IOS_ARN).resource.replace(
  "app/",
  "endpoint/"
);

export const endpointPlatform = (endpointArn: string): Platform =>
  ARN.parse(endpointArn).resource.startsWith(PUSH_IOS_ENDPOINT_PREFIX)
    ? Platform.Ios
    : Platform.Android;

export async function getEndpoint(
  endpointArn: string
): Promise<Endpoint | undefined> {
  const response = await client.send(
    new GetEndpointAttributesCommand({
      EndpointArn: endpointArn,
    })
  );

  const endpoint = { ...response, EndpointArn: endpointArn };

  return isEndpoint(endpoint) ? endpoint : undefined;
}

export async function createSubscription(
  userId: string,
  platform: Platform,
  token: string
): Promise<[string, string, string]> {
  const { TopicArn } = await client.send(
    new CreateTopicCommand({
      Name: topicName(userId),
    })
  );

  if (!TopicArn) throw new Error("Could not create Topic");

  const { EndpointArn } = await client.send(
    new CreatePlatformEndpointCommand({
      PlatformApplicationArn: PLATFORM_ARNS[platform],
      Token: token,
    })
  );

  if (!EndpointArn) throw new Error("Could not create Endpoint");

  const { SubscriptionArn } = await client.send(
    new SubscribeCommand({
      Endpoint: EndpointArn,
      Protocol: "application",
      TopicArn,
    })
  );

  if (!SubscriptionArn) throw new Error("Could not create Subscription");

  return [EndpointArn, SubscriptionArn, TopicArn];
}

export async function unsubscribe(subscriptionArn: string): Promise<void> {
  await client.send(
    new UnsubscribeCommand({
      SubscriptionArn: subscriptionArn,
    })
  );
}

export async function deliverNotification(
  userId: string,
  message: { title: string; body: string },
  data: Record<string, string | undefined> = {},
  dedupeKey?: string
): Promise<void> {
  const APNS = JSON.stringify({
    aps: {
      alert: message,
      badge: 0,
      "thread-id": dedupeKey,
    },
    ...data,
  });

  // TODO(@nleach): Figure out why the default behavior doesn't show
  // an appropriate icon on Android
  const icon = "notification_icon";

  const GCM = JSON.stringify({
    notification: { ...message, icon, tag: dedupeKey },
    data: {
      ...data,
      // expo-notifications specific values
      title: message.title,
      message: message.body,
    },
  });

  await client.send(
    new PublishCommand({
      Message: JSON.stringify({
        APNS,
        GCM,
        APNS_SANDBOX: APNS,
        default: message.body,
      }),
      MessageStructure: "json",
      TopicArn: topicArn(userId),
    })
  );
}
