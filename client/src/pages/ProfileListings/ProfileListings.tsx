/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import { Grid, CssBaseline, TextField, InputAdornment, Typography, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ProfilePreview from './ProfilePreview/ProfilePreview';
import { populateProfiles } from '../../helpers/APICalls/populateProfiles';
import { Profile } from '../../interface/Profile';
import useStyles from './useStyles';

const ProfileListings = (): JSX.Element => {
  const classes = useStyles();
  const [profileData, setProfileData] = useState<Array<Profile>>([]);

  const renderedPreviews = profileData.map((profile) => {
    return (
      <Grid item key={profile._id}>
        <ProfilePreview
          img={profile.photo.url}
          name={`${profile.firstName} ${profile.lastName}`}
          subtitle={'Puppy power'}
          rating={3}
          description={profile.description}
          location={'Ontario, Canada'}
          payRate={15}
        />
      </Grid>
    );
  });

  useEffect(() => {
    populateProfiles().then((res) => {
      if (res && res.success) setProfileData(res.success.profiles);
    });
  }, []);

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
              value="Ontario, Canada"
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
          {!profileData ? null : renderedPreviews}
        </Grid>
      </Grid>
      <Grid item spacing={1}>
        <Button
          size="large"
          variant="outlined"
          onClick={() => console.log('load more users')}
          className={classes.showMoreButton}
        >
          Show more
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProfileListings;
