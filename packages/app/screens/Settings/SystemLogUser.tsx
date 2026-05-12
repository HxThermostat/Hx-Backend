import React, { useCallback, useLayoutEffect, useState } from "react";
import { StyleSheet, Platform, View, Alert } from "react-native";

import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { RouteProp, useFocusEffect } from "@react-navigation/native";

import { openComposer } from "react-native-email-link";

import moment from "moment";

import { useAuth } from "~/contexts";

import { hasAccess, useGetFaultsQuery, useResetLogsMutation } from "~/graph";

import { useActionSheet } from "~/hooks/useActionSheet";

import i18n from "~/i18n";

import ActivityIndicator from "~/components/ActivityIndicator";
import Background from "~/components/Background";
import FlatList, { Data } from "~/components/Lists/FlatList";
import Text from "~/components/Text";
import SmallRoundButton from "~/components/Touchables/SmallRoundButton";

import fonts from "~/styles/fonts";
import spacing from "~/styles/spacing";
import HeaderButton from "~/components/Touchables/HeaderButton";

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: spacing.ptthirtytwo,
      android: spacing.mttwenty,
    }),
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerStyle: {
    alignItems: "center",
    ...spacing.ptsixtyfour,
    ...spacing.pbthirtytwo,
  },
  emptyText: {
    ...fonts.title,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    ...spacing.mtonehundredeighty,
  },
  emptyButton: {
    opacity: 0.5,
    ...spacing.mtonehundredeighty,
  },
});

const TIMESTAMP_FORMAT = "l LT";

export type SystemLogProps = {
  navigation: NativeStackNavigationProp<
    SettingsNavigatorRouteList,
    "SystemLogUser"
  >;
  route: RouteProp<SettingsNavigatorRouteList, "SystemLogUser">;
};
const scope = "Screens.Authenticated.SettingsNavigator.SystemLogUser";
export default function SystemLogUser({
  navigation,
  route: {
    params: { locationId },
  },
}: SystemLogProps): JSX.Element {
  const { isPro } = useAuth();

  const [wasReset, setWasReset] = useState(false);

  useFocusEffect(
    useCallback(() => {
      return () => setWasReset(false);
    }, [])
  );

  const { data, loading } = useGetFaultsQuery({
    variables: { locationId },
    fetchPolicy: "cache-and-network",
  });

  const { showActionSheetWithOptions } = useActionSheet();
  const [resetLogs, { loading: resetLoading }] = useResetLogsMutation({
    onCompleted: ({ resetLogs: { __typename } }) => {
      switch (__typename) {
        case "ResetLogsSuccess":
          setWasReset(true);
          break;
        case "NotSupported":
          Alert.alert(
            i18n.t("notSupportedAlert.title", { scope }),
            i18n.t("notSupportedAlert.message", { scope })
          );
          break;
      }
    },
  });

  const DATA: Data = wasReset
    ? []
    : data?.location?.faults.map(({ value, createdAt }) => ({
        title: value,
        subtitle: moment(createdAt).format(TIMESTAMP_FORMAT),
        titleProps: { numberOfLines: undefined },
        rightTitleProps: { numberOfLines: undefined },
        rightContentContainerStyle: {
          flex: 1,
        },
        contentContainerStyle: { flex: 1 },
      })) ?? [];

  const hasData = !!DATA.length;
  const canReset =
    data?.location?.accessLevel &&
    hasAccess(data?.location?.accessLevel, "INSTALLER") &&
    hasData;

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <HeaderButton
          disabled={!canReset}
          loading={resetLoading}
          onPress={() => {
            showActionSheetWithOptions({
              title: i18n.t("actionSheet.title", { scope }),
              message: i18n.t("actionSheet.message", { scope }),
              items: [
                ...[
                  {
                    label: i18n.t("actionSheet.resetThermostatLogs", { scope }),
                    onPress: () => {
                      resetLogs({
                        variables: { locationId, logType: "THERMOSTAT" },
                      });
                    },
                  },
                ],
                ...(isPro
                  ? [
                      {
                        label: i18n.t("actionSheet.resetSystemLogs", {
                          scope,
                        }),
                        onPress: () => {
                          resetLogs({
                            variables: { locationId, logType: "SYSTEM" },
                          });
                        },
                      },
                    ]
                  : []),
                ...[
                  {
                    label: i18n.t("actionSheet.cancel", { scope }),
                    cancel: true,
                  },
                ],
              ],
            });
          }}
          text={i18n.t("reset", { scope })}
        />
      ),
    });
  }, [
    canReset,
    resetLoading,
    navigation,
    showActionSheetWithOptions,
    resetLogs,
    locationId,
    isPro,
  ]);

  const handleSendDealerEmail = useCallback((): void => {
    if (!data?.location) return;

    openComposer({
      to: data.location.dealer.email,
      subject: i18n.t("emailSubject", { scope }),
      body: i18n.t("emailBody", {
        scope,
        name: data.location.dealer.name,
        logs: DATA.map(({ title, subtitle }) => `${title}\n${subtitle}`).join(
          "\n\n"
        ),
      }),
    });
  }, [DATA, data]);
  return (
    <Background>
      {loading ? (
        <ActivityIndicator style={styles.activityIndicator} />
      ) : (
        <FlatList
          alwaysBounceVertical={false}
          contentContainerStyle={styles.container}
          ListFooterComponent={
            hasData && !isPro ? (
              <SmallRoundButton
                disabled={!data?.location || !hasData}
                onPress={handleSendDealerEmail}
                text={i18n.t("emailDealer", { scope })}
              />
            ) : null
          }
          ListFooterComponentStyle={styles.footerStyle}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>{i18n.t("empty", { scope })}</Text>
            </View>
          )}
          data={DATA}
        />
      )}
    </Background>
  );
}
