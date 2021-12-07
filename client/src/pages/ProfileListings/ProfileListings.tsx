/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import { Grid, Typography, Button, CircularProgress } from '@material-ui/core';
import ProfilePreview from './ProfilePreview/ProfilePreview';
import generateMockData from './generateMockData';
import useStyles from './useStyles';
import LocationSearchBar from '../../components/LocationSearchBar';
import AvailabilitySearchBar from '../../components/AvailabilitySearchBar';

const ProfileListings = (): JSX.Element => {
  const classes = useStyles();
  const [currentUsers, setCurrentUsers] = useState<number>(6);
  const [mockData, setMockData] = useState<any>([]);

  const renderedPreviews = mockData.map(
    (data: { name: Record<string, unknown>; picture: Record<string, any>; id: Record<string, any> }[]) => {
      return (
        <Grid item key={data[0].id.value}>
          <ProfilePreview
            img={data[0].picture.large}
            name={`${data[0].name.first} ${data[0].name.last}`}
            subtitle={'Puppy power'}
            rating={3}
            description={'I like to take long walks on the beach with your dog.'}
            location={'Ontario, Canada'}
            payRate={15}
          />
        </Grid>
      );
    },
  );

  useEffect(() => {
    generateMockData(currentUsers).then((res) => setMockData(res));
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
          {!mockData.length ? <CircularProgress /> : renderedPreviews}
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
