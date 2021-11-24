import { Grid, Paper } from '@material-ui/core';
import useStyles from './useStyles';

export default function MySitters(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root + ' ' + classes.mySitters}>
      <Grid item>
        <Grid container className={classes.bookingListingContainer}>
          <Grid item>
            <Paper elevation={4}>
              <h1>CURRENT BOOKING</h1>
            </Paper>
          </Grid>
          <Grid item>
            <h1>NEXT BOOKINGS</h1>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <h1>CALENDAR</h1>
      </Grid>
    </Grid>
  );
}
