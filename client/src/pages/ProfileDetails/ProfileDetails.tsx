import useStyles from './useStyles';
import { Box, Typography, Card, CardMedia, CardContent } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import BookingForm from './BookingForm/BookingForm';
import fetchProfile from '../../helpers/APICalls/fetchProfile';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Profile } from '../../interface/Profile';
import { Review } from '../../interface/Review';
import { getReviews } from '../../helpers/APICalls/getReviews';
import Rating from '@material-ui/lab/Rating';
import ReviewForm from './ReviewForm/ReviewForm';

const ProfileDetails = (): JSX.Element => {
  const classes = useStyles();
  const [profile, setProfile] = useState<Profile>({
    isSitter: false,
    firstName: '',
    lastName: '',
    description: '',
    address: '',
    phoneNumber: '',
    dateOfBirth: new Date('December 17, 1995 03:24:00'),
    available: false,
    accountType: '',
    availability: '',
    gender: '',
    email: '',
    photo: {
      url: '',
      key: '',
    },
    _id: '',
  });
  const [reviews, setReviews] = useState<Review[]>([]);

  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    if (id) {
      fetchProfile(id).then((data) => {
        if (data.success) {
          setProfile(data.success.profile);
        } else {
          console.log(data.error);
        }
      });
      getReviews(id).then((data) => {
        if (data.success) {
          setReviews(data.success);
        } else {
          console.log(data.error);
        }
      });
    }
  }, [id]);

  const addNewReview = (newReview: Review) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  return (
    <Box
      margin="0 auto"
      marginTop="11vh"
      marginBottom="5vh"
      width="65vw"
      minWidth="1200px"
      display="grid"
      gridTemplateColumns="60fr 40fr"
    >
      <Card className={classes.profileCard}>
        <CardMedia
          className={classes.backgroundImg}
          image="https://assets-us-01.kc-usercontent.com/28e7bd12-5b30-009d-524e-785407f8bd6e/1105c802-3234-415b-a429-0a50c3259589/Stock%20WB%20Muirfield%20VIII.jpg?w=1600&h=900&fit=crop"
          title="user's background image"
        />
        <CardContent className={classes.topCardContent}>
          <CardMedia
            className={classes.userImg}
            image="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            title="user's profile image"
          />
          <Typography className={classes.userNameText}>
            {profile.firstName} {profile.lastName}
          </Typography>
          <Typography className={classes.userTitleText}>Loving pet sitter</Typography>
          <Box marginTop="20px" display="flex">
            <RoomIcon className={classes.userLocationIcon} />
            <Typography className={classes.userLocationText}>{profile.address}</Typography>
          </Box>
        </CardContent>
        <CardContent className={classes.bottomCardContent}>
          <Box marginTop="10px" width="100%" textAlign="left" marginBottom="30px">
            <Typography className={classes.userDescriptionHeaderText}>about me</Typography>
            <Typography className={classes.userDescriptionText}>{profile.description}</Typography>
          </Box>
          <Box width="100%" display="flex" alignItems="center" marginBottom="15px">
            <CardMedia
              className={classes.userAdditionalPhoto}
              image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*"
              title="user's additional photo"
            />
            <CardMedia
              className={classes.userAdditionalPhoto}
              image="https://media.nature.com/lw800/magazine-assets/d41586-020-01430-5/d41586-020-01430-5_17977552.jpg"
              title="user's additional photo"
            />
          </Box>
        </CardContent>
        <CardContent className={classes.reviewsCardContent}>
          <Typography className={classes.reviewsHeader}>reviews ({reviews.length})</Typography>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" paddingTop="10px">
            {reviews.map((review) => {
              return (
                <CardContent key={review._id} className={classes.review}>
                  <Rating className={classes.reviewRating} defaultValue={review.rating} precision={0.5} readOnly />
                  <Typography className={classes.reviewDescription}>&quot;{review.description}&quot;</Typography>
                </CardContent>
              );
            })}
          </Box>
        </CardContent>
      </Card>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between" height="85vh">
        <BookingForm />
        <ReviewForm addNewReview={addNewReview} />
      </Box>
    </Box>
  );
};
export default ProfileDetails;
