import { makeStyles } from '@material-ui/core/styles';

const useStyles = (valueTest: string) => {
  return makeStyles(() => ({
    '@global': {
      '.MuiPickersBasePicker-containerLandscape': {
        justifyContent: 'center',
      },
      '.MuiPickersBasePicker-pickerView': {
        width: '100%',
        maxWidth: 'none',
      },
      '.MuiPickersCalendar-week': {
        justifyContent: 'space-around',
      },
      '.MuiPickersCalendarHeader-daysHeader': {
        justifyContent: 'space-around',
      },
    },
    root: {
      minHeight: '100vh',
      '& .MuiPickersDay-daySelected': {
        backgroundColor: 'red',
      },
    },
    mySitters: {
      margin: 'auto',
      maxWidth: 900,
      padding: '100px 15px 0px 15px',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    bookingListingContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    dayTest: {
      backgroundColor: 'yellow',
    },
  }));
};

export default useStyles;
