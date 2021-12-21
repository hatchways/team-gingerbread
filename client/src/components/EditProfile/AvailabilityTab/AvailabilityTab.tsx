import { useState, useEffect, useContext } from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import useStyles from './useStyles';
import AvailabilityRow from './AvailabilityRow/AvailabilityRow';
import editAvailability from '../../../helpers/APICalls/editAvailability';
import fetchProfile from '../../../helpers/APICalls/fetchProfile';
import { AuthContext } from '../../../context/useAuthContext';
import { SnackBarContext } from '../../../context/useSnackbarContext';
import { months } from './months';
import { days } from './days';

const AvailabilityTab = (): JSX.Element => {
  const { updateSnackBarMessage } = useContext(SnackBarContext);
  const { loggedInUser } = useContext(AuthContext);

  const classes = useStyles();

  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - ((new Date().getDay() + 6) % 7))),
  );
  const [updating, setUpdating] = useState(false);
  const [availability, setAvailability] = useState([
    //make a map function for 7 days?
    {
      day: 'Monday',
      startTime: 10,
      endTime: 22,
      date: new Date(),
    },
    {
      day: 'Tuesday',
      startTime: 10,
      endTime: 22,
      date: new Date('2019-6-18'),
    },
    {
      day: 'Wednesday',
      startTime: 10,
      endTime: 22,
      date: new Date('2019-6-19'),
    },
    {
      day: 'Thursday',
      startTime: 10,
      endTime: 22,
      date: new Date('2019-6-20'),
    },
    {
      day: 'Friday',
      startTime: 10,
      endTime: 22,
      date: new Date('2019-6-21'),
    },
    {
      day: 'Saturday',
      startTime: 10,
      endTime: 22,
      date: new Date('2019-6-22'),
    },
    {
      day: 'Sunday',
      startTime: 10,
      endTime: 22,
      date: new Date('2019-6-23'),
    },
  ]);

  useEffect(() => {
    if (updating && loggedInUser) {
      editAvailability(loggedInUser.id, availability);
      setUpdating(false);
      updateSnackBarMessage('Your availability has been updated');
    }
  }, [availability, updating, loggedInUser, updateSnackBarMessage]);

  // useEffect(() => {
  //   if (loggedInUser) {
  //     fetchProfile(loggedInUser.id).then((data) => setAvailability(data.success.profile.availableTime));
  //   }
  // }, [loggedInUser]);

  const changeStartDate = (direction: string) => {
    if (direction === 'prev') {
      startDate.setDate(startDate.getDate() - 7);
      setAvailability((availability) => {
        return availability.map((availableDay) => {
          return {
            day: availableDay.day,
            startTime: availableDay.startTime,
            endTime: availableDay.endTime,
            date: new Date(availableDay.date.setDate(availableDay.date.getDate() - 7)),
          };
        });
      });
    } else {
      startDate.setDate(startDate.getDate() + 7);
      setAvailability((availability) => {
        return availability.map((availableDay) => {
          return {
            day: availableDay.day,
            startTime: availableDay.startTime,
            endTime: availableDay.endTime,
            date: new Date(availableDay.date.setDate(availableDay.date.getDate() + 7)),
          };
        });
      });
    }
    console.log(availability);
  };

  const changeStartTime = (index: number, newTime: number, dayToUpdate: string) => {
    setAvailability(
      availability.map((day) => {
        if (day.day === dayToUpdate) {
          return {
            day: day.day,
            startTime: newTime,
            endTime: day.endTime,
            date: day.date,
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
            date: day.date,
          };
        } else {
          return day;
        }
      }),
    );
    setUpdating(true);
  };

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
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        paddingLeft="10%"
        paddingRight="10%"
        marginTop="35px"
        marginBottom="15px"
      >
        <Button onClick={() => changeStartDate('prev')} className={classes.weekButton}>
          Previous Week
        </Button>
        <Typography variant="h6">
          Week of {startDate.getDate()} {months[startDate.getMonth()]} {startDate.getFullYear()}
        </Typography>
        <Button onClick={() => changeStartDate('next')} className={classes.weekButton}>
          Next Week
        </Button>
      </Box>
      {days.map((day) => {
        return (
          <AvailabilityRow
            name={day.day} //monday
            day={day.day} //monday
            key={day.id} //1
            number={day.id - 1} //0
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
