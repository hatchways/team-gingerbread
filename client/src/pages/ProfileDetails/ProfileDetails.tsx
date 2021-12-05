import useStyles from './useStyles';
import { Box, Typography, Card, CardMedia, CardContent } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import BookingForm from './BookingForm/BookingForm';

const ProfileDetails = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Box margin="0 auto" marginTop="11vh" width="65vw" minWidth="1000px" display="grid" gridTemplateColumns="60fr 40fr">
      <Card
        style={{
          width: '100%',
          minWidth: '600px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CardMedia
          className={classes.backgroundImg}
          image="https://assets-us-01.kc-usercontent.com/28e7bd12-5b30-009d-524e-785407f8bd6e/1105c802-3234-415b-a429-0a50c3259589/Stock%20WB%20Muirfield%20VIII.jpg?w=1600&h=900&fit=crop"
          title="user's background image"
        />
        <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CardMedia
            className={classes.userImg}
            image="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            title="user's profile image"
          />
          <Typography style={{ marginTop: 20, color: 'black', fontSize: 22, fontWeight: 'bold' }}>
            Norma Byers
          </Typography>
          <Typography style={{ color: 'darkGrey', fontSize: 16 }}>Loving pet sitter</Typography>
          <Box marginTop="20px" display="flex">
            <RoomIcon className={classes.userLocationIcon} />
            <Typography style={{ color: 'darkGrey', fontSize: 14 }}>Toronto, Ontario</Typography>
          </Box>
        </CardContent>
        <CardContent style={{ padding: 30 }}>
          <Box marginTop="10px" width="100%" textAlign="left" marginBottom="30px">
            <Typography style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>About me</Typography>
            <Typography style={{ marginTop: 10, color: 'black', fontSize: 16 }}>
              Animals are my passion! I will look after your pets with loving care. I have some availability for pet
              care in my home as well. I have 10 yrs experience at the Animal Hospital, and have owned multiple pets for
              many years, including numerous rescues. Kindly email, text or call me and I will respond promptly!
            </Typography>
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
      </Card>

      <BookingForm></BookingForm>
    </Box>
  );
};

export default ProfileDetails;
