import useStyles from './useStyles';
import { Box, Grid } from '@material-ui/core';
import homepage_image from '../../Images/homepage_image_v2.png';
export default function Homepage(): JSX.Element {
  const classes = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={6} className={classes.contentWrapper}></Grid>
        <Grid item xs={6} className={classes.imageWrapper}>
          <img className={classes.image} src={homepage_image} alt="" width="100%" />
        </Grid>
      </Grid>
    </Box>
  );
}
