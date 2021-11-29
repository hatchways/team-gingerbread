import { Card, CardContent, CardActions, IconButton, Typography, Avatar } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Rating from '@material-ui/lab/Rating';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import useStyles from './useStyles';

const ProfilePreview = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon className={classes.icon} />
        </Avatar>
        <Typography color="textPrimary" variant="h5">
          Name
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitleText}>
          Subtitle
        </Typography>
        <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly className={classes.rating} />
        <Typography color="textPrimary" variant="h6">
          Description
        </Typography>
      </CardContent>
      <CardActions className={classes.footer}>
        <IconButton aria-label="add to favorites">
          <LocationOnIcon color="primary" />
        </IconButton>
        <Typography className={classes.locationText}>Ontario, Canada</Typography>
        <Typography color="textPrimary" variant="h6" className={classes.rateText}>
          Rate
        </Typography>
      </CardActions>
    </Card>
  );
};

export default ProfilePreview;
