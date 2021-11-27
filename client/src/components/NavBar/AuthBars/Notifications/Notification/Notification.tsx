import { Box, Typography } from '@material-ui/core';
import useStyles from './useStyles';

interface props {
  description: string;
  title: string;
  date: string;
  image: string;
}

const Notification = (props: props): JSX.Element => {
  const classes = useStyles();

  return (
    <Box className={classes.notification}>
      <Box className={classes.imageContainer}>
        <img src={props.image} className={classes.image} />
      </Box>
      <Box className={classes.dataContainer}>
        <Typography className={classes.description}>{props.description}</Typography>
        <Typography className={classes.title}>{props.title}</Typography>
        <Typography className={classes.date}>{props.date}</Typography>
      </Box>
    </Box>
  );
};

export default Notification;
