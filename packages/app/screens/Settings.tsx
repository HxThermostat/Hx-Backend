import React, { useContext, useMemo } from "react";
import { StyleSheet, Text, Platform, Alert } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { openComposer } from "react-native-email-link";

import Rate from "react-native-rate";

import { RATE_OPTIONS } from "~/constants";

import {
  useController,
  useAuth,
  useTemperatureUnit,
  NavigatorsContext,
} from "~/contexts";

import {
  useChangeTemperatureUnitMutation,
  useSettingsQuery,
  TemperatureUnit,
} from "~/graph";

import { useActionSheet } from "~/hooks/useActionSheet";

import i18n from "~/i18n";

import Background from "~/components/Background";
import { Item } from "~/components/Lists/ListItem";
import SectionList, { Sections } from "~/components/Lists/SectionList";
import NestableSafeAreaView from "~/components/NestableSafeAreaView";

import fonts from "~/styles/fonts";
import spacing from "~/styles/spacing";
import colors from "~/styles/color";

import { DataHookProp, withQueryData } from "~/screens/withQueryData";

import { locationItem } from "./Settings/Location";
import { KohortFunnelEventStep, useKohortTracking } from "~/utils/kohort";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {},
  title: {
    ...fonts.largeTitle,
    ...spacing.mteighteen,
    ...spacing.mlsixteen,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  body: { ...fonts.body },
  dialog: { backgroundColor: colors.androidTextInputBG },
});

const scope = "Screens.Authenticated.SettingsNavigator.Settings";

export type SettingsProps = {
  data: DataHookProp<typeof useSettingsQuery>;
};

function Settings({ data }: SettingsProps): JSX.Element {
  const { locationId } = useController();
  const { isTablet } = useContext(NavigatorsContext);

  // Non-obvious, but we need to use the hook (as opposed to getting
  // this from props) because of how we use this screen in the
  // SplitView for tablets
  const navigation = useNavigation();

  const {
    toDisplay,
    unit: temperatureUnit,
    setUnit: setTemperatureUnit,
  } = useTemperatureUnit();

  const locations = (data?.locations ?? []).filter(
    location => !locationId || location.id === locationId
  );

  const { isPro, removeLocation, signOut, email } = useAuth();
  const { trackFunnel } = useKohortTracking();

  const actionSheetHook = useActionSheet();

  const { showActionSheetWithOptions } = actionSheetHook;

  const [changeTemperatureUnit] = useChangeTemperatureUnitMutation({
    onCompleted: ({
      changeTemperatureUnit: {
        user: { temperatureUnit },
      },
    }) => {
      setTemperatureUnit(temperatureUnit);
    },
  });

  const isOwner =
    locationId == null ||
    locations.find(location => location.id === location.id)?.accessLevel ===
      "OWNER";

  const isProSettings = isPro && locationId == null;

  const generalItems = useMemo((): Item[] => {
    return [
      ...[
        {
          title: i18n.t("sections.general.about", { scope }),
          chevron: true,
          navigate: { name: "About" },
          disabled: !isOwner,
        },
      ],
      ...(isProSettings
        ? [
            {
              title: i18n.t("sections.general.manuals", { scope }),
              chevron: true,
              navigate: { name: "Manuals" },
            },
          ]
        : []),
      ...(isProSettings
        ? []
        : [
            {
              title: i18n.t("sections.general.support", { scope }),
              chevron: true,
              disabled: !isOwner,
              navigate: { name: "Support" },
            },
          ]),
      ...[
        {
          title: i18n.t("sections.general.rate", { scope }),
          disabled: !isOwner,
          onPress: () => {
            Rate.rate(
              {
                ...RATE_OPTIONS,
                preferInApp: false,
                openAppStoreIfInAppFails: true,
              },
              () => undefined
            );
          },
        },
      ],
    ];
  }, [isOwner, isProSettings]);

  const accountItems = useMemo((): Item[] => {
    const items: Item[] = [
      {
        title: i18n.t("sections.account.manageAccount", { scope }),
        subtitle: isOwner || isProSettings ? email : undefined,
        chevron: true,
        navigate: {
          name: "ManageAccount",
        },
      },
      {
        title: i18n.t("sections.account.temperatureUnit", { scope }),
        subtitle: isOwner ? (temperatureUnit === "F" ? "℉" : "℃") : undefined,
        onPress: () => {
          const onPress = (temperatureUnit: TemperatureUnit): void => {
            trackFunnel({ step: KohortFunnelEventStep.Action });
            changeTemperatureUnit({
              variables: {
                input: {
                  temperatureUnit,
                },
              },
            });
            setTemperatureUnit(temperatureUnit);
          };
          showActionSheetWithOptions({
            items: [
              {
                label: i18n.t("sections.account.temperatureUnitSheet.F", {
                  scope,
                }),
                onPress: () => onPress("F"),
              },
              {
                label: i18n.t("sections.account.temperatureUnitSheet.C", {
                  scope,
                }),
                onPress: () => onPress("C"),
              },
              {
                label: i18n.t("Common.cancel"),
                cancel: true,
              },
            ],
            title: i18n.t("sections.account.temperatureUnitSheet.title", {
              scope,
            }),
          });
        },
      },
      {
        title: i18n.t("sections.account.addThermostat", { scope }),
        navigate: {
          force: true,
          name: "ModalNavigator",
          params: {
            screen: "ConnectThermostat",
          },
        },
        button: true,
      },
    ];

    // Unless we explicitly specify the disabled state, we want to
    // default to disabled for the customer view when in the pro app
    return items.map(item => ({
      ...item,
      disabled: item.disabled ?? !isOwner,
    }));
  }, [
    changeTemperatureUnit,
    isOwner,
    isPro,
    isProSettings,
    setTemperatureUnit,
    showActionSheetWithOptions,
    signOut,
    temperatureUnit,
  ]);

  const locationItems = useMemo((): Item[] => {
    return isProSettings
      ? []
      : locations.map(location => ({
          title: location.name,
          chevron: true,
          navigate: {
            name: "Location",
            params: { locationId: location.id },
          },
        }));
  }, [isProSettings, locations]);

  const voiceItems = useMemo(
    (): Item[] => [
      {
        title: i18n.t("sections.voiceControl.connectAlexa", { scope }),
        chevron: true,
        disabled:
          !locations.find(({ accessLevel }) => accessLevel === "OWNER") ||
          !isOwner,
        navigate: {
          name: "Alexa",
        },
      },
      {
        title: i18n.t("sections.voiceControl.connectGoogleHome", {
          scope,
        }),
        chevron: true,
        disabled:
          !locations.find(({ accessLevel }) => accessLevel === "OWNER") ||
          !isOwner,
        navigate: {
          name: "GoogleHome",
        },
      },
    ],
    [isOwner, locations]
  );

  const sections = useMemo((): Sections => {
    const hasOwnDevice = locations.some(
      ({ accessLevel }) => accessLevel === "OWNER"
    );
    return [
      {
        title: i18n.t("sections.general.title", { scope }),
        data: generalItems,
      },
      {
        title: i18n.t("sections.account.title", { scope }),
        data: accountItems,
      },
      ...(locationItems.length
        ? locations.length === 1
          ? [
              {
                title: locations[0].name,
                data: locationItem(
                  locations[0],
                  toDisplay,
                  actionSheetHook,
                  () => removeLocation(locations[0].id)
                ),
              },
            ]
          : [
              {
                title: i18n.t("sections.locations.title", { scope }),
                data: locationItems,
              },
            ]
        : []),
      ...(isProSettings && !hasOwnDevice
        ? [] // Hide Voice Section if the Pro user doesn't have any of their own devices
        : [
            {
              title: i18n.t("sections.voiceControl.title", { scope }),
              data: voiceItems,
            },
          ]),
    ];
  }, [
    locations,
    generalItems,
    accountItems,
    locationItems,
    toDisplay,
    actionSheetHook,
    isProSettings,
    voiceItems,
    removeLocation,
  ]);

  function handleItemPress(item: Item): void {
    item.onPress && item.onPress();

    if (item.navigate) {
      // The "Add Thermostat" item cannot be shown in a split view because it's a modal
      // so we force the other navigation path.
      const forceNavigation = !!item.navigate.force;
      if (isTablet && !isProSettings && !forceNavigation) {
        navigation.navigate("SplitViewSettings", {
          ...item.navigate.params,
          routeName: item.navigate.name,
        });
      } else {
        navigation.navigate(item.navigate.name, item.navigate.params);
      }
    }
  }

  const showTitle =
    Platform.OS === "android" || (Platform.OS === "ios" && isTablet);
  return (
    <Background>
      <NestableSafeAreaView
        edges={["top", "right", "left"]}
        style={styles.container}
      >
        {showTitle && (
          <Text style={styles.title}>{i18n.t("screenTitle", { scope })}</Text>
        )}
        <SectionList handleItemPress={handleItemPress} sections={sections} />
      </NestableSafeAreaView>
    </Background>
  );
}

export default withQueryData(useSettingsQuery, {
  options: { fetchPolicy: "cache-and-network" },
})(Settings);
