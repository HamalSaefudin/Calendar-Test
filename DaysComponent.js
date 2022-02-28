/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {decideBgColor, decideTextColor} from './helper';
import moment from 'moment';

export default function DaysComponent({
  itemProps,
  startDate,
  endDate,
  holiday,
  onChangeStartDate,
  onChangeEndDate,
}) {
  const {date, state, marking, accessibilityLabel} = itemProps;
  const daysName = accessibilityLabel.split(' ')[1];
  const {radius, bgColor} = decideBgColor(
    marking?.startDate,
    marking?.endDate,
    marking?.rangeDate,
    daysName
  );
  return (
    <View style={styles.containerRangeIndicator}>
      {marking?.endDate || marking?.startDate ? (
        <View style={styles.rangeIndicator(marking?.startDate, marking?.endDate)} />
      ) : undefined}
      <TouchableOpacity
        onPress={() => {
          if (startDate && moment(startDate) > moment(date?.dateString)) {
            onChangeEndDate(startDate);
            onChangeStartDate(date?.dateString);
          } else if (startDate) {
            onChangeEndDate(date?.dateString);
          } else {
            onChangeEndDate('');
            onChangeStartDate(date?.dateString);
          }
        }}
        style={styles.itemDateContainer(marking?.rangeDate, bgColor, radius,daysName)}>
        <View
          style={
            date.dateString === moment().format('YYYY-MM-DD') &&
            styles.todayIndicator
          }>
          <Text
            style={{
              textAlign: 'center',
              color: decideTextColor(daysName, state, date.dateString, holiday),
            }}>
            {date.day}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerRangeIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  rangeIndicator: (startDate, endDate) => ({
    height: 30,
    width: 20,
    position: 'absolute',
    backgroundColor: '#FD374D',
    zIndex: -2,
    right: startDate ? 0 : undefined,
    left: endDate ? 0 : undefined,
  }),
  itemDateContainer: (rangeDate, bgColor, radius,daysName) => ({
    width: 50,
    height: rangeDate ? 30 : 50,
    backgroundColor: bgColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius:daysName === 'Saturday' ? 20 : radius,
    borderBottomRightRadius:daysName === 'Saturday' ? 20 : radius,
    borderTopLeftRadius:daysName === 'Sunday' ? 20 : radius,
    borderBottomLeftRadius:daysName === 'Sunday' ? 20 : radius,
  }),
  todayIndicator: {
    borderColor: 'green',
    borderRadius: 20,
    padding: 5,
    borderWidth: 1,
  },
});
