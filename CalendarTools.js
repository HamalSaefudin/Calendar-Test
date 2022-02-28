/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { generateArrayOfYears, generateMonthData } from './helper';

 function CalendarTools({
    yearValue,onChangeYear,monthValue,onChangeMonth,onForwardMonth,onBackwardMonth,
}) {
    const [openYear, setOpenYear] = React.useState(false);
    const [openMonth, setOpenMonth] = React.useState(false);
  return (
    <View style={styles.containerTools}>
        <DropDownPicker
          open={openYear}
          value={yearValue}
          items={generateArrayOfYears()}
          setOpen={setOpenYear}
          setValue={e => onChangeYear(e)}
          containerStyle={{width: '30%'}}
          style={{borderWidth: 0}}
        />
        <DropDownPicker
          open={openMonth}
          value={monthValue}
          items={generateMonthData()}
          setOpen={setOpenMonth}
          setValue={e => onChangeMonth(e)}
          containerStyle={{width: '45%'}}
          style={{borderWidth: 0}}
        />
        <View style={styles.rowStyles}>
          <TouchableOpacity
            onPress={onForwardMonth}
            style={styles.btnNextStyle}>
            <MaterialIcons name="keyboard-arrow-left" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onBackwardMonth}
            style={styles.btnNextStyle}>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={28}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
  );
}

export default CalendarTools;

const styles = StyleSheet.create({
    containerTools: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-around',
    },
    rowStyles: {flexDirection: 'row'},
    btnNextStyle: {
        height: 30,
        width: 30,
        backgroundColor: 'red',
        borderRadius: 30 / 2,
        marginHorizontal: 5,
      },
});
