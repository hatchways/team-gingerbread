import useStyles from './useStyles';
import { Box, Typography, Select, MenuItem, OutlinedInput, Grid, Button } from '@material-ui/core';
import YellowStar from '../YellowStar.png';
import GreyStar from '../GreyStar.png';
import { useFormik } from 'formik';

const times = [
  '12:00 AM',
  '1:00 AM',
  '2:00 AM',
  '3:00 AM',
  '4:00 AM',
  '5:00 AM',
  '6:00 AM',
  '7:00 AM',
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM',
  '8:00 PM',
  '9:00 PM',
  '10:00 PM',
  '11:00 PM',
];

const BookingForm = (): JSX.Element => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      startDate: '',
      startTime: 'placeholder',
      endDate: '',
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

  return (
    <form className={classes.requestForm} onSubmit={formik.handleSubmit}>
      <Typography className={classes.userRate}>$14/hr</Typography>
      <Box className={classes.userRatingContainer}>
        <img src={YellowStar} alt="" className={classes.userRateStar} />
        <img src={YellowStar} alt="" className={classes.userRateStar} />
        <img src={YellowStar} alt="" className={classes.userRateStar} />
        <img src={YellowStar} alt="" className={classes.userRateStar} />
        <img src={GreyStar} alt="" className={classes.userRateStar} />
      </Box>

      <Box className={classes.profileDetailsForm}>
        <Typography className={classes.profileDetailsLabel}>drop off</Typography>
        <Grid className={classes.profileDetailsFormContainer}>
          <OutlinedInput
            type="date"
            name="startDate"
            className={classes.profileDetailsFormInput}
            value={formik.values.startDate}
            onChange={formik.handleChange}
          ></OutlinedInput>
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
            {times.map((time) => (
              <MenuItem value={time} key={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Box>

      <Box className={classes.profileDetailsForm}>
        <Typography className={classes.profileDetailsLabel}>pick up</Typography>
        <Grid className={classes.profileDetailsFormContainer}>
          <OutlinedInput
            type="date"
            name="endDate"
            className={classes.profileDetailsFormInput}
            value={formik.values.endDate}
            onChange={formik.handleChange}
          ></OutlinedInput>
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
            {times.map((time) => (
              <MenuItem value={time} key={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Box>
      <Button type="submit" className={classes.requestFormButton}>
        send request
      </Button>
    </form>
  );
};

export default BookingForm;
