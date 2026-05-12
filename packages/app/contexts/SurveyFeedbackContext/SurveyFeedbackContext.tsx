import React, { useContext, useMemo, useState } from "react";

import { useSurveyFeedbackSession } from "~/hooks/useSurveyFeedbackSession";
import { SendBirdWrapper } from "./SendBirdWrapper";

export type SurveyFeedbackContextProps = {
  sendbird: SendBirdWrapper;
  sessionToken: string | undefined;
  requestSurveySession: () => void;
  invalidateSessionToken: () => Promise<void>;
  showPrompt: boolean;
  setShowPrompt: (showPrompt: boolean) => void;
};

const SurveyFeedbackContext = React.createContext<
  SurveyFeedbackContextProps | undefined
>(undefined);

type SurveyFeedbackContextProviderProps = React.PropsWithChildren<{
  appId: string;
}>;

export function SurveyFeedbackProvider({
  children,
  appId,
}: SurveyFeedbackContextProviderProps): JSX.Element {
  const sendbird = useMemo(() => new SendBirdWrapper({ appId }), [appId]);
  const [showPrompt, setShowPrompt] = useState(false);
  const {
    sessionToken,
    requestSurveySession,
    invalidateSessionToken,
  } = useSurveyFeedbackSession();

  return (
    <SurveyFeedbackContext.Provider
      value={{
        sendbird,
        showPrompt,
        setShowPrompt,
        sessionToken,
        requestSurveySession,
        invalidateSessionToken,
      }}
    >
      {children}
    </SurveyFeedbackContext.Provider>
  );
}

export function useSurveyFeedback(): SurveyFeedbackContextProps {
  const context = useContext(SurveyFeedbackContext);

  if (context === undefined) {
    throw new Error(
      "useSurveyFeedback must be used within a SurveyFeedbackProvider"
    );
  }

  return context;
}
