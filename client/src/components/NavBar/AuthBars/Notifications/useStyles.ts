import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  notificationContainer: {
    display: 'absolute',
    position: 'fixed',
    top: '5.5vh',
    backgroundColor: 'white',
    color: 'black',
    borderTop: 'black 6px solid',
    minWidth: '20vw',
  },
  defaultMessage: {
    width: '20vw',
  },
  defaultMessageText: {
    color: 'black',
    marginTop: 30,
    marginBottom: 30,
  },
}));

export default useStyles;
