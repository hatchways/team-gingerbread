import { Box, Typography, Grid } from '@material-ui/core';
import useStyles from './useStyles';

interface props {
  description: string;
  title: string;
  createdAt: string;
  image: string;
}

const Notification = (props: props): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid className={classes.notification}>
      <Box width="100%" display="flex" justifyContent="center" alignItems="center" height="100%">
        <img src={props.image} className={classes.image} alt="user profile picture" />
      </Box>
      <Box className={classes.dataContainer}>
        <Typography className={classes.description}>{props.description}</Typography>
        <Typography className={classes.title}>{props.title}</Typography>
        <Typography className={classes.date}>{props.createdAt}</Typography>
      </Box>
    </Grid>
  );
};

export default Notification;
