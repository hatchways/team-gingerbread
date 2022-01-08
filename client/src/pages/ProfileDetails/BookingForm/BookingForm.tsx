import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Select, MenuItem, Grid, Button, Card } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { useFormik } from 'formik';
import { SnackBarContext } from '../../../context/useSnackbarContext';
import { AuthContext } from '../../../context/useAuthContext';
import fetchProfile from '../../../helpers/APICalls/fetchProfile';
import createRequestNotification from '../../../helpers/APICalls/createRequestNotification';
import useStyles from './useStyles';
import { times } from './times';

const BookingForm = (): JSX.Element => {
  const { loggedInUser } = useContext(AuthContext);
  const { updateSnackBarMessage } = useContext(SnackBarContext);
  const { id } = useParams<{ id?: string }>();
  const classes = useStyles();
  const [availableTime, setAvailableTime] = useState([
    {
      date: 'Monday-default',
      startTime: '8:00 AM - default',
      endTime: '10:00 PM - default',
      available: true,
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
    if (id) {
      fetchProfile(id).then((data) => setAvailableTime(data.success.profile.availableTime));
    }
  }, [id]);

  const formik = useFormik({
    initialValues: {
      startDate: 'placeholder',
      startTime: 'placeholder',
      endDate: 'placeholder',
      endTime: 'placeholder',
    },
    onSubmit: (values) => {
      const startDateComplete = new Date(values.startDate);
      startDateComplete.setHours(parseInt(values.startTime));
      const endDateComplete = new Date(values.endDate);
      endDateComplete.setHours(parseInt(values.endTime));
      const duration = (endDateComplete.getTime() - startDateComplete.getTime()) / 3600000;
      if (id && loggedInUser) {
        createRequestNotification(loggedInUser.username, duration, id).then((data) => console.log(data));
        updateSnackBarMessage('Your request for service has been submitted!');
      }
      formik.resetForm();
    },
  });

  useEffect(() => {
    const startDate = availableTime.find((day) => day.date === formik.values.startDate);
    const startTime = typeof startDate?.startTime === 'number' ? parseInt(startDate?.startTime) : 24;
    const endTime = typeof startDate?.endTime === 'number' ? parseInt(startDate?.endTime) : 24;
    const availableTimes = times.filter((t) => t.value >= startTime && t.value <= endTime);
    setAvailableStartHours(availableTimes);
  }, [availableTime, formik.values.startDate]);

  useEffect(() => {
    const endDate = availableTime.find((day) => day.date === formik.values.endDate);
    const startTime = typeof endDate?.startTime === 'number' ? parseInt(endDate?.startTime) : 24;
    const endTime = typeof endDate?.endTime === 'number' ? parseInt(endDate?.endTime) : 24;
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
              {availableTime.map((day) => (
                <MenuItem value={day.date} key={day.date}>
                  {new Date(day.date).toDateString()}
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
              {availableTime.map((day) => (
                <MenuItem value={day.date} key={day.date}>
                  {new Date(day.date).toDateString()}
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
