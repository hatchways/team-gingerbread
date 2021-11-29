import { Grid, CssBaseline, TextField, InputAdornment, Typography, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import DateRangeIcon from '@material-ui/icons/DateRange';
import useStyles from './useStyles';
import ProfilePreview from './ProfilePreview/ProfilePreview';

const ProfileListings = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container spacing={1} component="main" className={classes.root}>
      <CssBaseline />
      <Grid item spacing={1} className={classes.topRowWrapper}>
        <Typography color="textPrimary" variant="h5">
          Your search results
        </Typography>
        <Grid container spacing={1} className={classes.textFieldWrapper}>
          <Grid item spacing={1} className={classes.textField}>
            <TextField
              color="primary"
              variant="outlined"
              value="place from homepage"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item spacing={1} className={classes.textFieldWrapper}>
            <TextField
              color="primary"
              variant="outlined"
              value="date from homepage"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DateRangeIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container spacing={6} className={classes.profilePreviewWrapper}>
          <Grid item>
            <ProfilePreview />
          </Grid>
          <Grid item>
            <ProfilePreview />
          </Grid>
          <Grid item>
            <ProfilePreview />
          </Grid>
          <Grid item>
            <ProfilePreview />
          </Grid>
          <Grid item>
            <ProfilePreview />
          </Grid>
          <Grid item>
            <ProfilePreview />
          </Grid>
        </Grid>
      </Grid>
      <Grid item spacing={1}>
        <Button size="large" variant="outlined" className={classes.showMoreButton}>
          Show more
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProfileListings;
