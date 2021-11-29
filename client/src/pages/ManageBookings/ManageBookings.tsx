import { useState, cloneElement } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useTheme } from '@material-ui/core';

import { Calendar } from '@material-ui/pickers';

import useStyles from './useStyles';

export default function ManageBookings(): JSX.Element {
  const classes = useStyles('blue')();
  const theme = useTheme();
  const [date, setDate] = useState<Date | null>(new Date());
  const [bookedDates, setBookedDates] = useState<Array<Date | null>>([new Date(2021, 11, 10), new Date(2021, 11, 11)]);

  const updateDate = (date: MaterialUiPickersDate) => {
    setDate(date);
  };

  const renderDay = (
    day: MaterialUiPickersDate,
    selectedDate: MaterialUiPickersDate,
    dayInCurrentMonth: boolean,
    dayComponent: JSX.Element,
  ) => {
    const dayBackgroundColor = theme.palette.primary;
    const isBookedDay = bookedDates.findIndex((bookedDay) => bookedDay?.getDate() === day?.getDate());
    let dayStyle = theme.palette.grey[100];
    if (isBookedDay !== -1) {
      dayStyle = theme.palette.primary.main;
    }

    const dayComponentStyled = cloneElement(dayComponent, { style: { backgroundColor: dayStyle } });
    return <div>{dayComponentStyled}</div>;
  };

  return (
    <Grid container component="main" spacing={5} className={classes.root + ' ' + classes.mySitters}>
      <Grid item sm={6}>
        <Grid container className={classes.bookingListingContainer}>
          <Grid item>
            <Paper elevation={2}>
              <h1>CURRENT BOOKING</h1>
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={2}>
              <h1>NEXT</h1>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={6}>
        <Paper elevation={2} square={false}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              autoOk
              orientation="landscape"
              disableToolbar={true}
              variant="static"
              openTo="date"
              value={date}
              onChange={updateDate}
              renderDay={renderDay}
            />
          </MuiPickersUtilsProvider>
        </Paper>
      </Grid>
    </Grid>
  );
}
