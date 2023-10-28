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



export default function ValidationBehaviorView() {
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
          <DateCalendar defaultValue={tomorrow} disablePast/>
        </Grid>
        <Grid item>
          <TimeClock defaultValue={twelvePM} maxTime={fivePM}
          minutesStep={15} />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
