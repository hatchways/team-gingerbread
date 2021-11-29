/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, Key } from 'react';
import { Grid, CssBaseline, TextField, InputAdornment, Typography, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ProfilePreview from './ProfilePreview/ProfilePreview';
import generateMockData from './generateMockData';
import useStyles from './useStyles';

const ProfileListings = (): JSX.Element => {
  const classes = useStyles();
  const [currentUsers, setCurrentUsers] = useState<number>(6);
  const [mockData, setMockData] = useState<any>([]);

  const renderedPreviews = mockData.map((data: { name: any; picture: any }[], idx: Key | null | undefined) => {
    return (
      <Grid item key={idx}>
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
  });

  useEffect(() => {
    const data = generateMockData(currentUsers);
    data.then((res) => setMockData(res));
  }, [currentUsers]);

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
          {renderedPreviews}
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
