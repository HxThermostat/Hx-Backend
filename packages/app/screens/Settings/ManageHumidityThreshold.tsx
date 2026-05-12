import React, { useCallback, useState } from "react";
import { StyleSheet, ScrollView, Platform } from "react-native";

import { useDebouncedCallback } from "use-debounce";

import { RouteProp, useRoute } from "@react-navigation/native";
import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";

import {
  useDebouncedMutation,
  useChangeHumidificationMutation,
  useChangeHumidificationModeMutation,
  useChangeDehumidificationModeMutation,
  useChangeDehumidificationMutation,
  useHumidityControllerQuery,
} from "~/graph";

import useLazyEffect from "~/hooks/useLazyEffect";

import i18n from "~/i18n";

import Background from "~/components/Background";
import ToggleBlock from "~/components/ToggleBlock";
import AdjustHumidtyBlock from "~/components/AdjustHumidityBlock";
import SliderRow from "~/components/SliderRow";

import spacing from "~/styles/spacing";

import { DataHookProp, GoBack, withQueryData } from "~/screens/withQueryData";

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: spacing.ptthirtytwo,
      android: spacing.mttwenty,
    }),
    ...spacing.pxtwentyfour,
  },
});

type ControllerType = NonNullable<
  DataHookProp<typeof useHumidityControllerQuery>["controller"]
>;

function HumidityThreshold({
  controller,
  scope,
  type,
  max,
  min,
  value,
}: {
  controller: ControllerType;
  scope: string;
  type: "humidification" | "dehumidification";
  max: number;
  min: number;
  value: number;
}): JSX.Element {
  const [displayValue, _setDisplayValue] = useState(Math.round(value * 100));
  const [sliderValue, setSliderValue] = useState(displayValue);

  const [setDisplayValue] = useDebouncedCallback(_setDisplayValue, 10, {
    maxWait: 20,
  });

  const [changeHumidification] = useDebouncedMutation(
    useChangeHumidificationMutation({
      variables: { input: { id: controller.id, value: displayValue / 100 } },
      optimisticResponse: {
        changeHumidification: {
          __typename: "ChangeHumidificationSuccess",
          controller: {
            ...controller,
            humidification: {
              __typename: "Humidification",
              mode: "MANUAL",
              value: displayValue / 100,
              max,
              min,
            },
          },
        },
      },
    }),
    { delay: 200, maxWait: 1000 }
  );

  const [changeDehumidification] = useDebouncedMutation(
    useChangeDehumidificationMutation({
      variables: { input: { id: controller.id, value: displayValue / 100 } },
      optimisticResponse: {
        changeDehumidification: {
          __typename: "ChangeHumidificationSuccess",
          controller: {
            ...controller,
            dehumidification: {
              __typename: "Humidification",
              mode: "MANUAL",
              value: displayValue / 100,
              max,
              min,
            },
          },
        },
      },
    }),
    { delay: 200, maxWait: 1000 }
  );

  const change =
    type === "humidification" ? changeHumidification : changeDehumidification;

  useLazyEffect(change, [displayValue]);

  function handleIncreaseHighEnd(): void {
    setDisplayValue(value => (value + 1 <= max * 100 ? value + 1 : value));
    setSliderValue(value => (value + 1 <= max * 100 ? value + 1 : value));
  }

  function handleDecreaseLowEnd(): void {
    setDisplayValue(value => (value - 1 >= min * 100 ? value - 1 : value));
    setSliderValue(value => (value - 1 >= min * 100 ? value - 1 : value));
  }

  function onValueChange(value: number): void {
    setDisplayValue(value);
  }

  function handleSlideComplete(value: number): void {
    setSliderValue(value);
    setDisplayValue(value);
  }

  return (
    <>
      <AdjustHumidtyBlock
        handleDecreasePress={handleDecreaseLowEnd}
        handleIncreasePress={handleIncreaseHighEnd}
        title={i18n.t("threshold", { scope })}
        value={displayValue}
      />
      <SliderRow
        minText={`${min * 100}%`}
        minValue={min * 100}
        maxValue={max * 100}
        maxText={`${max * 100}%`}
        onValueChange={onValueChange}
        handleSlideComplete={handleSlideComplete}
        value={sliderValue}
        step={1}
      />
    </>
  );
}

type ManageProps = {
  data: DataHookProp<typeof useHumidityControllerQuery>;
  scope: string;
  type: "humidification" | "dehumidification";
};

const Manage = withQueryData(useHumidityControllerQuery, {
  useVariables: () => {
    const route = useRoute<
      RouteProp<
        SettingsNavigatorRouteList,
        "ManageDehumidityThreshold" | "ManageDehumidityThreshold"
      >
    >();
    return {
      controllerId: route.params.controllerId,
    };
  },
})(
  ({ data: { controller }, scope, type }: ManageProps): JSX.Element => {
    if (!controller) throw new GoBack();

    const [auto, setAuto] = useState(controller[type]?.mode === "AUTO");

    const [changeHumidificationMode] = useDebouncedMutation(
      useChangeHumidificationModeMutation({
        variables: {
          input: { id: controller.id, mode: auto ? "AUTO" : "MANUAL" },
        },
        optimisticResponse: {
          changeHumidificationMode: {
            __typename: "ChangeHumidificationModeSuccess",
            controller: {
              ...controller,
              humidification: controller.humidification
                ? {
                    ...controller.humidification,
                    mode: auto ? "AUTO" : "MANUAL",
                  }
                : null,
            },
          },
        },
      }),
      {
        delay: 200,
        leading: true,
        maxWait: 1000,
      }
    );

    const [changeDehumidificationMode] = useDebouncedMutation(
      useChangeDehumidificationModeMutation({
        variables: {
          input: { id: controller.id, mode: auto ? "AUTO" : "MANUAL" },
        },
        optimisticResponse: {
          changeDehumidificationMode: {
            __typename: "ChangeHumidificationModeSuccess",
            controller: {
              ...controller,
              dehumidification: controller.dehumidification
                ? {
                    ...controller.dehumidification,
                    mode: auto ? "AUTO" : "MANUAL",
                  }
                : null,
            },
          },
        },
      }),
      {
        delay: 200,
        leading: true,
        maxWait: 1000,
      }
    );

    const changeMode =
      type === "humidification"
        ? changeHumidificationMode
        : changeDehumidificationMode;

    useLazyEffect(changeMode, [auto]);

    const handleAutoValueChange = useCallback((auto: boolean) => {
      setAuto(auto);
    }, []);

    return (
      <Background>
        <ScrollView
          contentContainerStyle={styles.container}
          contentInsetAdjustmentBehavior={"automatic"}
          alwaysBounceVertical={false}
        >
          <ToggleBlock
            title={i18n.t("auto", { scope })}
            value={auto}
            onValueChange={handleAutoValueChange}
            body={i18n.t("automaticallyManageAir", { scope })}
          />
          {!auto && type === "humidification" && controller.humidification && (
            <HumidityThreshold
              scope={scope}
              type={type}
              controller={controller}
              {...controller.humidification}
            />
          )}
          {!auto &&
            type === "dehumidification" &&
            controller.dehumidification && (
              <HumidityThreshold
                scope={scope}
                type={type}
                controller={controller}
                {...controller.dehumidification}
              />
            )}
        </ScrollView>
      </Background>
    );
  }
);

export function ManageHumidityThresholdScreen(): JSX.Element {
  return (
    <Manage
      scope={"Screens.Authenticated.SettingsNavigator.ManageHumidityThreshold"}
      type={"humidification"}
    />
  );
}

export function ManageDehumidityThresholdScreen(): JSX.Element {
  return (
    <Manage
      scope={
        "Screens.Authenticated.SettingsNavigator.ManageDehumidityThreshold"
      }
      type={"dehumidification"}
    />
  );
}
