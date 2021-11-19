import { Grid, makeStyles } from '@material-ui/core';
import homepage_image from '../../Images/homepage_image_v2.png';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
  },
  wrapper: {
    minHeight: '100vh',
    minWidth: '100vw',
  },
  gridContainer: {
    height: '100vh',
  },
  contentWrapper: {},
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
