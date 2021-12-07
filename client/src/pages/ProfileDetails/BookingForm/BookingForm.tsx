import useStyles from './useStyles';
import { Box, Typography, Select, MenuItem, OutlinedInput, Grid, Button, Card } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { useFormik } from 'formik';
import fetchProfile from '../../../helpers/APICalls/fetchProfile';
import { useEffect, useState } from 'react';

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

const BookingForm = (props: { id: string }): JSX.Element => {
  const classes = useStyles();
  const [availableTime, setAvailableTime] = useState([
    {
      day: 'Monday-default',
      startTime: '8:00 AM - default',
      endTime: '10:00 PM - default',
    },
  ]);
  const [availableStartHours, setAvailableStartHours] = useState([
    {
      time: '12:00 AM - default',
      value: 0,
    },
  ]);
  const [availableEndHours, setAvailableEndHours] = useState([
    {
      time: '11:00 PM - default',
      value: 23,
    },
  ]);

  useEffect(() => {
    fetchProfile(props.id).then((data) => setAvailableTime(data.success.profile.availableTime));
  }, [props.id]);

  // submit action triggers call to create notification
  // create createNotification helper that is linked to /notifications/create
  // 1. create notification for client that request has been submitted
  // 2. create notification for partner that service has been requested

  const formik = useFormik({
    initialValues: {
      startDate: 'placeholder',
      startTime: 'placeholder',
      endDate: 'placeholder',
      endTime: 'placeholder',
    },
    onSubmit: (values) => {
      alert(`
      startDate: ${values.startDate}\n
      startTime: ${values.startTime}\n
      endDate: ${values.endDate}\n
      endTime: ${values.endTime}
      `);
      formik.resetForm();
    },
  });

  useEffect(() => {
    const startDate = availableTime.find((date) => date.day === formik.values.startDate);
    const startTime = typeof startDate?.startTime === 'number' ? parseInt(startDate?.startTime) : 24;
    const endTime = typeof startDate?.startTime === 'number' ? parseInt(startDate?.endTime) : 24;
    const availableTimes = times.filter((t) => t.value >= startTime && t.value <= endTime);
    setAvailableStartHours(availableTimes);
  }, [availableTime, formik.values.startDate]);

  useEffect(() => {
    const endDate = availableTime.find((date) => date.day === formik.values.endDate);
    const startTime = typeof endDate?.startTime === 'number' ? parseInt(endDate?.startTime) : 24;
    const endTime = typeof endDate?.startTime === 'number' ? parseInt(endDate?.endTime) : 24;
    const availableTimes = times.filter((t) => t.value >= startTime && t.value <= endTime);
    setAvailableEndHours(availableTimes);
  }, [availableTime, formik.values.endDate]);

  return (
    <Card className={classes.bookingFormCard}>
      <form onSubmit={formik.handleSubmit} className={classes.bookingForm}>
        <Typography className={classes.userRateText}>$14/hr</Typography>
        <Rating defaultValue={4.5} precision={0.5} readOnly />

        <Box className={classes.profileDetailsForm}>
          <Typography className={classes.profileDetailsLabel}>drop off</Typography>
          <Grid className={classes.profileDetailsFormContainer}>
            {/* <OutlinedInput
              type="date"
              name="startDate"
              className={classes.profileDetailsFormInput}
              value={formik.values.startDate}
              onChange={formik.handleChange}
            ></OutlinedInput> */}
            <Select
              variant="outlined"
              name="startDate"
              className={classes.profileDetailsFormInput}
              value={formik.values.startDate}
              onChange={formik.handleChange}
            >
              <MenuItem value="placeholder" disabled>
                start date
              </MenuItem>
              {availableTime.map((time) => (
                <MenuItem value={time.day} key={time.day}>
                  {time.day}
                </MenuItem>
              ))}
            </Select>
            <Select
              variant="outlined"
              name="startTime"
              className={classes.profileDetailsFormSelect}
              value={formik.values.startTime}
              onChange={formik.handleChange}
            >
              <MenuItem value="placeholder" disabled>
                start time
              </MenuItem>
              {availableStartHours.map((time) => (
                <MenuItem value={time.value} key={time.value}>
                  {time.time}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Box>

        <Box className={classes.profileDetailsForm}>
          <Typography className={classes.profileDetailsLabel}>pick up</Typography>
          <Grid className={classes.profileDetailsFormContainer}>
            {/* <OutlinedInput
              type="date"
              name="endDate"
              className={classes.profileDetailsFormInput}
              value={formik.values.endDate}
              onChange={formik.handleChange}
            ></OutlinedInput> */}
            <Select
              variant="outlined"
              name="endDate"
              className={classes.profileDetailsFormInput}
              value={formik.values.endDate}
              onChange={formik.handleChange}
            >
              <MenuItem value="placeholder" disabled>
                end date
              </MenuItem>
              {availableTime.map((time) => (
                <MenuItem value={time.day} key={time.day}>
                  {time.day}
                </MenuItem>
              ))}
            </Select>
            <Select
              variant="outlined"
              name="endTime"
              className={classes.profileDetailsFormSelect}
              value={formik.values.endTime}
              onChange={formik.handleChange}
            >
              <MenuItem value="placeholder" disabled>
                end time
              </MenuItem>
              {availableEndHours.map((time) => (
                <MenuItem value={time.value} key={time.value}>
                  {time.time}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Box>

        <Button type="submit" className={classes.requestFormButton}>
          send request
        </Button>
      </form>
    </Card>
  );
};

export default BookingForm;
