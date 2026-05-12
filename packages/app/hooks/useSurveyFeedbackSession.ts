import { useCallback, useState } from "react";
import { useApolloClient } from "@apollo/client";

import {
  RequestSurveySessionDocument,
  RequestSurveySessionMutation,
} from "~/graph/schema";

import {
  loadFromAsyncStorage,
  removeFromAsyncStorage,
  saveToAsyncStorage,
} from "~/utils/localStorage";

type UseSurveyFeedbackSessionResult = {
  requestSurveySession: () => void;
  invalidateSessionToken: () => Promise<void>;
  sessionToken?: string;
  sessionExpiresAt?: Date;
};

const ONE_DAY = 24 * 60 * 60 * 1000;

export const useSurveyFeedbackSession = (): UseSurveyFeedbackSessionResult => {
  const [sessionToken, setSessionToken] = useState<string>();
  const [sessionExpiresAt, setSessionExpiresAt] = useState<Date>();
  const client = useApolloClient();

  const requestSurveySession = useCallback(async () => {
    // Load the token info from localStorage if present
    const localToken = await loadFromAsyncStorage<string>(
      "survey_feedback_session_token"
    );
    const localExpiresAt = await loadFromAsyncStorage<string>(
      "survey_feedback_session_expires_at"
    );
    if (localToken && localExpiresAt) {
      const expiresDate = new Date(localExpiresAt);
      // Check for tokens that expire within 24 hours
      if (expiresDate.getTime() > Date.now() + ONE_DAY) {
        setSessionToken(localToken);
        setSessionExpiresAt(expiresDate);
        return;
      }
    }

    // Otherwise, load from the graph
    const { data } = await client.mutate<RequestSurveySessionMutation>({
      mutation: RequestSurveySessionDocument,
      fetchPolicy: "no-cache",
    });

    if (!data) return;

    const { requestSurveySession } = data;

    if (!requestSurveySession) return;

    void saveToAsyncStorage(
      "survey_feedback_session_token",
      requestSurveySession.sessionToken
    );
    void saveToAsyncStorage(
      "survey_feedback_session_expires_at",
      requestSurveySession.sessionExpiresAt
    );

    setSessionToken(requestSurveySession.sessionToken);
    setSessionExpiresAt(new Date(requestSurveySession.sessionExpiresAt));
  }, [client, setSessionToken, setSessionExpiresAt]);

  const invalidateSessionToken = useCallback(async () => {
    await Promise.allSettled([
      removeFromAsyncStorage("survey_feedback_session_token"),
      removeFromAsyncStorage("survey_feedback_session_expires_at"),
    ]);
  }, []);

  return {
    requestSurveySession,
    invalidateSessionToken,
    sessionToken,
    sessionExpiresAt,
  };
};
