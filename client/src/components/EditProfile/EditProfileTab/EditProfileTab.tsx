import Typography from '@material-ui/core/Typography';
import { FormLabel, OutlinedInput, Select, MenuItem, TextField, Button, Box, Switch } from '@material-ui/core';
import { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import useStyles from './useStyles';
import { useSnackBar } from '../../../context/useSnackbarContext';
import edit from '../../../helpers/APICalls/edit';
import fetchProfile from '../../../helpers/APICalls/fetchProfileWithSignal';
import { AuthContext } from '../../../context/useAuthContext';

interface Profile {
  firstName: string;
  lastName: string;
  description: string;
  isSitter: boolean;
  address: string;
  phoneNumber: string;
  dateOfBirth: Date;
  available: boolean;
  accountType: string;
  availability: string;
  gender: string;
  email: string;
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const days = [...Array(31).keys()].map((i) => i + 1);
const years = [...Array(119).keys()].map((i) => i + 1903).sort((a, b) => b - a);

export default function EditProfileTab(): JSX.Element {
  const { loggedInUser } = useContext(AuthContext);
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const [accountType, setAccountType] = useState<string>('partner');
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [profile, setProfile] = useState({
    isSitter: false,
    firstName: '',
    lastName: '',
    description: '',
    address: '',
    phoneNumber: '',
    dateOfBirth: new Date('December 17, 1995 03:24:00'),
    available: false,
    accountType: '',
    availability: '',
    gender: '',
    email: '',
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (loggedInUser) {
      fetchProfile(loggedInUser.id, signal).then((data) => {
        if (!data.error) {
          const newProfile = {
            isSitter: data.success.profile.isSitter,
            available: data.success.profile.available,
            availability: data.success.profile.availability,
            firstName: data.success.profile.firstName,
            lastName: data.success.profile.lastName,
            gender: data.success.profile.gender,
            dateOfBirth: data.success.profile.dateOfBirth,
            email: data.success.profile.email,
            phoneNumber: data.success.profile.phoneNumber,
            address: data.success.profile.address,
            description: data.success.profile.description,
            accountType: data.success.profile.isSitter ? 'partner' : 'client',
          };
          // console.log(newProfile);
          setProfile(newProfile);
        }
      });
    }
    return () => controller.abort();
  }, [loggedInUser]);

  const formik = useFormik({
    initialValues: {
      isSitter: profile.isSitter,
      available: profile.available,
      availability: profile.availability || 'availability',
      firstName: profile.firstName,
      lastName: profile.lastName,
      gender: profile.gender || 'gender',
      birthdateMonth: profile.dateOfBirth ? months[new Date(profile.dateOfBirth).getMonth()] : 'month',
      birthdateDay: profile.dateOfBirth ? new Date(profile.dateOfBirth).getDate() : 'day',
      birthdateYear: profile.dateOfBirth ? new Date(profile.dateOfBirth).getFullYear() : 'year',
      email: profile.email,
      phoneNumber: profile.phoneNumber,
      address: profile.address,
      description: profile.description,
    },
    onSubmit: (values) => {
      if (loggedInUser) {
        edit(
          loggedInUser.id,
          values.isSitter,
          values.firstName,
          values.lastName,
          values.description,
          values.address,
          values.phoneNumber,
          new Date(`${values.birthdateMonth} ${values.birthdateDay}, ${values.birthdateYear}`),
          values.available,
          values.availability,
          values.gender,
          values.email,
        ).then((data) => {
          console.log(data);
          // formik.resetForm();
          // location.reload();
        });
      }
    },
    enableReinitialize: true,
  });

  return (
    <Box>
      <Typography className={classes.title}>Edit Profile</Typography>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        {accountType === 'partner' && (
          <Box className={classes.section}>
            <FormLabel>
              <Typography className={classes.label}>
                {formik.values.isSitter ? `i'm a sitter` : `i'm not a sitter`}
              </Typography>
            </FormLabel>
            <Switch
              id="isSitter"
              name="isSitter"
              value={formik.values.isSitter}
              checked={formik.values.isSitter === true}
              onChange={(_, checked) => {
                formik.setFieldValue('isSitter', checked ? true : false);
              }}
              color="primary"
            />
          </Box>
        )}

        {accountType === 'partner' && (
          <Box className={classes.section}>
            <FormLabel>
              <Typography className={classes.label}>availability</Typography>
            </FormLabel>
            <Select
              className={classes.selectAvailability}
              id="availability"
              name="availability"
              value={formik.values.availability}
              onChange={formik.handleChange}
              variant="outlined"
              style={formik.values.availability !== 'availability' ? { color: 'black' } : { color: 'grey' }}
            >
              <MenuItem value="availability" disabled>
                availability
              </MenuItem>
              <MenuItem value="<10">Less than 10 hrs/week</MenuItem>
              <MenuItem value="10-20">10-20 hrs/week</MenuItem>
              <MenuItem value="20-30">20-30 hrs/week</MenuItem>
              <MenuItem value=">30">More than 30 hrs/week</MenuItem>
            </Select>
          </Box>
        )}

        <Box className={classes.section}>
          <FormLabel>
            <Typography className={classes.label}>first name</Typography>
          </FormLabel>
          <OutlinedInput
            className={classes.input}
            id="firstName"
            placeholder="John"
            name="firstName"
            autoComplete="given-name"
            autoFocus={accountType === 'client'}
            value={formik.values.firstName}
            onChange={formik.handleChange}
          ></OutlinedInput>
        </Box>

        <Box className={classes.section}>
          <FormLabel>
            <Typography className={classes.label}>last name</Typography>
          </FormLabel>
          <OutlinedInput
            className={classes.input}
            id="lastName"
            placeholder="Doe"
            name="lastName"
            autoComplete="family-name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
          ></OutlinedInput>
        </Box>

        <Box className={classes.section}>
          <FormLabel>
            <Typography className={classes.label}>gender</Typography>
          </FormLabel>
          <Select
            className={classes.select}
            id="gender"
            name="gender"
            autoComplete="sex"
            value={formik.values.gender}
            onChange={formik.handleChange}
            variant="outlined"
            style={formik.values.gender !== 'gender' ? { color: 'black' } : { color: 'grey' }}
          >
            <MenuItem value="gender" disabled>
              gender
            </MenuItem>
            <MenuItem value="male">male</MenuItem>
            <MenuItem value="female">female</MenuItem>
            <MenuItem value="genderQueer">genderqueer/non-binary</MenuItem>
          </Select>
        </Box>

        <Box className={classes.section}>
          <FormLabel>
            <Typography className={classes.label}>birth date</Typography>
          </FormLabel>
          <Box className={classes.selectBirthdateContainer}>
            <Select
              className={classes.selectMonth}
              id="birthdateMonth"
              name="birthdateMonth"
              value={formik.values.birthdateMonth}
              onChange={formik.handleChange}
              variant="outlined"
              style={formik.values.birthdateMonth !== 'month' ? { color: 'black' } : { color: 'grey' }}
            >
              <MenuItem value="month" disabled>
                month
              </MenuItem>
              {months.map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
            <Select
              className={classes.selectDay}
              id="birthdateDay"
              name="birthdateDay"
              value={formik.values.birthdateDay}
              onChange={formik.handleChange}
              variant="outlined"
              style={formik.values.birthdateDay !== 'day' ? { color: 'black' } : { color: 'grey' }}
            >
              <MenuItem value="day" disabled>
                day
              </MenuItem>
              {days.map((day) => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
            </Select>
            <Select
              className={classes.selectYear}
              id="birthdateYear"
              name="birthdateYear"
              value={formik.values.birthdateYear}
              onChange={formik.handleChange}
              variant="outlined"
              style={formik.values.birthdateYear !== 'year' ? { color: 'black' } : { color: 'grey' }}
            >
              <MenuItem value="year" disabled>
                year
              </MenuItem>
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        <Box className={classes.section}>
          <FormLabel>
            <Typography className={classes.label}>email address</Typography>
          </FormLabel>
          <OutlinedInput
            className={classes.input}
            id="email"
            placeholder="john-doe@gmail.com"
            name="email"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          ></OutlinedInput>
        </Box>

        <Box className={classes.section}>
          <FormLabel>
            <Typography className={classes.label}>phone number</Typography>
          </FormLabel>
          <Box>
            {profile.phoneNumber ? (
              <OutlinedInput
                className={classes.phoneNumberInputComponentFull}
                id="phone"
                placeholder="(210) 556-0123"
                name="phoneNumber"
                autoComplete="tel"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
              ></OutlinedInput>
            ) : !showPhoneInput ? (
              <Box className={classes.phoneNumberInput}>
                {' '}
                <Typography className={classes.phoneMessage}>No Phone number entered</Typography>
                <Button
                  variant="contained"
                  className={classes.addPhone}
                  onClick={() => setShowPhoneInput(!showPhoneInput)}
                >
                  Add a phone number
                </Button>
              </Box>
            ) : (
              <Box className={classes.phoneNumberInput}>
                {' '}
                <OutlinedInput
                  className={classes.phoneNumberInputComponent}
                  id="phone"
                  placeholder="(210) 556-0123"
                  name="phoneNumber"
                  autoComplete="tel"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                ></OutlinedInput>
                <Button
                  variant="contained"
                  className={classes.addPhone}
                  onClick={() => setShowPhoneInput(!showPhoneInput)}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </Box>
        </Box>

        <Box className={classes.section}>
          <FormLabel>
            <Typography className={classes.label}>where you live</Typography>
          </FormLabel>
          <OutlinedInput
            className={classes.input}
            id="address"
            placeholder="Address"
            name="address"
            autoComplete="street-address"
            value={formik.values.address}
            onChange={formik.handleChange}
          ></OutlinedInput>
        </Box>

        <Box className={classes.section}>
          <FormLabel>
            <Typography className={classes.label}>describe yourself</Typography>
          </FormLabel>
          <TextField
            placeholder="About you"
            multiline
            rows={4}
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            variant="outlined"
          />
        </Box>

        <Button type="submit" size="large" variant="contained" className={classes.save}>
          save
        </Button>
      </form>
    </Box>
  );
}
