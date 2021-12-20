import { useState, useEffect } from 'react';
import { Grid, Typography, Button, CircularProgress } from '@material-ui/core';
import ProfilePreview from './ProfilePreview/ProfilePreview';
import { populateProfiles } from '../../helpers/APICalls/populateProfiles';
import { Profile } from '../../interface/Profile';
import useStyles from './useStyles';
import LocationSearchBar from '../../components/LocationSearchBar';
import AvailabilitySearchBar from '../../components/AvailabilitySearchBar';

const ProfileListings = (): JSX.Element => {
  const classes = useStyles();
  const [currentUsers, setCurrentUsers] = useState<number>(6);
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
          id={profile._id}
        />
      </Grid>
    );
  });

  useEffect(() => {
    populateProfiles(currentUsers).then((res) => {
      if (res && res.success) setProfileData(res.success.profiles);
    });
  }, [currentUsers]);

  return (
    <Grid container spacing={1} component="main" className={classes.root}>
      <Grid item spacing={1} className={classes.topRowWrapper}>
        <Typography color="textPrimary" variant="h5">
          Your search results
        </Typography>
        <Grid container spacing={1} className={classes.searchBarWrapper}>
          <Grid item spacing={1} className={classes.searchBar}>
            <LocationSearchBar searchTerm={'Ontario, Canada'} />
          </Grid>
          <Grid item spacing={1} className={classes.searchBarWrapper}>
            <Grid item spacing={1} className={classes.searchBar}>
              <AvailabilitySearchBar searchTerm={'date range'} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container spacing={6} className={classes.profilePreviewWrapper}>
          {!profileData ? <CircularProgress /> : renderedPreviews}
        </Grid>
      </Grid>
      <Grid item spacing={1}>
        <Button
          size="large"
          variant="outlined"
          onClick={() => setCurrentUsers(currentUsers * 2)}
          className={classes.showMoreButton}
        >
          Show more
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProfileListings;
