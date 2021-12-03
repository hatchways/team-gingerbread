import useStyles from './useStyles';
import { Box, Button, Typography, Select, MenuItem, OutlinedInput, Grid } from '@material-ui/core';
import { useEffect } from 'react';
import PinIcon from './PinIcon.png';
import fetchProfile from '../../helpers/APICalls/fetchProfile';
import BookingForm from './BookingForm/BookingForm';

const ProfileDetails = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Box className={classes.profileDetailsPage}>
      <Box className={classes.profileDetails}>
        <img
          className={classes.backgroundImg}
          src="https://assets-us-01.kc-usercontent.com/28e7bd12-5b30-009d-524e-785407f8bd6e/1105c802-3234-415b-a429-0a50c3259589/Stock%20WB%20Muirfield%20VIII.jpg?w=1600&h=900&fit=crop"
          alt="user's background image"
        />
        <img
          className={classes.userImg}
          src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="user's profile image"
        />
        <Typography className={classes.userName}>Norma Byers</Typography>
        <Typography className={classes.userTitle}>Loving pet sitter</Typography>
        <Box className={classes.userLocationContainer}>
          <img src={PinIcon} className={classes.userLocationIcon} alt="location pin icon" />
          <Typography className={classes.userLocation}>Toronto, Ontario</Typography>
        </Box>
        <Box className={classes.userDescriptionContainer}>
          <Typography className={classes.userDescriptionContainerHeader}>About me</Typography>
          <Typography className={classes.userDescription}>
            Animals are my passion! I will look after your pets with loving care. I have some availability for pet care
            in my home as well. I have 10 yrs experience at the Animal Hospital, and have owned multiple pets for many
            years, including numerous rescues. Kindly email, text or call me and I will respond promptly!
          </Typography>
        </Box>
        <Box className={classes.userAdditionalPhotoContainer}>
          <img
            src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*"
            className={classes.userAdditionalPhoto}
            alt="user's additional photo"
          />
          <img
            src="https://media.nature.com/lw800/magazine-assets/d41586-020-01430-5/d41586-020-01430-5_17977552.jpg"
            className={classes.userAdditionalPhoto}
            alt="user's additional photo"
          />
        </Box>
      </Box>

      <BookingForm></BookingForm>
    </Box>
  );
};

export default ProfileDetails;
