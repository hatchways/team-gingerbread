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
import { useAuth } from '../../context/useAuthContext';
import { ProfileData } from '../../interface/MessageProfileData';
import { Conversation } from '../../interface/Conversation';
import StyledBadge from '../StyledBadge';

interface Props {
  profileData?: Map<string, ProfileData>;
  conversations?: Array<Conversation>;
  currentLastMessage: string;
  onConversationClick: (
    firstName: string | null | undefined,
    lastName: string | null | undefined,
    photoUrl: string | null | undefined,
    conversationId: string,
    currentUserId: string,
  ) => void;
}

const InboxPanelBody = ({
  profileData,
  conversations,
  onConversationClick,
  currentLastMessage,
}: Props): JSX.Element => {
  const classes = useStyles();
  const { loggedInUser } = useAuth();

  const renderedConversations = conversations
    ? conversations.map((conversation) => {
        let converserId: string | null | undefined,
          photoUrl: string | null | undefined,
          firstName: string | null | undefined,
          lastName: string | null | undefined,
          lastMessage: string | undefined,
          date: Date | null | undefined,
          formattedDate: string | null | undefined,
          currentUserId: string;

        if (conversation.users.length === 2 && loggedInUser) {
          converserId = conversation.users[0] !== loggedInUser.id ? conversation.users[0] : conversation.users[1];
          lastMessage = conversation.lastMessage ? conversation.lastMessage.content : undefined;
          currentUserId = loggedInUser.id;
          date = conversation.lastMessage
            ? new Date(String(conversation.lastMessage.createdAt))
            : new Date(String(conversation.createdAt));

          const currentDate = new Date();
          if (currentDate.getMonth() === date.getMonth() && currentDate.getDate() === date.getDate()) {
            if (date.getHours() > 12) {
              if (date.getMinutes() < 10) {
                formattedDate = `${date.getHours() - 12}:0${date.getMinutes()} PM`;
              } else {
                formattedDate = `${date.getHours() - 12}:${date.getMinutes()} PM`;
              }
            } else {
              if (date.getMinutes() < 10) {
                formattedDate = `${date.getHours()}:0${date.getMinutes()} AM`;
              } else {
                formattedDate = `${date.getHours()}:${date.getMinutes()} AM`;
              }
            }
          } else if (currentDate.getMonth() === date.getMonth() && currentDate.getDate() - date.getDate() <= 6) {
            formattedDate = `${date.toLocaleDateString('en-us', { weekday: 'long' })}`;
          } else formattedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
        }

        if (converserId && profileData) {
          const profile = profileData.get(converserId);
          photoUrl = profile ? profile.photo.url : undefined;
          firstName = profile ? profile.firstName : undefined;
          lastName = profile ? profile.lastName : undefined;
        }
        return (
          <React.Fragment key={`${conversation._id}`}>
            <ListItem
              alignItems="flex-start"
              className={classes.inboxPanelConversationWrapper}
              onClick={() => onConversationClick(firstName, lastName, photoUrl, conversation._id, currentUserId)}
            >
              <ListItemAvatar>
                <div className={classes.inboxPanelConversationAvatarBadge}>
                  <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    variant="dot"
                  >
                    <Avatar className={classes.inboxPanelConversationAvatar}>
                      {photoUrl ? (
                        <img src={photoUrl} alt="profile image" className={classes.inboxPanelConversationImage} />
                      ) : (
                        <AccountCircleIcon className={classes.inboxPanelConversationIcon} />
                      )}
                    </Avatar>
                  </StyledBadge>
                </div>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography variant="h6" color="textPrimary">
                      {firstName && lastName ? `${firstName} ${lastName}` : 'Profile Incomplete'}
                    </Typography>
                  </React.Fragment>
                }
                secondary={currentLastMessage ? currentLastMessage : lastMessage ? lastMessage : ''}
              />
              <ListItemSecondaryAction>
                <Typography component="span" variant="body2" color="textPrimary">
                  {formattedDate}
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </React.Fragment>
        );
      })
    : null;

  return <List className={classes.root}>{renderedConversations}</List>;
};

export default InboxPanelBody;
