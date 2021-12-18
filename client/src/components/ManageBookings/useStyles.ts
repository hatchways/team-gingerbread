import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  bookingContainer: {
    border: `1px solid ${theme.palette.grey[200]}`,
  },
}));

export default useStyles;
