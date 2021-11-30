import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  bookingContainer: {
    minHeight: '75px',
    border: `1px solid ${theme.palette.grey[200]}`,
    padding: '10px',
    marginBottom: '5px',
  },
}));

export default useStyles;
