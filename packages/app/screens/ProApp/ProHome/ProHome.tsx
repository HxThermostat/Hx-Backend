import React, { useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Platform,
  FlatList as RNFlatList,
} from "react-native";

import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { ProAppNavigatorRouteList } from "~/navigators/ProAppNavigator";

import { SafeAreaView } from "react-native-safe-area-context";

import Icon from "react-native-vector-icons/MaterialIcons";

import { useProHomeQuery } from "~/graph";

import { useAuth } from "~/contexts";

import i18n from "~/i18n";

import Background from "~/components/Background";
import HeaderButton from "~/components/Touchables/HeaderButton";
import SmallSquareButton from "~/components/Touchables/SmallSquareButton";
import Text from "~/components/Text";

import spacing from "~/styles/spacing";
import colors from "~/styles/color";
import fonts from "~/styles/fonts";

import LocationItem from "./LocationItem";
import { DataHookProp, withQueryData } from "~/screens/withQueryData";

const scope = "Screens.ProApp.ProAppNavigator.ProHome";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRight: {
    backgroundColor: colors.iconButtonBackground,
    width: 40,
    height: 20,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({ android: spacing.mrsix }),
  },
  icon: {
    ...Platform.select({ ios: { marginTop: -7 } }),
  },
  headerContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row-reverse",
    ...spacing.plten, // This _actually_ adds padding on the right, thanks row-reverse!
    ...Platform.select({
      android: { ...spacing.mteighteen, ...spacing.pbsixteen },
      ios: spacing.mbeighteen,
    }),
  },
  title: {
    ...fonts.largeTitle,
    ...spacing.mlsixteen,
  },
  requestAccess: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.black,
    ...spacing.pytwentyfour,
    ...spacing.pxsixteen,
  },
  footerContainer: {
    ...spacing.pytwentyfour,
    ...spacing.pxsixteen,
  },
  requestAccessButton: {
    borderColor: colors.tint,
    borderRadius: 9,
    alignSelf: "flex-start",
    borderWidth: 1,
    ...spacing.pxsixteen,
    ...spacing.pyfour,
  },
  requestAccessText: {
    ...fonts.scaledSecondaryHeader,
    color: colors.tint,
  },
  requestAccessTitle: {
    ...fonts.title,
    color: colors.white,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.divider,
    ...spacing.mxsix,
  },
});

function HeaderRight(): JSX.Element {
  const navigation = useNavigation<ProHomeProps["navigation"]>();

  return (
    <HeaderButton
      onPress={() =>
        navigation.navigate("ModalNavigator", { screen: "Settings" })
      }
      hitSlop={{ top: 40, bottom: 40, left: 10, right: 10 }}
    >
      <View style={styles.headerRight}>
        <Icon
          name={"more-horiz"}
          color={colors.white}
          size={35}
          style={styles.icon}
        />
      </View>
    </HeaderButton>
  );
}

function ListHeader(): JSX.Element {
  return (
    <View style={styles.headerContainer}>
      <HeaderRight />
      <Text style={styles.title}>{i18n.t("screenTitle", { scope })}</Text>
    </View>
  );
}

function ListFooter(): JSX.Element {
  const navigation = useNavigation<ProHomeProps["navigation"]>();
  return (
    <View style={styles.footerContainer}>
      <SmallSquareButton
        style={styles.requestAccessButton}
        onPress={() =>
          navigation.navigate("ModalNavigator", {
            screen: "RequestAccess",
          })
        }
      >
        <Text style={styles.requestAccessText}>
          {i18n.t("requestAcccessButton", { scope })}
        </Text>
      </SmallSquareButton>
    </View>
  );
}

export type ProHomeProps = {
  navigation: NativeStackNavigationProp<ProAppNavigatorRouteList, "ProHome">;
  router: RouteProp<ProAppNavigatorRouteList, "ProHome">;
  data: DataHookProp<typeof useProHomeQuery>;
};

function ProHome({
  navigation,
  data: { locations },
}: ProHomeProps): JSX.Element {
  const { reload } = useAuth();

  // There is similar behavior in ControllsContext that will handle
  // this too; however, triggering this behavior here ensures we don't
  // have a race condition where users see an empty screen before the
  // UI reloads
  useLayoutEffect(() => {
    if (!locations.length) {
      reload(true);
    }
  }, [locations.length, reload]);

  function onLocationPress(locationId: string): void {
    navigation.navigate("InstallerView", { locationId });
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => <HeaderRight />,
    });
  }, [navigation]);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <RNFlatList
          contentInsetAdjustmentBehavior={"automatic"}
          data={locations}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <LocationItem
              locationId={item.id}
              onDetailsPress={onLocationPress}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          ListHeaderComponent={Platform.select({ android: ListHeader })}
          ListFooterComponent={ListFooter}
        />
      </SafeAreaView>
    </Background>
  );
}

export default withQueryData(useProHomeQuery, {
  options: {
    fetchPolicy: "cache-and-network",
  },
})(ProHome);
