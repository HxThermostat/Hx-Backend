import React, { useCallback, useEffect, useRef, useState } from "react";
import { UnreachableCaseError } from "ts-essentials";
import { useDebouncedCallback } from "use-debounce";

import {
  useControlledDialQuery,
  hasAccess,
  useChangeDialSetpointsMutation,
  Demand,
  Mode,
} from "~/graph";
import useFocused from "~/hooks/useFocused";
import { useRatingRequest } from "~/hooks/useRatingRequest";
import { useKohortTracking, KohortFunnelEventStep } from "~/utils/kohort";

import StaticDial from "./StaticDial";

interface ControlledDialProps {
  controllerId: string;
}

const ControlledDial = ({ controllerId }: ControlledDialProps): JSX.Element => {
  const { data, startPolling, stopPolling, refetch } = useControlledDialQuery({
    variables: { controllerId },
    fetchPolicy: "cache-and-network",
  });
  const controller = data?.controller;
  const { trackFeatureUse, trackFunnel } = useKohortTracking();

  if (!controller) {
    throw new Error();
  }

  const focused = useFocused();
  const [initialFocus, setInitialFocus] = useState(true);

  useEffect(() => {
    if (!focused) setInitialFocus(false);
  }, [focused]);

  const min = Math.min(controller.heatRange.min, controller.coolRange.min);
  const max = Math.max(controller.heatRange.max, controller.coolRange.max);

  const outstanding = useRef(0);

  const requestRating = useRatingRequest("ChangeSetpoint");

  useEffect(() => {
    if (!focused) {
      stopPolling();
      return;
    }

    if (outstanding.current === 0) {
      if (!initialFocus) refetch();
      startPolling(5000);
    }
  }, [focused, initialFocus, refetch, startPolling, stopPolling]);

  const beforeStart = useCallback(() => {
    if (outstanding.current === 0) {
      stopPolling();
    }

    outstanding.current += 1;
    trackFeatureUse("Change Setpoint", controller.mode || "Unknown");
    trackFunnel({ step: KohortFunnelEventStep.Action });
  }, [stopPolling]);

  const onCompleted = useCallback(() => {
    outstanding.current -= 1;

    if (outstanding.current === 0 && focused) {
      startPolling(5000);
      requestRating();
    }
  }, [focused, requestRating, startPolling]);

  const tempOverride = controller.tempOverride;
  const hasActiveSchedule = !!controller.activeScheduleEvent;

  const [changeDialSetpointsMutation] = useChangeDialSetpointsMutation({
    onCompleted,
  });

  const [changeDialSetpoints] = useDebouncedCallback(
    useCallback<typeof changeDialSetpointsMutation>(
      options => {
        beforeStart();
        return changeDialSetpointsMutation(options);
      },
      [beforeStart, changeDialSetpointsMutation]
    ),
    2000,
    { leading: false }
  );

  // Both of these values will be set if either are, we're just
  // extracting them to make the useCallback dependency array work
  // efficiently
  const { heat: heatSetpoint, cool: coolSetpoint } = controller.setpoints ?? {};
  const onChangeSetpoints = useCallback(
    ({ heat, cool }: { heat?: number; cool?: number }): void => {
      if (coolSetpoint == null || heatSetpoint == null) return;
      if (heat == null && cool == null) return;

      cool = cool ?? coolSetpoint;
      heat = heat ?? heatSetpoint;

      const variables = {
        controllerId,
        coolValue: cool,
        heatValue: heat,
      };

      changeDialSetpoints({
        variables,
        optimisticResponse: {
          changeHeat: {
            __typename: "ChangeSetpointSuccess" as const,
            controller: {
              __typename: "Controller",
              id: controllerId,
              setpoints: {
                __typename: "Setpoints",
                heat,
              },
              tempOverride: tempOverride || hasActiveSchedule,
            },
          },
          changeCool: {
            __typename: "ChangeSetpointSuccess" as const,
            controller: {
              __typename: "Controller",
              id: controllerId,
              setpoints: {
                __typename: "Setpoints",
                cool,
              },
              tempOverride: tempOverride || hasActiveSchedule,
            },
          },
        },
      });
    },
    [
      changeDialSetpoints,
      controllerId,
      coolSetpoint,
      hasActiveSchedule,
      heatSetpoint,
      tempOverride,
    ]
  );

  const disabled =
    controller.disabled ||
    controller.mode === "OFF" ||
    controller.mode === "MAXHEAT" ||
    controller.mode === "MAXCOOL" ||
    controller.location.override === "VACATION" ||
    controller.away?.active;

  // This is a bit of a hack to work around the async nature of the
  // cache. Eseentially, the mode may be updated before the
  // activeDemand is updated. The combination of mode: "HEAT",
  // activeDemand: "COOL" is invalid, so we're doing this little check
  // to make sure that's also enforced here befre we reconcile that
  // data with the Graph
  let active: Demand | undefined;
  let validModes: Mode[];
  if (controller.activeDemand && controller.mode) {
    switch (controller.activeDemand) {
      case "COOL":
        validModes = ["AUTO", "COOL", "MAXCOOL"];
        break;
      case "HEAT":
        validModes = ["AUTO", "EHEAT", "HEAT", "MAXHEAT"];
        break;
      default:
        throw new UnreachableCaseError(controller.activeDemand);
    }
    active = validModes.includes(controller.mode)
      ? controller.activeDemand
      : undefined;
  }

  return (
    <StaticDial
      active={active}
      deadband={controller.deadband}
      disabled={disabled || !hasAccess(controller.accessLevel, "INSTALLER")}
      indoorTemp={controller.indoorTemp ?? undefined}
      max={max}
      min={min}
      mode={controller.mode ?? undefined}
      onChange={onChangeSetpoints}
      heat={controller.setpoints?.heat}
      cool={controller.setpoints?.cool}
    />
  );
};

ControlledDial.displayName = "ControlledDial";
export default React.memo(ControlledDial);
