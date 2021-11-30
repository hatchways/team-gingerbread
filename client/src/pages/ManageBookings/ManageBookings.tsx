import { useState, cloneElement, FunctionComponentElement } from 'react';
import { Grid, Paper, Typography, Box } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useTheme } from '@material-ui/core';
import { BookingStatus, BookingRequest, BookingRequests } from './types';
import useStyles from './useStyles';
import PastBookings from '../../components/ManageBookings/PastBookings';
import CurrentBookings from '../../components/ManageBookings/CurrentBookings';

function checkIfBooked(bookingRequests: BookingRequests, dateToCheck: Date | null) {
  const check = bookingRequests.findIndex((booking) => {
    const startDay = booking.start.getDate();
    const checkDay = dateToCheck?.getDate();
    return startDay === checkDay;
  });
  return check > -1;
}

export default function ManageBookings(): JSX.Element {
  const classes = useStyles('blue')();
  const theme = useTheme();
  const [date, setDate] = useState<Date | null>(new Date());
  const [sitterBookings, setSitterBookings] = useState<BookingRequests>([
    {
      description: 'Test Booking Request Description #1',
      status: BookingStatus.pending,
      requestId: '61a26c5dc517da0ca7a2b9',
      userId: '619c203917b5e66160b119fb',
      sitterId: '618ff3d3939f8555dc391646',
      start: new Date(2021, 10, 9),
      end: new Date(2021, 10, 11),
    },
    {
      description: 'Test Booking Request Description #3',
      status: BookingStatus.declined,
      requestId: '61a26c5dc517da480ca7a2sdf9',
      userId: '619c203917b5e66160b119fb',
      sitterId: '618ff3d3939f8555dc391646',
      start: new Date(2021, 10, 10),
      end: new Date(2021, 10, 15),
    },
    {
      description: 'Test Booking Request Description #4',
      status: BookingStatus.accepted,
      requestId: '61a26cc517da480ca7a2sdf9',
      userId: '619c203917b5e66160b119fb',
      sitterId: '618ff3d3939f8555dc391646',
      start: new Date(2021, 10, 29),
      end: new Date(2021, 10, 29),
    },
    {
      description: 'Test Booking Request Description #5',
      status: BookingStatus.declined,
      requestId: '61a5dc517da480ca7a2sdf9',
      userId: '619c203917b5e66160b119fb',
      sitterId: '618ff3d3939f8555dc391646',
      start: new Date(2021, 11, 5),
      end: new Date(2021, 11, 6),
    },
  ]);

  const updateDate = (date: MaterialUiPickersDate) => {
    setDate(date);
  };

  const renderDay = (
    day: MaterialUiPickersDate,
    selectedDate: MaterialUiPickersDate,
    dayInCurrentMonth: boolean,
    dayComponent: JSX.Element,
  ) => {
    const renderDay = day?.getDate();
    const selectedDay = selectedDate?.getDate();
    const isSelectedDay = selectedDay === renderDay;

    const isBookedDay = checkIfBooked(sitterBookings, day);

    let dayStyle = theme.palette.common.white;

    if (isBookedDay) {
      dayStyle = theme.palette.primary.light;
    }

    if (isSelectedDay) {
      dayStyle = theme.palette.primary.main;
    }

    const dayComponentStyled = cloneElement(dayComponent, { style: { backgroundColor: dayStyle } });
    return <div>{dayComponentStyled}</div>;
  };

  return (
    <Grid container component="main" spacing={5} className={classes.root + ' ' + classes.mySitters}>
      <Grid item sm={6}>
        <Grid container spacing={2} className={classes.bookingListingContainer}>
          <Grid item>
            <Paper elevation={2}>
              <Box p={2} pt={2}>
                <Typography variant="h6" component="div" className={classes.uppercase}>
                  Your Next Booking
                </Typography>
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
