import { Card, CardContent, CardActions, CardActionArea, IconButton, Typography, Avatar } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Rating from '@material-ui/lab/Rating';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';

interface PreviewProps {
  img: string;
  name: string;
  subtitle: string;
  rating: number;
  description: string;
  location: string;
  payRate: number;
  id: string;
}

const ProfilePreview = ({
  img,
  name,
  subtitle,
  rating,
  description,
  location,
  payRate,
  id,
}: PreviewProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={`/profile-details/${id}`}>
        <CardContent className={classes.content}>
          {img ? (
            <Avatar src={img} className={classes.avatar} />
          ) : (
            <Avatar className={classes.avatar}>
              <AccountCircleIcon className={classes.icon} />
            </Avatar>
          )}
          <Typography color="textPrimary" variant="h5">
            {name}
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitleText}>
            {subtitle}
          </Typography>
          <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly className={classes.rating} />
          <Typography color="textPrimary" variant="h6">
            {description}
          </Typography>
        </CardContent>
        <CardActions className={classes.footer}>
          <IconButton aria-label="add to favorites">
            <LocationOnIcon color="primary" />
          </IconButton>
          <Typography className={classes.locationText}>{location}</Typography>
          <Typography color="textPrimary" variant="h6" className={classes.rateText}>
            {`$${payRate}/hr`}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default ProfilePreview;
