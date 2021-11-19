import { Grid, makeStyles } from '@material-ui/core';
import homepage_image from '../../Images/homepage_image_v2.png';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
  wrapper: {
    minHeight: '100vh',
    minWidth: '100vw',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '50px',
    },
  },
  gridContainer: {
    height: '100vh',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',
    maxWidth: '500px',
    margin: 'auto',
    '& h1': {
      fontSize: '2.5rem',
    },
    '& label': {
      color: 'black',
      fontWeight: '900',
      textTransform: 'uppercase',
      marginTop: '20px',
      marginBottom: '5px',
    },
    '& button': {
      display: 'flex',
      color: 'white',
      fontWeight: 'normal',
      backgroundColor: '#F14140',
      boxShadow: 'none',
      padding: '10px 30px 10px 30px',
      margin: '20px auto 0px 0px',
      '&:hover': {
        backgroundColor: 'white',
        color: '#F14140',
        border: '1px solid #F14140',
        boxShadow: 'none',
      },
    },
  },
  imageWrapper: {
    overflow: 'hidden',
    width: '100%',
  },
  image: {
    objectFit: 'cover',
    height: '100%',
  },
}));

export default useStyles;
