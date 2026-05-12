import { JsonMap } from "@segment/analytics-react-native";
import { identifySegmentUser, trackSegmentEvent } from "../segment";

import { loadFromAsyncStorage, saveToAsyncStorage } from "../localStorage";

type KohortTrackedUser = {
  userId: string;
  customTraits: JsonMap;
};

type KohortTrackedEvent = {
  event: string;
  properties: JsonMap;
};

type KohortFunnelEvent = {
  funnel: string;
  step: KohortFunnelEventStep;
};

type KohortTrackProperties = {
  kohortTrack: 1;
};

type KohortFeatureProperties = KohortTrackProperties & {
  kohortFeature: string;
  kohortFeatureTag?: string;
};

export enum KohortFunnel {
  Adoption = "Adoption",
  SignIn = "Sign In",
  Connection = "Connection",
}

export enum KohortFunnelEventStep {
  Action = "Action",
  Connection = "Connection",
  ConnectionStart = "Connection Start",
  ConnectionSuccess = "Connection Success",
  SignIn = "Sign In",
  SignInStart = "Sign In Start",
  SignInSuccess = "Sign In Success",
}

/* 5 minutes */
const MAX_SESSION_INACTIVE_TIME = 300000;
/* 30 seconds (for testing) */
// export const MAX_SESSION_INACTIVE_TIME = 30000;

export const DEFAULT_SESSION_ID = -1;

/**
 * KohortSession tracks session activity and manages expiring sessions when inactive
 */
class KohortSession {
  private sessionId: number;
  private sessionTimer: number | undefined;

  constructor(sessionId: number = DEFAULT_SESSION_ID) {
    this.sessionId = sessionId;
  }

  markSessionActive(): void {
    if (this.sessionId === DEFAULT_SESSION_ID) {
      // New session, generate new id
      this.sessionId = Math.floor(Date.now() / 1000);
    }

    this.startInactivityTimer();
    this.saveSessionId(this.sessionId);
    this.saveLastActive();
  }

  startInactivityTimer(): void {
    clearTimeout(this.sessionTimer);
    this.sessionTimer = setTimeout(
      () => this.handleSessionInactive(),
      MAX_SESSION_INACTIVE_TIME
    );
  }

  getCurrentSessionId(): number {
    return this.sessionId;
  }

  setCurrentSessionId(sessionId: number): void {
    this.sessionId = sessionId;
    this.startInactivityTimer();
    this.saveSessionId(this.sessionId);
    this.saveLastActive();
  }

  dispose(): void {
    clearTimeout(this.sessionTimer);
  }

  isSessionExpired(lastActive: number): boolean {
    const elapsed = Date.now() - lastActive;
    return elapsed > MAX_SESSION_INACTIVE_TIME;
  }

  isDefaultSessionId(sessionId: number): boolean {
    return sessionId === DEFAULT_SESSION_ID;
  }

  async loadSessionInfoFromStorage(): Promise<void> {
    const [sessionId, lastActive] = await Promise.all([
      loadFromAsyncStorage<number>("kohort_session_id"),
      loadFromAsyncStorage<number>("kohort_session_last_active"),
    ]);

    // Bounce early if either of these is null
    if (sessionId == null || lastActive == null) {
      return;
    }

    // Check for session expiration since lastActive
    if (!this.isSessionExpired(lastActive)) {
      this.setCurrentSessionId(sessionId);
    }
  }

  private saveSessionId(sessionId: number): void {
    void saveToAsyncStorage("kohort_session_id", sessionId);
  }

  private saveLastActive(time: number = Date.now()): void {
    // Might want to debounce this in the future
    void saveToAsyncStorage("kohort_session_last_active", time);
  }

  private handleSessionInactive(): void {
    this.sessionTimer = undefined;
    this.sessionId = DEFAULT_SESSION_ID;
  }
}

/**
 * KohortTracking exposes Kohort specific tracking functions that add the
 * relevant properties to the Segment calls.
 */
export class KohortTracking {
  public session: KohortSession;

  constructor() {
    this.session = new KohortSession();
  }

  identify(userId: string, customTraits: JsonMap): void {
    this.identifyUser({
      userId,
      customTraits,
    });
  }

  trackFeatureUse(feature: string, tag: string | null = null): void {
    const additionalProperties: KohortFeatureProperties = {
      kohortTrack: 1,
      kohortFeature: feature,
    };

    if (tag != null) {
      additionalProperties.kohortFeatureTag = tag;
    }

    // @ts-ignore We have already checked kohortFeatureTag for undefined above
    this.trackEvent({ event: feature, properties: additionalProperties });
  }

  trackFunnel({
    step,
    funnel = KohortFunnel.Adoption,
  }: {
    funnel?: KohortFunnel;
    step: KohortFunnelEventStep;
  }): void {
    this.trackFunnelEvent({
      funnel,
      step,
    });
  }

  private identifyUser(trackedUser: KohortTrackedUser): void {
    identifySegmentUser(trackedUser.userId, trackedUser.customTraits);
  }

  private trackFunnelEvent(details: KohortFunnelEvent): void {
    const stepName = details.step.toString();
    trackSegmentEvent(`${stepName}`, {
      kohortTrack: 1,
      kohortFunnel: details.funnel,
      kohortStepName: stepName,
    });
  }

  private trackEvent(details: KohortTrackedEvent): void {
    const { event, properties } = details;

    trackSegmentEvent(event, properties);
  }

  private static _instance: KohortTracking | undefined;
  static singleton(): KohortTracking {
    if (!KohortTracking._instance) {
      KohortTracking._instance = new KohortTracking();
    }

    return KohortTracking._instance;
  }
}
