import { useState } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { Calendar } from '@material-ui/pickers';

import useStyles from './useStyles';

export default function ManageBookings(): JSX.Element {
  const classes = useStyles();
  const [date, setDate] = useState(new Date());

  const updateDate = (date: MaterialUiPickersDate) => {
    console.log(date);
  };

  const updateDate2 = (date: MaterialUiPickersDate, isFinish: boolean | undefined) => {
    console.log(date);
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
            />
          </MuiPickersUtilsProvider>
        </Paper>
      </Grid>
    </Grid>
  );
}
