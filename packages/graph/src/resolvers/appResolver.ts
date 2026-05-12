import { AuthenticationError } from "apollo-server-express";
import {
  Resolvers,
  QueryResolvers,
  MutationResolvers,
} from "../schema/resolvers-types";

import {
  REVIEW_DELAY_MS,
  REVIEW_PROBABILITY,
  REVIEW_REPROMPT_DELAY_MS,
  REVIEW_SKIP_USER_IDS,
  REVIEWS_ENABLED,
  SURVEY_DELAY_MS,
  SURVEY_PROBABILITY,
  SURVEY_RESPONSE_KEEPAROUND_DELAY_MS,
  SURVEY_REPROMPT_DELAY_MS,
  SURVEY_SKIP_USER_IDS,
  SURVEY_DOGFOOD_USER_IDS,
  SURVEYS_ENABLED,
} from "./config";

import {
  createUserSession,
  generateUserNameFromEmail,
} from "../utils/sendbird";

export const resolver: Resolvers = {};

export const queryResolver: QueryResolvers = {
  requestRating: (_root, { input }, { user }) => {
    try {
      if (!REVIEWS_ENABLED) return false;
      if (Math.random() >= REVIEW_PROBABILITY) return false;

      if (!user || REVIEW_SKIP_USER_IDS.has(user.id)) return false;

      if (!input) return false;

      if (
        input.version.startsWith("3.0.") ||
        input.version.startsWith("3.1.") ||
        input.version.startsWith("3.2.") ||
        input.version.startsWith("3.3.")
      ) {
        return false;
      }

      const installedAt = new Date(input.installedAt);
      const lastDisplayedAt = input?.lastDisplayedAt
        ? new Date(input?.lastDisplayedAt)
        : undefined;

      // Don't allow for fresh installs
      if (Date.now() - installedAt.getTime() < REVIEW_DELAY_MS) return false;

      // Allow when prompts have never been displayed
      if (lastDisplayedAt == null) return true;

      return Date.now() - lastDisplayedAt.getTime() >= REVIEW_REPROMPT_DELAY_MS;
    } catch {
      // Better to be a bit defensive with parse errors in case of a
      // client error always providing invalid values, etc
      return false;
    }
  },
  requestSurveyFeedback: (_root, { input }, { user }) => {
    // Dogfooding
    if (user && SURVEY_DOGFOOD_USER_IDS.has(user.id)) return true;

    try {
      if (!SURVEYS_ENABLED) return false;

      if (Math.random() >= SURVEY_PROBABILITY) return false;

      if (!user || SURVEY_SKIP_USER_IDS.has(user.id)) return false;

      if (!input.version.startsWith("3.")) return false;

      const installedAt = new Date(input.installedAt);
      const lastDisplayedAt = input.lastDisplayedAt
        ? new Date(input.lastDisplayedAt)
        : undefined;
      const lastResponseAt = input.lastResponseAt
        ? new Date(input.lastResponseAt)
        : undefined;

      // Don't allow for fresh installs
      if (Date.now() - installedAt.getTime() < SURVEY_DELAY_MS) return false;

      // Allow when prompts have never been displayed
      if (lastDisplayedAt == null) return true;

      // Keep displaying after the last response so they can continue the dialogue if necessary
      if (
        lastResponseAt &&
        Date.now() - lastResponseAt.getTime() <=
          SURVEY_RESPONSE_KEEPAROUND_DELAY_MS
      ) {
        return true;
      }

      // Display after the reprompt delay
      return Date.now() - lastDisplayedAt.getTime() >= SURVEY_REPROMPT_DELAY_MS;
    } catch {
      // Be defensive about date parse errors from the client
      return false;
    }
  },
  updateRequired: (_root, { input: { version, build } }) => {
    if (version.startsWith("3.0.0") && parseInt(build) <= 69) return true;

    return false;
  },
};

export const mutationResolver: MutationResolvers = {
  requestSurveySession: async (_, _input, { user }) => {
    if (!user) throw new AuthenticationError("Authentication required");

    const sessionInfo = await createUserSession(
      user.id,
      generateUserNameFromEmail(user.email)
    );

    return sessionInfo;
  },
};
