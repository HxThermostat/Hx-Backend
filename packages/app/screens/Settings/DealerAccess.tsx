import React from "react";
import { StyleSheet, ScrollView, Platform, Text } from "react-native";

import { useActionSheet } from "~/hooks/useActionSheet";

import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";
import { RouteProp, useRoute } from "@react-navigation/native";

import Background from "~/components/Background";
import SmallRoundButton from "~/components/Touchables/SmallRoundButton";
import AccessBlock from "~/components/AccessBlock";

import { useDealerQuery, useRevokeShareMutation } from "~/graph";

import i18n from "~/i18n";

import spacing from "~/styles/spacing";
import fonts from "~/styles/fonts";

import { withQueryData, DataHookProp, GoBack } from "~/screens/withQueryData";

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: spacing.ptthirtytwo,
      android: spacing.mttwenty,
    }),
    flex: 1,
  },
  containerEmpty: {
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  noAccessLabel: {
    ...fonts.subheadL20,
    textAlign: "center",
  },
  grantAccessBtn: {
    ...spacing.mxtwentyfour,
  },
});

type DealerAccessNavigationProp = NativeStackNavigationProp<
  SettingsNavigatorRouteList,
  "DealerAccess"
>;

export type DealerAccessProps = {
  navigation: DealerAccessNavigationProp;
  route: RouteProp<SettingsNavigatorRouteList, "DealerAccess">;
  data: DataHookProp<typeof useDealerQuery>;
};

const scope = "Screens.Authenticated.SettingsNavigator.DealerAccess";

function DealerAccess(props: DealerAccessProps): JSX.Element {
  const {
    route: {
      params: { locationId },
    },
    data: { location },
    navigation,
  } = props;

  if (!location?.shares) throw new GoBack();

  const [revokeShare] = useRevokeShareMutation();
  const { showActionSheetWithOptions } = useActionSheet();

  const empty = !location.shares.length;
  return (
    <Background>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          empty ? styles.containerEmpty : {},
        ]}
        contentInsetAdjustmentBehavior={"automatic"}
      >
        {empty ? (
          <Text style={styles.noAccessLabel}>
            {i18n.t("noAccessGranted", { scope })}
          </Text>
        ) : (
          location.shares.map(share => (
            <AccessBlock
              key={share.id}
              level={share.accessLevel}
              expiresAt={
                share.expiresAt ? new Date(share.expiresAt) : undefined
              }
              email={share.email}
              locationName={location.name}
              onPress={() => {
                showActionSheetWithOptions({
                  items: [
                    {
                      label: i18n.t("Common.cancel"),
                      cancel: true,
                    },
                    {
                      label: i18n.t("revokeAccessSheet.confirm", { scope }),
                      destructive: true,
                      onPress: () => {
                        revokeShare({
                          variables: {
                            input: {
                              id: share.id,
                            },
                          },
                          optimisticResponse: {
                            revokeShare: {
                              __typename: "RevokeShareSuccess",
                              location: {
                                ...location,
                                shares:
                                  location.shares &&
                                  location.shares.filter(
                                    s => s.id !== share.id
                                  ),
                              },
                            },
                          },
                        });
                      },
                    },
                  ],
                  title: i18n.t("revokeAccessSheet.title", { scope }),
                  message: i18n.t("revokeAccessSheet.message", { scope }),
                });
              }}
            />
          ))
        )}

        <SmallRoundButton
          onPress={() =>
            navigation.navigate("GrantAccess", { locationId: locationId })
          }
          style={styles.grantAccessBtn}
          text={i18n.t("grantAccess", { scope })}
        />
      </ScrollView>
    </Background>
  );
}

export default withQueryData(useDealerQuery, {
  options: {
    fetchPolicy: "cache-and-network",
  },
  useVariables: () => {
    const route = useRoute<DealerAccessProps["route"]>();

    return {
      locationId: route.params.locationId,
    };
  },
})(DealerAccess);
