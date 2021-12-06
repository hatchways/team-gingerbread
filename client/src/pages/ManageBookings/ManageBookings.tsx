import DateFnsUtils from '@date-io/date-fns';
import { Box, Grid, Paper, Typography, useTheme } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { cloneElement, useState } from 'react';
import { CurrentBookings, NextBooking, PastBookings } from '../../components/ManageBookings/';
import { checkIfBooked } from '../../helpers/ManageBookings';
import mockBookingData from './mockBookingData';
import { BookingRequests } from './types';
import useStyles from './useStyles';

export default function ManageBookings(): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const [date, setDate] = useState<Date | null>(new Date());
  const [sitterBookings, setSitterBookings] = useState<BookingRequests>(mockBookingData);

  const updateDate = (date: MaterialUiPickersDate) => {
    setDate(date);
  };

  const renderDay = (
    day: MaterialUiPickersDate,
    selectedDate: MaterialUiPickersDate,
    dayInCurrentMonth: boolean,
    dayComponent: JSX.Element,
  ) => {
    const renderDay = day?.getTime();
    const selectedDay = selectedDate?.getTime();
    const isSelectedDay = selectedDay === renderDay;

    const isBookedDay = checkIfBooked(sitterBookings, day);

    const dayStyle = {
      style: { backgroundColor: theme.palette.common.white, border: 'none', color: theme.palette.common.black },
      disabled: true,
    };

    if (isBookedDay) {
      dayStyle.style.backgroundColor = theme.palette.primary.main;
      dayStyle.disabled = false;
    }
    if (isSelectedDay) {
      dayStyle.style.border = `2px solid ${theme.palette.grey[400]}`;
    }
    const dayComponentStyled = cloneElement(dayComponent, dayStyle);
    return <>{dayComponentStyled}</>;
  };

  return (
    <Grid container component="main" spacing={5} className={classes.root + ' ' + classes.myBookings}>
      <Grid item sm={6}>
        <Grid container spacing={2} className={classes.bookingListingContainer}>
          <Grid item>
            <Paper elevation={2}>
              <Box p={2} pt={2}>
                <Typography variant="h6" component="div" className={classes.uppercase}>
                  Your Next Booking
                </Typography>
                <NextBooking bookingRequests={sitterBookings} />
              </Box>
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={2}>
              <Box p={2} pt={2}>
                <Typography variant="h6" component="div" className={classes.uppercase}>
                  Current Bookings
                </Typography>
                <CurrentBookings bookingRequests={sitterBookings} />
                <Typography variant="h6" component="div" className={classes.uppercase}>
                  Past Bookings
                </Typography>
                <PastBookings bookingRequests={sitterBookings} />
              </Box>
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
