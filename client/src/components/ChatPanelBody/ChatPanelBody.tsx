import { Box, Typography, Container, Paper, Avatar } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import useStyles from './useStyles';

const ChatPanel = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Container>
      <Box display="flex" justifyContent="flex-end">
        <Paper elevation={2} className={classes.chatPanelBodyBubbleUser}>
          <Typography variant="body1" color="textPrimary" className={classes.chatPanelBodyBubbleUserText}>
            {`Dog's are awesooooooooooooome!`}
          </Typography>
        </Paper>
      </Box>
      <Box display="flex" justifyContent="flex-start">
        <Avatar className={classes.chatPanelHeaderAvatar}>
          <AccountCircleIcon className={classes.chatPanelHeaderIcon} />
        </Avatar>
        <Paper elevation={0} className={classes.chatPanelBodyBubbleConverser}>
          <Typography variant="body1" color="textPrimary" className={classes.chatPanelBodyBubbleConverserText}>
            {`Don't you mean they're paw-some?`}
          </Typography>
        </Paper>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Paper elevation={2} className={classes.chatPanelBodyBubbleUser}>
          <Typography variant="body1" color="textPrimary" className={classes.chatPanelBodyBubbleUserText}>
            {`Loooooooooooooooooooooooooooooooooooooool`}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default ChatPanel;
