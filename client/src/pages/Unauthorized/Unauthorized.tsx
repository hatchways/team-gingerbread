import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';

const Unauthorized = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={8} md={7}>
        <Box className={classes.boxWrapper}>
          <Typography component="h1" variant="h5">
            Please <Link to="/login">Login</Link> or <Link to="/signup">Sign up</Link> to access that page.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Unauthorized;
