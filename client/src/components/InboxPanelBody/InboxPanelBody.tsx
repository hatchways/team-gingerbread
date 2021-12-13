import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  Typography,
  Divider,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import useStyles from './useStyles';
import { Conversation } from '../../interface/Conversation';
import { useAuth } from '../../context/useAuthContext';

interface Props {
  conversations: Array<Conversation>;
}

const InboxPanelBody = ({ conversations }: Props): JSX.Element => {
  const classes = useStyles();
  const { loggedInUser } = useAuth();

  console.log(conversations);
  console.log(loggedInUser);

  const renderedConversations = conversations.map((conversation) => {
    return (
      <ListItem key={`${conversation._id}`} alignItems="flex-start" className={classes.inboxPanelConversationWrapper}>
        <ListItemAvatar>
          <Avatar className={classes.inboxPanelConversationAvatar}>
            <AccountCircleIcon className={classes.inboxPanelConversationIcon} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant="h6" color="textPrimary">
                Converser
              </Typography>
            </React.Fragment>
          }
          secondary="Last message..."
        />
        <ListItemSecondaryAction>
          <Typography component="span" variant="body1" color="textPrimary">
            Date
          </Typography>
        </ListItemSecondaryAction>
      </ListItem>
    );
  });

  return (
    <List className={classes.root}>
      {renderedConversations}
      <Divider />
    </List>
  );
};

export default InboxPanelBody;
