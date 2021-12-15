import useStyles from './useStyles';
import { Box, Typography, Grid, Select, MenuItem } from '@material-ui/core';
import { useFormik } from 'formik';

const times = [...Array(24).keys()].map((number) => {
  if (number === 0) {
    return {
      time: '12:00 AM',
      value: number,
    };
  } else if (number < 12) {
    return {
      time: number.toString() + ':00 AM',
      value: number,
    };
  } else if (number === 12) {
    return {
      time: number.toString() + ':00 PM',
      value: number,
    };
  } else {
    return {
      time: (number - 12).toString() + ':00 PM',
      value: number,
    };
  }
});

interface props {
  day: string;
  key: number;
  startDate: number;
  month: string;
  number: number;
  name: string;
  startTime: number;
  endTime: number;
  changeStartTime: any;
  changeEndTime: any;
}

const AvailabilityRow = (props: props): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid className={classes.availabilityRow}>
      <Typography className={classes.availabilityText}>
        <Typography className={classes.availabilityDateText} display="inline">
          {props.startDate + props.number} {props.month},
        </Typography>{' '}
        {props.day}
      </Typography>
      <Box display="flex" alignItems="center">
        <Typography className={classes.availabilityLabel}>from</Typography>
        <Select
          className={classes.availabilitySelect}
          variant="outlined"
          name="startTime"
          value={props.startTime}
          onChange={(e) => props.changeStartTime(props.number, e.target.value, props.day)}
        >
          <MenuItem value="placeholder" disabled>
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
          value={props.endTime}
          onChange={(e) => props.changeEndTime(props.number, e.target.value, props.day)}
        >
          <MenuItem value="placeholder" disabled>
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
