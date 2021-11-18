import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';

const HomePageBar = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container className={classes.navButtons}>
      <Grid item>
        <Button component={Link} to="/login" color="primary" size="large" variant="outlined">
          TEST
        </Button>
      </Grid>
      <Grid item>
        <Button component={Link} to="/signup" color="primary" size="large" variant="contained">
          Sign Up
        </Button>
      </Grid>
    </Grid>
  );
};

export default HomePageBar;
