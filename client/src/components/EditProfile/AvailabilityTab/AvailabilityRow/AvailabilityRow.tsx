import useStyles from './useStyles';
import { useState, useEffect, useContext } from 'react';
import { Box, Typography, Grid, Select, MenuItem } from '@material-ui/core';
import fetchProfile from '../../../../helpers/APICalls/fetchProfile';
import editAvailability from '../../../../helpers/APICalls/editAvailability';
import { AuthContext } from '../../../../context/useAuthContext';
import { SnackBarContext } from '../../../../context/useSnackbarContext';
import { times } from './times';

interface props {
  date: Date;
  key: string;
  dayOfWeek: string;
  dayOfMonth: number;
  month: string;
}

const AvailabilityRow = (props: props): JSX.Element => {
  const date = props.date;
  const classes = useStyles();
  const { updateSnackBarMessage } = useContext(SnackBarContext);
  const { loggedInUser } = useContext(AuthContext);
  const [startTime, setStartTime] = useState(-1);
  const [endTime, setEndTime] = useState(-1);
  const [updating, setUpdating] = useState(false);
  const [availability, setAvailability] = useState([]);
  const [available, setAvailable] = useState(true);

  // useEffect(() => { //need to fetch startTime and endTime from db and set to state vars if exist
  //   fetchProfile(loggedInUser.id).then((data) => setAvailability(data.success.profile.availableTime));
  // }, []);

  useEffect(() => {
    if (updating && loggedInUser) {
      editAvailability(loggedInUser.id, date.toDateString(), startTime, endTime, available).then((data) =>
        console.log(data),
      );
      setUpdating(false);
      updateSnackBarMessage('Your availability has been updated');
    }
  }, [availability, updating, loggedInUser, updateSnackBarMessage, date, startTime, endTime, available]);

  const updateAvailability = (newTime: any, param: string) => {
    setUpdating(true);
    if (param === 'start') {
      setStartTime(newTime);
    } else {
      setEndTime(newTime);
    }
  };

  return (
    <Grid className={classes.availabilityRow}>
      <Typography className={classes.availabilityText}>
        <span className={classes.availabilityDateText}>
          {props.dayOfMonth} {props.month},
        </span>{' '}
        {props.dayOfWeek}
      </Typography>
      <Box display="flex" alignItems="center">
        <Typography className={classes.availabilityLabel}>from</Typography>
        <Select
          className={classes.availabilitySelect}
          variant="outlined"
          name="startTime"
          value={startTime}
          onChange={(e) => updateAvailability(e.target.value, 'start')}
        >
          <MenuItem value={-1} disabled>
            start time
          </MenuItem>
          {times.map((time) => (
            <MenuItem value={time.value} key={time.value}>
              {time.time}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography className={classes.availabilityLabel}>to</Typography>
        <Select
          className={classes.availabilitySelect}
          variant="outlined"
          name="endTime"
          value={endTime}
          onChange={(e) => updateAvailability(e.target.value, 'end')}
        >
          <MenuItem value={-1} disabled>
            end time
          </MenuItem>
          {times.map((time) => (
            <MenuItem value={time.value} key={time.value}>
              {time.time}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Grid>
  );
};

export default AvailabilityRow;
