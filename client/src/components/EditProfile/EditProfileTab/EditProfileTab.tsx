import useStyles from './useStyles';
import Typography from '@material-ui/core/Typography';
import { FormLabel, OutlinedInput, Select, MenuItem, TextField, Button, Box, Menu, Switch } from '@material-ui/core';
import React, { useState } from 'react';

interface UserData {
  firstName: string;
  lastName: string;
  gender: any;
  birthdateMonth: any;
  birthdateDay: any;
  birthdateYear: any;
  email: string;
  phone: string;
  address: string;
  description: string;
  accountType: string;
  available: any;
  availability: any;
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

  const [firstName, setFirstName] = useState<UserData['firstName'] | null>();
  const [lastName, setLastName] = useState<UserData['lastName'] | null>();
  const [gender, setGender] = useState<UserData['gender'] | null>('gender');
  const [birthdateMonth, setBirthdateMonth] = useState<UserData['birthdateMonth'] | null>('month');
  const [birthdateDay, setBirthdateDay] = useState<UserData['birthdateDay'] | null>('day');
  const [birthdateYear, setBirthdateYear] = useState<UserData['birthdateYear'] | null>('year');
  const [email, setEmail] = useState<UserData['email'] | null>();
  const [phone, setPhone] = useState<UserData['phone'] | null>();
  const [address, setAddress] = useState<UserData['address'] | null>();
  const [description, setDescription] = useState<UserData['description'] | null>();
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  const [accountType, setAccountType] = useState<UserData['accountType'] | null>('partner');
  const [available, setAvailable] = useState<UserData['available'] | null>(false);
  const [availability, setAvailability] = useState<UserData['availability'] | null>('availability');

  const handleSubmit = () => {
    if (accountType === 'partner') {
      alert(`
        available: ${available}\n
        availability: ${availability}\n
        first name: ${firstName}\n
        last name: ${lastName}\n
        gender: ${gender}\n
        birthdate: ${birthdateMonth} ${birthdateDay}, ${birthdateYear}\n
        email: ${email}\n
        phone: ${phone}\n
        address: ${address}\n
        description: ${description}
      `);
    } else {
      alert(`
        first name: ${firstName}\n
        last name: ${lastName}\n
        gender: ${gender}\n
        birthdate: ${birthdateMonth} ${birthdateDay}, ${birthdateYear}\n
        email: ${email}\n
        phone: ${phone}\n
        address: ${address}\n
        description: ${description}
      `);
    }
  };

  return (
    <Box>
      <Typography className={classes.title}>Edit Profile</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        {accountType === 'partner' && (
          <Box className={classes.section}>
            <FormLabel>
              <Typography className={classes.label}>i&apos;m available</Typography>
            </FormLabel>
            <Switch
              checked={available}
              onChange={({ target: { value } }) => setAvailable(!available)}
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
              value={availability}
              onChange={({ target: { value } }) => setAvailability(value)}
              variant="outlined"
              style={availability !== 'availability' ? { color: 'black' } : { color: 'grey' }}
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
            value={firstName}
            onChange={({ target: { value } }) => setFirstName(value)}
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
            value={lastName}
            onChange={({ target: { value } }) => setLastName(value)}
          ></OutlinedInput>
        </Box>
        <Box className={classes.section}>
          <FormLabel>
            <Typography className={classes.label}>gender</Typography>
          </FormLabel>

          <Select
            className={classes.select}
            id="gender"
            autoComplete="sex"
            value={gender}
            onChange={({ target: { value } }) => setGender(value)}
            variant="outlined"
            style={gender !== 'gender' ? { color: 'black' } : { color: 'grey' }}
          >
            <MenuItem value="gender" disabled>
              gender
            </MenuItem>
            <MenuItem value="male">male</MenuItem>
            <MenuItem value="female">female</MenuItem>
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
              value={birthdateMonth}
              onChange={({ target: { value } }) => setBirthdateMonth(value)}
              variant="outlined"
              style={birthdateMonth !== 'month' ? { color: 'black' } : { color: 'grey' }}
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
              value={birthdateDay}
              onChange={({ target: { value } }) => setBirthdateDay(value)}
              variant="outlined"
              style={birthdateDay !== 'day' ? { color: 'black' } : { color: 'grey' }}
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
              value={birthdateYear}
              onChange={({ target: { value } }) => setBirthdateYear(value)}
              variant="outlined"
              style={birthdateYear !== 'year' ? { color: 'black' } : { color: 'grey' }}
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
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
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
                value={phone}
                onChange={({ target: { value } }) => setPhone(value)}
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
            value={address}
            onChange={({ target: { value } }) => setAddress(value)}
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
            value={description}
            onChange={({ target: { value } }) => setDescription(value)}
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
