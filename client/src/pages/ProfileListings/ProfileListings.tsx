import { Grid, CssBaseline } from '@material-ui/core';
import useStyles from './useStyles';

const ProfileListings = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
    </Grid>
  );
};

export default ProfileListings;
