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
}));

export default useStyles;
