import { useState, useEffect, useContext } from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import useStyles from './useStyles';
import AvailabilityRow from './AvailabilityRow/AvailabilityRow';
import { months } from './months';
import { days } from './days';

const getDateArray = (startDate: Date) => {
  const start = new Date(startDate);
  const dateArray = [new Date(start.setDate(start.getDate()))];
  for (let i = 0; i < 6; i++) {
    dateArray.push(new Date(start.setDate(start.getDate() + 1)));
  }
  return dateArray;
};

const AvailabilityTab = (): JSX.Element => {
  const classes = useStyles();
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    const today = new Date();
    const day = today.getDay();
    today.setDate(today.getDate() - day + 1);
    setStartDate(today); //sets startDate to Monday of this current week
  }, []);

  const changeStartDate = (direction: string) => {
    if (direction === 'prev') {
      setStartDate(new Date(startDate.setDate(startDate.getDate() - 7)));
    } else {
      setStartDate(new Date(startDate.setDate(startDate.getDate() + 7)));
    }
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
      {getDateArray(startDate).map((date) => {
        return (
          <AvailabilityRow
            date={date}
            key={date.toUTCString()}
            dayOfWeek={days[date.getDay()]}
            dayOfMonth={date.getDate()}
            month={months[date.getMonth()]}
          />
        );
      })}
    </Box>
  );
};

export default AvailabilityTab;
