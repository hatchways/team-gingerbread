import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  notification: {
    display: 'grid',
    gridTemplateColumns: '25fr 75fr',
    height: '10vh',
    minHeight: 100,
    width: '20vw',
    minWidth: 500,
    margin: '15 auto',
    backgroundColor: 'white',
    transitionDuration: '1s',
    '&:hover': {
      backgroundColor: '#9ce8cd',
    },
  },
  image: {
    height: '80%',
    width: '70%',
    objectFit: 'cover',
    objectPosition: 'top',
  },
  dataContainer: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'left',
    height: '100%',
  },
  description: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'none',
  },
  title: {
    color: 'grey',
    fontSize: 14,
    textTransform: 'none',
  },
  date: {
    marginTop: 15,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
}));

export default useStyles;
