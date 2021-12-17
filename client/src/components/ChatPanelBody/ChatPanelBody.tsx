import React from 'react';
import { Box, Typography, Container, Paper, Avatar } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import useStyles from './useStyles';
import { Message } from '../../interface/Message';
import { useAuth } from '../../context/useAuthContext';

interface Props {
  currentConversationMessages: Array<Message> | undefined;
  currentConverserImage: string | undefined;
}

const ChatPanelBody = ({ currentConversationMessages, currentConverserImage }: Props): JSX.Element => {
  const classes = useStyles();
  const { loggedInUser } = useAuth();

  const renderedMessages = currentConversationMessages
    ? currentConversationMessages.map((message) => {
        if (loggedInUser && message.author === loggedInUser.id) {
          return (
            <Box display="flex" justifyContent="flex-end" key={message._id}>
              <Paper elevation={2} className={classes.chatPanelBodyBubbleUser}>
                <Typography variant="body1" color="textPrimary" className={classes.chatPanelBodyBubbleUserText}>
                  {`${message.content}`}
                </Typography>
              </Paper>
            </Box>
          );
        } else {
          return (
            <Box display="flex" justifyContent="flex-start" key={message._id}>
              {currentConverserImage === undefined ? null : currentConverserImage === '' ? (
                <Avatar className={classes.chatPanelBodyAvatar}>
                  <AccountCircleIcon className={classes.chatPanelBodyIcon} />
                </Avatar>
              ) : (
                <Avatar className={classes.chatPanelBodyAvatar}>
                  <img src={currentConverserImage} alt="profile image" className={classes.chatPanelBodyImage} />
                </Avatar>
              )}
              <Box display="flex" justifyContent="center" alignItems="center">
                <Paper elevation={0} className={classes.chatPanelBodyBubbleConverser}>
                  <Typography variant="body1" color="textPrimary" className={classes.chatPanelBodyBubbleConverserText}>
                    {`${message.content}`}
                  </Typography>
                </Paper>
              </Box>
            </Box>
          );
        }
      })
    : null;

  return (
    <Container>
      <React.Fragment>{renderedMessages}</React.Fragment>
    </Container>
  );
};

export default ChatPanelBody;
