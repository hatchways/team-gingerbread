import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 200,
    maxWidth: 350,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px',
  },
  avatar: {
    margin: '10px',
    height: 100,
    width: 100,
  },
  icon: {
    fontSize: 100,
  },
  subtitleText: {
    color: 'grey',
  },
  rating: {
    margin: '10px',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '10px',
  },
  locationText: {
    color: 'grey',
    margin: '0 75px 0 0',
  },
  rateText: {
    margin: '0 25px 0 0',
  },
}));

export default useStyles;
