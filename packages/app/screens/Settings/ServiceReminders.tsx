import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Platform, Text } from "react-native";

import RNDateTimePicker from "@react-native-community/datetimepicker";

import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";

import { Divider } from "react-native-elements";

import moment from "moment";

import Background from "~/components/Background";
import ToggleBlock from "~/components/ToggleBlock";
import SectionHeader from "~/components/Lists/SectionHeader";
import DateTimePicker from "~/components/Picker/DateTimePicker";

import {
  useAdjustServiceReminderDatesMutation,
  useDebouncedMutation,
  useLocationNotificationsQuery,
  useToggleServiceReminderMutation,
} from "~/graph";

import useLazyEffect from "~/hooks/useLazyEffect";

import i18n from "~/i18n";

import { SettingsNavigatorRouteList } from "~/navigators/SettingsNavigator";

import { withQueryData, DataHookProp, GoBack } from "~/screens/withQueryData";

import commonListStyles from "~/components/Lists/styles";
import fonts from "~/styles/fonts";
import spacing from "~/styles/spacing";
import colors from "~/styles/color";

const styles = StyleSheet.create({
  ...commonListStyles,
  container: {
    ...Platform.select({
      ios: spacing.pythirtytwo,
      android: spacing.mytwenty,
    }),
  },
  horizontalPadding: {
    ...spacing.pxtwentyfour,
  },
  reminderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    ...spacing.pafourteen,
  },
  reminderTouchable: {
    flex: 1,
    alignItems: "flex-end",
  },
  reminderText: {
    ...fonts.body,
    color: colors.white,
  },
});

const scope = "Screens.Authenticated.SettingsNavigator.ServiceReminders";

type ReminderType = "fall" | "spring";

interface DateItemProps {
  label: string;
  date?: Date;
  onValueChange: (date: Date) => void;
}

const minimumDate = moment()
  .startOf("year")
  .toDate();
const maximumDate = moment()
  .add("1", "year")
  .endOf("year")
  .toDate();

function ReminderItem({
  label,
  date,
  onValueChange,
}: DateItemProps): JSX.Element {
  return (
    <View style={[styles.reminderItem, styles.horizontalPadding]}>
      <Text style={styles.reminderText}>{label}</Text>
      <DateTimePicker
        mode="date"
        value={date}
        emptyLabel={i18n.t("emptyDate", { scope })}
        prefix={i18n.t("datePrefix", { scope })}
        onValueChange={onValueChange}
        labelStyle={styles.reminderText}
        containerStyle={styles.reminderTouchable}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        format="MM/DD"
      />
    </View>
  );
}

type ServiceRemindersNavigationProp = NativeStackNavigationProp<
  SettingsNavigatorRouteList,
  "ServiceReminders"
>;

export type ServiceRemindersProps = {
  navigation: ServiceRemindersNavigationProp;
  route: RouteProp<SettingsNavigatorRouteList, "ServiceReminders">;
  data: DataHookProp<typeof useLocationNotificationsQuery>;
};

function ServiceReminders(props: ServiceRemindersProps): JSX.Element {
  const {
    data: { location },
  } = props;
  if (!location?.serviceReminder) throw new GoBack();

  const [reminderEnabled, setReminderEnabled] = useState(
    location.serviceReminder.enabled
  );

  const [fallValue, setFallValue] = useState<Date | undefined>(
    location.serviceReminder.fall
      ? moment()
          .set({
            date: location.serviceReminder.fall.day,
            month: location.serviceReminder.fall.month - 1,
          })
          .toDate()
      : undefined
  );

  const [fallMonth, setFallMonth] = useState(
    fallValue ? fallValue.getMonth() + 1 : undefined
  );
  const [fallDay, setFallDay] = useState(fallValue?.getDate());

  useEffect(() => {
    setFallMonth(fallValue ? fallValue.getMonth() + 1 : undefined);
    setFallDay(fallValue?.getDate());
  }, [fallValue]);

  const [springValue, setSpringValue] = useState<Date | undefined>(
    location.serviceReminder.spring
      ? moment()
          .set({
            date: location.serviceReminder.spring.day,
            month: location.serviceReminder.spring.month - 1,
          })
          .toDate()
      : undefined
  );

  const [springMonth, setSpringMonth] = useState(
    springValue ? springValue.getMonth() + 1 : undefined
  );
  const [springDay, setSpringDay] = useState(springValue?.getDate());

  useEffect(() => {
    setSpringMonth(springValue ? springValue.getMonth() + 1 : undefined);
    setSpringDay(springValue?.getDate());
  }, [springValue]);

  const [toggleServiceReminderMutation] = useToggleServiceReminderMutation();

  useLazyEffect(() => {
    toggleServiceReminderMutation({
      variables: {
        input: {
          enabled: reminderEnabled,
          id: location.id,
        },
      },
    });
  }, [reminderEnabled, location.id]);

  const [
    adjustServiveReminderDatesMutation,
    { callPending },
  ] = useDebouncedMutation(useAdjustServiceReminderDatesMutation(), {
    delay: 1000,
    leading: true,
  });

  useLazyEffect(() => {
    const fall =
      fallMonth && fallDay ? { month: fallMonth, day: fallDay } : null;

    const spring =
      springMonth && springDay ? { month: springMonth, day: springDay } : null;

    adjustServiveReminderDatesMutation({
      variables: { input: { id: location.id, fall, spring } },
    });
  }, [fallMonth, fallDay, springMonth, springDay]);

  const handleValueChange = useCallback(
    (enabled: boolean): void => {
      setReminderEnabled(enabled);
    },
    [setReminderEnabled]
  );

  const [selectedReminder, selectReminder] = useState<ReminderType>();

  const selectedValue =
    selectedReminder === "fall"
      ? fallValue ?? new Date()
      : selectedReminder === "spring"
      ? springValue ?? new Date()
      : null;

  const onDateChange = useCallback(
    (_: unknown, date: Date | undefined) => {
      selectReminder(undefined);

      if (selectedReminder === "fall") {
        setFallValue(date);
      } else if (selectedReminder === "spring") {
        setSpringValue(date);
      }
    },
    [selectedReminder]
  );

  // Flush any outstanding updates when the user navigates away from
  // this screen
  useFocusEffect(useCallback(() => () => callPending(), [callPending]));

  return (
    <Background>
      <ScrollView
        contentContainerStyle={styles.container}
        contentInsetAdjustmentBehavior={"automatic"}
        alwaysBounceVertical={false}
      >
        <View style={styles.horizontalPadding}>
          <ToggleBlock
            title={i18n.t("title2", { scope })}
            value={reminderEnabled}
            onValueChange={handleValueChange}
            body={i18n.t("body2", { scope })}
          />
        </View>

        {reminderEnabled && (
          <>
            <SectionHeader title={i18n.t("sectionHeader", { scope })} />
            <Divider style={styles.divider} />
            <ReminderItem
              label={i18n.t("spring", { scope })}
              date={springValue}
              onValueChange={setSpringValue}
            />
            <Divider style={[styles.divider, styles.itemDivider]} />
            <ReminderItem
              label={i18n.t("fall", { scope })}
              date={fallValue}
              onValueChange={setFallValue}
            />
            <Divider style={styles.divider} />

            {selectedReminder && selectedValue && (
              <RNDateTimePicker
                mode={"date"}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                display={Platform.OS === "android" ? "calendar" : "spinner"}
                value={selectedValue}
                onChange={onDateChange}
              />
            )}
          </>
        )}
      </ScrollView>
    </Background>
  );
}

export default withQueryData(useLocationNotificationsQuery, {
  options: { fetchPolicy: "cache-and-network" },
  useVariables: () => {
    const route = useRoute<ServiceRemindersProps["route"]>();

    return {
      locationId: route.params.locationId,
    };
  },
})(ServiceReminders);
