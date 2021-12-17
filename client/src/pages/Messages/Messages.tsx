import { ChangeEvent, useState, useEffect } from 'react';
import { Grid, Paper, Typography, Avatar, Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import ForumIcon from '@material-ui/icons/Forum';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { User } from '../../interface/User';
import { Conversation } from '../../interface/Conversation';
import { ProfileData } from '../../interface/MessageProfileData';
import { Message } from '../../interface/Message';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import useStyles from './useStyles';
import CustomTextField from '../../components/CustomTextField/CustomTextField';
import InboxPanelBody from '../../components/InboxPanelBody/InboxPanelBody';
import ChatPanelBody from '../../components/ChatPanelBody/ChatPanelBody';
import StartConversationModal from '../../components/StartConversationModal/StartConversationModal';
import StyledBadge from '../../components/StyledBadge';
import startConversation from '../../helpers/APICalls/startConversation';
import loadConversations from '../../helpers/APICalls/loadConversations';
import loadUsersData from '../../helpers/APICalls/loadUsersData';
import loadMessages from '../../helpers/APICalls/loadMessages';
import sendNewMessage from '../../helpers/APICalls/sendNewMessage';

const Messages = (): JSX.Element => {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const [open, setOpen] = useState<boolean>(false);
  const [newChatUser, setNewChatUser] = useState<User | null>(null);
  const [search, setSearch] = useState<string>('');
  const [conversations, setConversations] = useState<Array<Conversation>>([]);
  const [profileData, setProfileData] = useState<Map<string, ProfileData>>();
  const [messages, setMessages] = useState<Map<string, Array<Message>>>();
  const [isConversationStarted, setIsconversationStarted] = useState<boolean>(false);
  const [currentConversationMessages, setCurrentConversationMessages] = useState<Array<Message> | undefined>([]);
  const [currentLastMessage, setCurrentLastMessage] = useState<string>('');
  const [currentConverserName, setCurrentConverserName] = useState<string>('');
  const [currentConverserImage, setCurrentConverserImage] = useState<string | undefined>(undefined);
  const [currentConversation, setCurrentConversation] = useState<string>('');
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [newMessage, setNewMessage] = useState<string>('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>, newInputValue: string) => {
    if (e) setSearch(newInputValue);
  };

  const onConversationClick = (
    firstName: string | null | undefined,
    lastName: string | null | undefined,
    photoUrl: string | null | undefined,
    conversationId: string,
    currentUserId: string,
  ): void => {
    setCurrentConverserName(firstName && lastName ? `${firstName} ${lastName}` : 'Profile Incomplete');
    setCurrentConverserImage(`${photoUrl}`);
    setCurrentConversation(conversationId);
    setCurrentUserId(currentUserId);
    if (messages) {
      const temp: Array<Message> | undefined = messages.get(conversationId);
      if (temp) temp.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
      setCurrentConversationMessages(temp);
    }
  };

  const handleNewMessageChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  const onSendNewMessageClick = () => {
    if (currentConversation && currentUserId && newMessage) {
      sendNewMessage(currentConversation, currentUserId, newMessage).then((data) => {
        if (data.error) {
          updateSnackBarMessage('Unable to send message. Please try again later.');
        } else {
          if (!currentConversationMessages) {
            setCurrentConversationMessages([data.success]);
            setCurrentLastMessage(data.success.content);
          } else {
            setCurrentConversationMessages([...currentConversationMessages, data.success]);
            setCurrentLastMessage(data.success.content);
          }
        }
      });
      setNewMessage('');
    } else updateSnackBarMessage('Please select someone to send a message to before sending a message.');
  };

  const getNewUser = (user: string | User | null) => {
    if (!user || typeof user === 'string') {
      updateSnackBarMessage('Unable to load that user. Something went wrong.');
    } else {
      setIsconversationStarted(true);
      setNewChatUser(user);
      setSearch('');
      setOpen(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (loggedInUser && newChatUser) {
      startConversation(loggedInUser.id, newChatUser._id).then((data) => {
        if (data.error) {
          updateSnackBarMessage('This conversation already exists.');
        } else {
          loadConversations(loggedInUser.id).then((data) => {
            if (data.error) {
              updateSnackBarMessage('Unable to load conversations. Please try again later.');
            } else if (data.success.conversations) {
              data.success.conversations.sort((a?, b?) => {
                if (a.lastMessage && b.lastMessage) {
                  return b.lastMessage.createdAt.localeCompare(a.lastMessage.createdAt);
                } else if (a.lastMessage && !b.lastMessage) {
                  return b.createdAt.localeCompare(a.lastMessage.createdAt);
                } else if (!a.lastMessage && b.lastMessage) {
                  return b.lastMessage.createdAt.localeCompare(a.createdAt);
                } else return b.createdAt.localeCompare(a.createdAt);
              });
              setConversations(data.success.conversations);
            }
          });
        }
      });
    }

    if (loggedInUser) {
      loadConversations(loggedInUser.id).then((data) => {
        if (data.error) {
          if (!isConversationStarted) {
            updateSnackBarMessage(`No conversations to load. Click 'Start a Conversation' to get begin one!`);
          }
        } else if (data.success.conversations) {
          data.success.conversations.sort((a?, b?) => {
            if (a.lastMessage && b.lastMessage) {
              return b.lastMessage.createdAt.localeCompare(a.lastMessage.createdAt);
            } else if (a.lastMessage && !b.lastMessage) {
              return b.createdAt.localeCompare(a.lastMessage.createdAt);
            } else if (!a.lastMessage && b.lastMessage) {
              return b.lastMessage.createdAt.localeCompare(a.createdAt);
            } else return b.createdAt.localeCompare(a.createdAt);
          });
          setConversations(data.success.conversations);
        }
      });
    }
  }, [loggedInUser, newChatUser, isConversationStarted, updateSnackBarMessage]);

  useEffect(() => {
    if (conversations.length > 0) {
      const users: Array<string> = conversations.map((conversation) => {
        let id;
        if (conversation.users && loggedInUser) {
          conversation.users[0] !== loggedInUser.id ? (id = conversation.users[0]) : (id = conversation.users[1]);
        }
        return String(id);
      });
      loadUsersData(users).then((data) => {
        if (data.error) {
          updateSnackBarMessage('Unable to load profile data. Please try again later.');
        } else if (data.success) {
          const profileDataMap = new Map<string, ProfileData>();
          data.success.forEach((userData) => {
            profileDataMap.set(userData._id, userData.profile);
          });
          setProfileData(profileDataMap);
        }
      });

      const conversationIds: Array<string> = conversations.map((conversation) => String(conversation._id));
      loadMessages(conversationIds).then((data) => {
        if (data.error) {
          updateSnackBarMessage('Unable to load messages. Please try again later.');
        } else if (data.success) {
          const messagesMap = new Map<string, Array<Message>>();
          data.success.forEach((message) => {
            if (messagesMap.has(message.conversationId)) {
              const temp: Array<Message> | undefined = messagesMap.get(message.conversationId);
              temp === undefined ? messagesMap.set(message.conversationId, [message]) : temp.push(message);
            } else {
              messagesMap.set(message.conversationId, [message]);
            }
          });
          setMessages(messagesMap);
        }
      });
    }
  }, [conversations, loggedInUser, updateSnackBarMessage]);

  return (
    <Grid container component="main" spacing={0} direction="row" className={classes.root}>
      <Grid item component={Paper} elevation={3} direction="column" className={classes.inboxPanel}>
        <Grid container direction="column">
          <Grid item direction="row" className={classes.inboxPanelHeader}>
            <Typography color="textPrimary" variant="h5">
              Inbox Messages
            </Typography>
          </Grid>
          <Button
            startIcon={<ForumIcon />}
            variant="contained"
            color="primary"
            size="large"
            component="span"
            onClick={handleOpen}
            className={classes.startConversationButton}
          >
            Start a Conversation
          </Button>
          <StartConversationModal
            open={open}
            search={search}
            handleClose={handleClose}
            getNewUser={getNewUser}
            handleSearchChange={handleSearchChange}
          />
          <Grid>
            <InboxPanelBody
              profileData={profileData}
              conversations={conversations}
              currentLastMessage={currentLastMessage}
              onConversationClick={onConversationClick}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item direction="column" className={classes.chatPanel}>
        <Grid container direction="row">
          <Grid container direction="row" component={Paper} elevation={0} className={classes.chatPanelHeader}>
            <Grid item>
              {currentConverserImage === undefined ? null : currentConverserImage === '' ? (
                <div className={classes.chatPanelHeaderAvatarBadge}>
                  <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    variant="dot"
                  >
                    <Avatar className={classes.chatPanelHeaderAvatar}>
                      <AccountCircleIcon className={classes.chatPanelHeaderIcon} />
                    </Avatar>
                  </StyledBadge>
                </div>
              ) : (
                <div className={classes.chatPanelHeaderAvatarBadge}>
                  <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    variant="dot"
                  >
                    <Avatar className={classes.chatPanelHeaderAvatar}>
                      <img src={currentConverserImage} alt="profile image" />
                    </Avatar>
                  </StyledBadge>
                </div>
              )}
            </Grid>
            <Grid item className={classes.chatPanelHeaderText}>
              <Typography variant="h5">{currentConverserName}</Typography>
            </Grid>
          </Grid>
          <Grid container direction="column-reverse" className={classes.chatPanelBody}>
            <ChatPanelBody
              currentConversationMessages={currentConversationMessages}
              currentConverserImage={currentConverserImage}
            />
          </Grid>
          <Grid container direction="row" className={classes.chatPanelFooter}>
            <Grid item className={classes.chatPanelInput}>
              <CustomTextField
                variant="outlined"
                placeholder={currentConverserName ? `Reply to ${currentConverserName}` : ''}
                onChange={(e) => handleNewMessageChange(e)}
                fullWidth
                value={newMessage}
              />
            </Grid>
            <Grid item className={classes.chatPanelButton}>
              <Button
                startIcon={<SendIcon />}
                variant="contained"
                color="primary"
                size="large"
                onClick={onSendNewMessageClick}
                className={classes.sendButton}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Messages;
