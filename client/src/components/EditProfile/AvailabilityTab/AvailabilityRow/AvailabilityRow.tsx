import useStyles from './useStyles';
import { useState, useEffect, useContext } from 'react';
import { Box, Typography, Grid, Select, MenuItem, Checkbox } from '@material-ui/core';
import fetchProfile from '../../../../helpers/APICalls/fetchProfile';
// import fetchProfile from '../../../../helpers/APICalls/fetchProfileWithSignal';
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

interface day {
  date: Date;
  startTime: number;
  endTime: number;
  available: boolean;
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
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    // const controller = new AbortController();
    // const signal = controller.signal;
    if (loggedInUser) {
      fetchProfile(loggedInUser.id).then((data) => {
        // fetchProfile(loggedInUser.id, signal).then((data) => {
        // console.log(data);
        if (!data.error) {
          const availableTime = data.success.profile.availableTime;
          const currentDay = availableTime.filter(
            (day: day) =>
              new Date(day.date).getDate() === new Date(date).getDate() &&
              new Date(day.date).getMonth() === new Date(date).getMonth() &&
              new Date(day.date).getFullYear() === new Date(date).getFullYear(),
          )[0];
          if (currentDay) {
            setStartTime(currentDay.startTime);
            setEndTime(currentDay.endTime);
            setAvailable(currentDay.available);
          }
        }
      });
    }
    // return () => controller.abort();
  }, [loggedInUser, date]);

  useEffect(() => {
    if (updating && loggedInUser) {
      setUpdating(false);
      editAvailability(loggedInUser.id, date.toDateString(), startTime, endTime, available).then((data) => {
        updateSnackBarMessage('Your availability has been updated');
      });
    }
  }, [availability, updating, loggedInUser, updateSnackBarMessage, date, startTime, endTime, available]);

  const updateAvailability = (newTime: any, param: string) => {
    if (param === 'start') {
      setStartTime(newTime);
    } else {
      setEndTime(newTime);
    }
    setUpdating(true);
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
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography className={classes.availableLabel}>Available?</Typography>
        <Checkbox
          className={classes.availableCheckbox}
          color="default"
          checked={available}
          value={available}
          onChange={() => {
            setAvailable(!available);
            setUpdating(true);
          }}
          disabled={startTime === -1 || endTime === -1}
        />
      </Box>
    </Grid>
  );
};

export default AvailabilityRow;
