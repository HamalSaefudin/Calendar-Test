/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import moment from 'moment';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import CalendarTools from './CalendarTools';
import DaysComponent from './DaysComponent';
import { getRange } from './helper';
const calendarRef = React.createRef(null);

export default function App() {
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [markedObject, setMarkedObject] = React.useState({});
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [holiday, setHoliday] = React.useState();

  const [month, setMonth] = React.useState(moment().format('MMMM'));

  React.useEffect(() => {
    if (startDate !== '' && endDate !== '') {
      setMarkedObject(getRange(startDate, endDate));
    }
  }, [startDate, endDate]);

  React.useEffect(() => {
    fetchingHoliday();
  }, []);

  async function fetchingHoliday() {
    try {
      const monthStringToNumber = moment(`${year}-${month}-01`).format('M');
      console.log(monthStringToNumber);
      const url = `https://api-harilibur.vercel.app/api?month=${monthStringToNumber}&year=${year}`;
      const response = await axios.get(url);
      setHoliday(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  function handleYear(e) {
    setYear(e());
    const differentyear = e() - year;
    calendarRef.current.addMonth(differentyear * 12);
  }

  function handleMonth(e) {
    setMonth(e());
    calendarRef.current.addMonth(
      moment(`${year}-${e()}-01`).format('MM') -
        moment(`${year}-${month}-01`).format('MM'),
    );
  }

  function handleNextMonth() {
    calendarRef.current.addMonth(-1);
    const prevMonth = moment(`${month}-${year}`).add(-1, 'M');
    setMonth(prevMonth.format('MMMM'));
  }

  function handlePreviousMonth() {
    calendarRef.current.addMonth(1);
    const nextMonth = moment(`${month}-${year}`).add(1, 'M');
    setMonth(nextMonth.format('MMMM'));
  }

  return (
    <View style={styles.wrapperPage}>
      <CalendarTools
        yearValue={year}
        onChangeYear={handleYear}
        monthValue={month}
        onChangeMonth={handleMonth}
        onForwardMonth={handleNextMonth}
        onBackwardMonth={handlePreviousMonth}
      />
      <Calendar
        ref={calendarRef}
        current="2022-02"
        hideArrows={true}
        markingType="period"
        renderHeader={() => undefined}
        theme={styles.themeHeader}
        markedDates={markedObject}
        dayComponent={props => (
          <DaysComponent
            itemProps={props}
            startDate={startDate}
            endDate={endDate}
            holiday={holiday}
            onChangeStartDate={setStartDate}
            onChangeEndDate={setEndDate}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapperPage: {flex: 1, backgroundColor: 'white'},
  themeHeader: {
    'stylesheet.calendar.header': {
      dayTextAtIndex0: {
        color: 'red',
      },
      dayTextAtIndex6: {
        color: 'blue',
      },
      dayTextAtIndex1: {
        color: 'black',
      },
      dayTextAtIndex2: {
        color: 'black',
      },
      dayTextAtIndex3: {
        color: 'black',
      },
      dayTextAtIndex4: {
        color: 'black',
      },
      dayTextAtIndex5: {
        color: 'black',
      },
    },
  },
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
  itemDateContainer: (rangeDate, bgColor, radius) => ({
    width: 50,
    height: rangeDate ? 30 : 50,
    backgroundColor: bgColor,
    borderRadius: radius,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  todayIndicator: {
    borderColor: 'green',
    borderRadius: 20,
    padding: 5,
    borderWidth: 1,
  },
});
