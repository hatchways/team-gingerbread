/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import { Grid, CssBaseline, TextField, InputAdornment, Typography, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ProfilePreview from './ProfilePreview/ProfilePreview';
import generateMockData from './generateMockData';
import { defaultUsers } from './mockData';
import useStyles from './useStyles';

const ProfileListings = (): JSX.Element => {
  const classes = useStyles();
  const [currentUsers, setCurrentUsers] = useState<number>(6);
  const [mockData, setMockData] = useState<any>([]);

  const defaultPreviews = defaultUsers.map((el, idx) => {
    return (
      <Grid item key={`default${idx}`}>
        <ProfilePreview
          img={el.img}
          name={el.name}
          subtitle={el.subtitle}
          rating={el.rating}
          description={el.description}
          location={el.location}
          payRate={el.payRate}
        />
      </Grid>
    );
  });

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
          {mockData.length === 0 ? defaultPreviews : renderedPreviews}
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
