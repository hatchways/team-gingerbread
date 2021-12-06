import useStyles from './useStyles';
import { Box, Typography } from '@material-ui/core';
import AvailabilityRow from './AvailabilityRow/AvailabilityRow';
import { useState, useEffect } from 'react';
import editAvailability from '../../../helpers/APICalls/editAvailability';
import fetchProfile from '../../../helpers/APICalls/fetchProfile';

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

const days = [
  {
    day: 'Monday',
    id: 1,
  },
  {
    day: 'Tuesday',
    id: 2,
  },
  {
    day: 'Wednesday',
    id: 3,
  },
  {
    day: 'Thursday',
    id: 4,
  },
  {
    day: 'Friday',
    id: 5,
  },
  {
    day: 'Saturday',
    id: 6,
  },
  {
    day: 'Sunday',
    id: 7,
  },
];

const AvailabilityTab = (): JSX.Element => {
  const classes = useStyles();
  const [startDate, setStartDate] = useState(new Date(2019, 5, 17));
  const [availability, setAvailability] = useState([
    {
      day: 'Monday',
      startTime: 10,
      endTime: 22,
    },
    {
      day: 'Tuesday',
      startTime: 10,
      endTime: 22,
    },
    {
      day: 'Wednesday',
      startTime: 10,
      endTime: 22,
    },
    {
      day: 'Thursday',
      startTime: 10,
      endTime: 22,
    },
    {
      day: 'Friday',
      startTime: 10,
      endTime: 22,
    },
    {
      day: 'Saturday',
      startTime: 10,
      endTime: 22,
    },
    {
      day: 'Sunday',
      startTime: 10,
      endTime: 22,
    },
  ]);
  const [updating, setUpdating] = useState(false);

  const changeStartTime = (index: number, newTime: number, dayToUpdate: string) => {
    setAvailability(
      availability.map((day) => {
        if (day.day === dayToUpdate) {
          return {
            day: day.day,
            startTime: newTime,
            endTime: day.endTime,
          };
        } else {
          return day;
        }
      }),
    );
    setUpdating(true);
  };

  const changeEndTime = (index: number, newTime: number, dayToUpdate: string) => {
    setAvailability(
      availability.map((day) => {
        if (day.day === dayToUpdate) {
          return {
            day: day.day,
            startTime: day.startTime,
            endTime: newTime,
          };
        } else {
          return day;
        }
      }),
    );
    setUpdating(true);
  };

  const userId = '619c1eb37a1e963a5b179c4b';

  useEffect(() => {
    if (updating) {
      editAvailability(userId, availability).then((data) => console.log(data));
      setUpdating(false);
    }
  }, [availability, updating]);

  useEffect(() => {
    fetchProfile(userId).then((data) => setAvailability(data.success.profile.availableTime));
  }, []);

  return (
    <Box
      minHeight="60vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      paddingTop="30px"
      paddingBottom="30px"
    >
      <Typography style={{ color: 'black', fontSize: 24, fontWeight: 'bold' }}>Your availability</Typography>
      <Box display="flex" width="100%" paddingLeft="75px" marginTop="35px" marginBottom="15px">
        <Typography variant="h6">
          {startDate.getDate()} - {startDate.getDate() + 6} {months[startDate.getMonth()]} {startDate.getFullYear()}
        </Typography>
      </Box>
      {days.map((day) => {
        return (
          <AvailabilityRow
            name={day.day}
            day={day.day}
            key={day.id}
            number={day.id - 1}
            startDate={startDate.getDate()}
            month={months[startDate.getMonth()]}
            startTime={availability[day.id - 1].startTime}
            endTime={availability[day.id - 1].endTime}
            changeStartTime={changeStartTime}
            changeEndTime={changeEndTime}
          />
        );
      })}
    </Box>
  );
};

export default AvailabilityTab;
