import * as React from 'react';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';

const today = dayjs();
const tomorrow = today.add(1, 'day');
const twelvePM = dayjs().set('hour', 12).startOf('hour');
const fivePM = dayjs().set('hour', 17).startOf('hour');



export default function ValidationBehaviorView({ onDateTimeSelect }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid
        container
        columns={{ xs: 1, lg: 2 }}
        spacing={4}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <DateCalendar
            value={selectedDate}
            onChange={(newDate) => {
              setSelectedDate(newDate);
              onDateTimeSelect(formatSelectedDateTime(newDate, selectedTime));
            }}
            disablePast
          />
        </Grid>
        <Grid item>
          <TimeClock
            value={selectedTime}
            onChange={(newTime) => {
              setSelectedTime(newTime);
              onDateTimeSelect(formatSelectedDateTime(selectedDate, newTime));
            }}
            maxTime={fivePM}
            minutesStep={15}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
