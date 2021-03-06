import useStyles from './useStyles';
import { Box, Grid, TextField, InputLabel, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import homepage_image from '../../Images/homepage_image_v2.png';
export default function Homepage(): JSX.Element {
  const classes = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={12} sm={6} className={classes.contentWrapper}>
          <form className={classes.form}>
            <Typography variant="h1">Find the care your dog deserves</Typography>
            <InputLabel shrink htmlFor="location">
              Where
            </InputLabel>
            <TextField id="location" placeholder="Anywhere" variant="outlined" />
            <InputLabel shrink htmlFor="dropin-date">
              Drop in / Drop off
            </InputLabel>
            <Box>
              <TextField
                id="dropin-date"
                type="date"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="dropofff-date"
                type="date"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Button
              component={Link}
              to="/profile-listings"
              color="primary"
              variant="contained"
              className={classes.findMyButton}
            >
              Find My Dog Sitter
            </Button>
          </form>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.imageWrapper}>
          <img className={classes.image} src={homepage_image} alt="Home page cover" width="100%" />
        </Grid>
      </Grid>
    </Box>
  );
}
