import useStyles from './useStyles';
import Typography from '@material-ui/core/Typography';
import { FormLabel, OutlinedInput, Select, MenuItem, TextField, Button, Box, Menu, Switch } from '@material-ui/core';
import React, { useState } from 'react';
import { useFormik } from 'formik';

interface UserProfile {
  firstName: string;
  lastName: string;
  gender: string;
  birthdateMonth: string;
  birthdateDay: string;
  birthdateYear: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  accountType: string;
  available: boolean;
  availability: string;
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
const days = [...Array(30).keys()].map((i) => i + 1);
const years = [...Array(119).keys()].map((i) => i + 1903).sort((a, b) => b - a);

export default function EditProfileTab(): JSX.Element {
  const classes = useStyles();
  const [accountType, setAccountType] = useState<UserProfile['accountType'] | null>('partner');
  const [available, setAvailable] = useState<UserProfile['available'] | null>(false);
  const [availability, setAvailability] = useState<UserProfile['availability'] | null>('availability');
  const [firstName, setFirstName] = useState<UserProfile['firstName'] | null>();
  const [lastName, setLastName] = useState<UserProfile['lastName'] | null>();
  const [gender, setGender] = useState<UserProfile['gender'] | null>('gender');
  const [birthdateMonth, setBirthdateMonth] = useState<UserProfile['birthdateMonth'] | null>('month');
  const [birthdateDay, setBirthdateDay] = useState<UserProfile['birthdateDay'] | null>('day');
  const [birthdateYear, setBirthdateYear] = useState<UserProfile['birthdateYear'] | null>('year');
  const [email, setEmail] = useState<UserProfile['email'] | null>();
  const [phone, setPhone] = useState<UserProfile['phone'] | null>();
  const [address, setAddress] = useState<UserProfile['address'] | null>();
  const [description, setDescription] = useState<UserProfile['description'] | null>();
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  const formik = useFormik({
    initialValues: {
      available: false,
      availability: 'availability',
      firstName: '',
      lastName: '',
      gender: 'gender',
      birthdateMonth: 'month',
      birthdateDay: 'day',
      birthdateYear: 'year',
      email: '',
      phone: '',
      address: '',
      description: '',
    },
    onSubmit: (values) => {
      if (accountType === 'partner') {
        setAvailable(values.available);
        setAvailability(values.availability);
      }
      setFirstName(values.firstName);
      setLastName(values.lastName);
      setGender(values.gender);
      setBirthdateMonth(values.birthdateMonth);
      setBirthdateDay(values.birthdateDay);
      setBirthdateYear(values.birthdateYear);
      setEmail(values.email);
      setPhone(values.phone);
      setAddress(values.address);
      setDescription(values.description);
    },
  });

  return (
    <Box>
      <Typography className={classes.title}>Edit Profile</Typography>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        {accountType === 'partner' && (
          <Box className={classes.section}>
            <FormLabel>
              <Typography className={classes.label}>i&apos;m available</Typography>
            </FormLabel>
            <Switch
              value={false}
              checked={formik.values.available === true}
              onChange={(event, checked) => {
                formik.setFieldValue('available', checked ? true : false);
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
          <Box className={classes.phoneNumberInput}>
            {!showPhoneInput ? (
              <Typography className={classes.phoneMessage}>No Phone number entered</Typography>
            ) : (
              <OutlinedInput
                className={classes.phoneNumberInputComponent}
                id="phone"
                placeholder="(210) 556-0123"
                name="phone"
                autoComplete="tel"
                value={formik.values.phone}
                onChange={formik.handleChange}
              ></OutlinedInput>
            )}
            {!showPhoneInput ? (
              <Button
                variant="contained"
                className={classes.addPhone}
                onClick={(e) => setShowPhoneInput(!showPhoneInput)}
              >
                Add a phone number
              </Button>
            ) : (
              <Button
                variant="contained"
                className={classes.addPhone}
                onClick={(e) => setShowPhoneInput(!showPhoneInput)}
              >
                Cancel
              </Button>
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
