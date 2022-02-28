/* eslint-disable prettier/prettier */
const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);

export function getRange  (startDate, endDate) {
    const range = moment.range(startDate,endDate);

    for (let month of range.by('day')) {
      month.format('YYYY-MM-DD');
    }

    const days = Array.from(range.by('days'));
    const formatedDays = days.map(x=>x.format('YYYY-MM-DD'));

    return formatedDays.reduce((json, value, index) => { json[value] = {
        startDate: index === 0,
        endDate:index === formatedDays.length - 1,
        rangeDate: index !== formatedDays.length - 1 && index !== 0,
    }; return json; }, {});
}


export function decideBgColor  (startDate,endDate,rangeDate){
    let radius = 0;
    let bgColor;
    if (startDate) {
        bgColor = '#32E3A2';
        radius = 50 / 2;
      } else if (endDate) {
        radius = 50 / 2;
        bgColor = '#FD374D';
      } else if (rangeDate) {
        bgColor = '#FD374D';
      } else {
        bgColor = 'transparent';
      }

    return {
        radius,
        bgColor,
    };
}

export function decideTextColor (daysName,state,date,holidayData){
    let color;
    const isHoliday = holidayData?.filter(x=> Moment(x.holiday_date).format('YYYY-MM-DD') === date);
    if (isHoliday?.length !== 0 && isHoliday !== undefined){
      color = 'red';
    } else if (daysName === 'Saturday' || daysName === 'Sunday'){
        color = state === 'disabled' ? 'grey' : 'blue';
    } else if (state === 'disabled'){
        color = 'grey';
    } else if (date === Moment().format('YYYY-MM-DD')) {
        color = 'green';
    }  else {
        color = 'black';
    }
    return color;
}

export function generateArrayOfYears() {
    var current = new Date().getFullYear();
    const max = new Date(current + 10);
    var min = max - 40;
    var years = [];

    for (var i = max; i >= min; i--) {
      years.push(i);
    }

    const modifiedYears = years.map((x,index)=>{
        if (index !== 0) {return {label:x,value:x};}
    });

    return modifiedYears.filter(x=>x);
  }

export function generateMonthData(){
    const months = moment.months();
    return months.map(x=> ({label:x,value:x}));
}
