import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
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
}));

export default useStyles;
