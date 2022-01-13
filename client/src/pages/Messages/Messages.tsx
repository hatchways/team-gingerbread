import { ChangeEvent, MouseEvent, useState, useEffect } from 'react';
import { Grid, Paper, Typography, Avatar, Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import ForumIcon from '@material-ui/icons/Forum';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
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
import deleteConversation from '../../helpers/APICalls/deleteConversation';
import loadUsersData from '../../helpers/APICalls/loadUsersData';
import loadMessages from '../../helpers/APICalls/loadMessages';
import sendNewMessage from '../../helpers/APICalls/sendNewMessage';
import updateReadStatus from '../../helpers/APICalls/updateReadStatus';

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
  const [currentConversationMessages, setCurrentConversationMessages] = useState<Array<Message> | undefined>([]);
  const [currentConverserName, setCurrentConverserName] = useState<string>('');
  const [currentConverserImage, setCurrentConverserImage] = useState<string | undefined>(undefined);
  const [currentConversation, setCurrentConversation] = useState<string>('');
  const [currentLastMessage, setCurrentLastMessage] = useState<string>('');
  const [currentIsRead, setCurrentIsRead] = useState<boolean>(true);
  const [isDeleteClicked, setIsDeleteClicked] = useState<boolean>(false);
  const [isNewMessageSent, setIsNewMessageSent] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const getNewUser = (user: string | User | null) => {
    if (!user || typeof user === 'string') {
      updateSnackBarMessage('Unable to load that user. Something went wrong.');
    } else {
      setNewChatUser(user);
      setSearch('');
      setOpen(false);
    }
  };

  const onConversationClick = (
    firstName: string | null | undefined,
    lastName: string | null | undefined,
    photoUrl: string | null | undefined,
    conversationId: string,
    lastMessageId: string,
  ): void => {
    setCurrentConverserName(firstName && lastName ? `${firstName} ${lastName}` : 'Profile Incomplete');
    setCurrentConverserImage(`${photoUrl}`);
    setCurrentConversation(conversationId);
    if (conversationId !== currentConversation) {
      if (lastMessageId) {
        updateReadStatus(lastMessageId);
        setCurrentLastMessage(lastMessageId);
        setCurrentIsRead(true);
      }
      loadMessages(conversationId).then((data) => {
        if (data.error || (data.success && data.success.length === 0)) {
          updateSnackBarMessage('No messages to load.');
          setCurrentConversationMessages([]);
        } else if (data.success) {
          const messagesUpdate = new Map<string, Array<Message>>();

          if (messages) {
            Array.from(messages.keys()).forEach((el) => {
              const currMessages = messages.get(el);
              if (currMessages) messagesUpdate.set(el, currMessages);
            });
          }
          messagesUpdate.set(conversationId, data.success);
          setCurrentConversationMessages(messagesUpdate.get(conversationId));
          setMessages(messagesUpdate);
        }
      });
    }
  };

  const onSendNewMessageClick = () => {
    if (currentConversation && newMessage) {
      sendNewMessage(currentConversation, newMessage).then((data) => {
        if (data.error) {
          updateSnackBarMessage('Unable to send message. Please try again later.');
        } else {
          if (!currentConversationMessages || currentConversationMessages.length === 0) {
            setCurrentConversationMessages([data.success]);
          } else {
            setCurrentConversationMessages([...currentConversationMessages, data.success]);
          }

          updateReadStatus(currentLastMessage);
          setCurrentLastMessage(data.success._id);
          setCurrentIsRead(true);
        }
      });
      setNewMessage('');
      setIsNewMessageSent(true);
    } else updateSnackBarMessage('Please select someone to send a message to before sending a message.');
  };

  const onOptionMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onDeleteMenuItemClick = () => {
    setIsDeleteClicked(true);
    setAnchorEl(null);
  };

  const handleNewMessageChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>, newInputValue: string) => {
    if (e) setSearch(newInputValue);
  };

  const handleOptionMenuClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    loadConversations().then((data) => {
      if (data.error || (data.success.conversations && data.success.conversations.length === 0)) {
        updateSnackBarMessage(`No conversations to load. Click 'Start a Conversation' to begin one!`);
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
        const latestConversation = data.success.conversations[0];

        if (latestConversation.lastMessage) {
          setCurrentLastMessage(latestConversation.lastMessage._id);
          if (loggedInUser && latestConversation.lastMessage.author !== loggedInUser.id) {
            setCurrentIsRead(latestConversation.lastMessage.isRead);
          } else setCurrentIsRead(true);
        }

        if (latestConversation) {
          setCurrentConversation(latestConversation._id);
          loadMessages(latestConversation._id).then((data) => {
            if (data.error || (data.success && !data.success.length)) {
              updateSnackBarMessage('No messages to load.');
            } else if (data.success) {
              const messagesUpdate = new Map<string, Array<Message>>();
              messagesUpdate.set(data.success[0].conversationId, data.success);
              setMessages(messagesUpdate);
              setCurrentConversationMessages(data.success);
            }
          });

          if (data.success.conversations.length > 0) {
            const users: Array<string> = data.success.conversations.map((conversation) => {
              let id;
              if (conversation.users.length > 0 && loggedInUser) {
                conversation.users[0] !== loggedInUser.id ? (id = conversation.users[0]) : (id = conversation.users[1]);
              }
              return String(id);
            });

            const filteredUsers = users.filter((user) => user !== 'undefined');

            if (filteredUsers && filteredUsers.length > 0) {
              loadUsersData(filteredUsers).then((data) => {
                if (data.error || data.success.length === 0) {
                  updateSnackBarMessage('Unable to load profile data. Please try again later.');
                } else if (data.success) {
                  const profileDataMap = new Map<string, ProfileData>();
                  data.success.forEach((userData) => {
                    profileDataMap.set(userData._id, userData.profile);
                  });
                  if (loggedInUser) {
                    const latestUsers = latestConversation.users;
                    const converserId = latestUsers[0] !== loggedInUser.id ? latestUsers[0] : latestUsers[1];
                    const latestProfileData = profileDataMap.get(converserId);

                    if (latestProfileData) {
                      setCurrentConverserName(
                        latestProfileData.firstName && latestProfileData.lastName
                          ? `${latestProfileData.firstName} ${latestProfileData.lastName}`
                          : 'Profile Incomplete',
                      );
                      setCurrentConverserImage(latestProfileData.photo.url ? latestProfileData.photo.url : '');
                    }
                  }
                  setProfileData(profileDataMap);
                }
              });
            }
          }
        }
      }
    });
  }, [loggedInUser, updateSnackBarMessage]);

  useEffect(() => {
    if (isNewMessageSent) {
      loadConversations().then((data) => {
        if (data.error || (data.success.conversations && data.success.conversations.length === 0)) {
          updateSnackBarMessage(`No conversations to load. Click 'Start a Conversation' to begin one!`);
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
          const latestConversation = data.success.conversations[0];

          if (latestConversation) {
            setCurrentConversation(latestConversation._id);
            loadMessages(latestConversation._id).then((data) => {
              if (data.error || (data.success && !data.success.length)) {
                updateSnackBarMessage('No messages to load.');
              } else if (data.success) {
                const messagesUpdate = new Map<string, Array<Message>>();
                messagesUpdate.set(data.success[0].conversationId, data.success);
                setMessages(messagesUpdate);
                setCurrentConversationMessages(data.success);
              }
            });
          }
        }
      });
    }
    setIsNewMessageSent(false);
  }, [isNewMessageSent, updateSnackBarMessage]);

  useEffect(() => {
    if (newChatUser) {
      startConversation(newChatUser._id).then((data) => {
        if (data.error) {
          updateSnackBarMessage('Unable to start conversation. Conversation already exists.');
        } else {
          loadConversations().then((data) => {
            if (data.error || (data.success.conversations && data.success.conversations.length === 0)) {
              updateSnackBarMessage(`No conversations to load. Click 'Start a Conversation' to begin one!`);
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
              setCurrentConversation(data.success.conversations[0]._id);
              setCurrentConversationMessages([]);

              const latestConversation = data.success.conversations[0];
              if (newChatUser._id) {
                loadUsersData([newChatUser._id]).then((data) => {
                  if (data.error || data.success.length === 0) {
                    updateSnackBarMessage('Unable to load profile data. Please try again later.');
                  } else if (data.success) {
                    const profileDataUpdate = new Map<string, ProfileData>();
                    data.success.forEach((userData) => {
                      profileDataUpdate.set(userData._id, userData.profile);
                    });

                    if (loggedInUser) {
                      const latestUsers = latestConversation.users;
                      const converserId = latestUsers[0] !== loggedInUser.id ? latestUsers[0] : latestUsers[1];
                      const latestProfileData = profileDataUpdate.get(converserId);

                      if (latestProfileData) {
                        setCurrentConverserName(
                          latestProfileData.firstName && latestProfileData.lastName
                            ? `${latestProfileData.firstName} ${latestProfileData.lastName}`
                            : 'Profile Incomplete',
                        );
                        setCurrentConverserImage(latestProfileData.photo.url ? latestProfileData.photo.url : '');
                      }
                    }

                    if (profileData) {
                      Array.from(profileData.keys()).forEach((el) => {
                        const currProfileData = profileData.get(el);
                        if (currProfileData) profileDataUpdate.set(el, currProfileData);
                      });
                    }
                    setProfileData(profileDataUpdate);
                  }
                });
              }
            }
          });
        }
      });
    }
    setNewChatUser(null);
  }, [newChatUser, loggedInUser, profileData, updateSnackBarMessage]);

  useEffect(() => {
    if (isDeleteClicked) {
      deleteConversation(currentConversation).then((data) => {
        if (data.error) {
          updateSnackBarMessage('An error occurred. Please refresh the page.');
        } else {
          setCurrentConversationMessages([]);
          setCurrentConverserName('');
          setCurrentConverserImage(undefined);
          setCurrentConversation('');
          loadConversations().then((data) => {
            if (data.error || (data.success.conversations && data.success.conversations.length === 0)) {
              updateSnackBarMessage(`No conversations to load. Click 'Start a Conversation' to begin one!`);
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
    setIsDeleteClicked(false);
  }, [isDeleteClicked, currentConversation, updateSnackBarMessage]);

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
            onClick={handleModalOpen}
            className={classes.startConversationButton}
          >
            Start a Conversation
          </Button>
          <StartConversationModal
            open={open}
            search={search}
            handleClose={handleModalClose}
            getNewUser={getNewUser}
            handleSearchChange={handleSearchChange}
          />
          <Grid>
            <InboxPanelBody
              profileData={profileData}
              conversations={conversations}
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
                currentIsRead ? (
                  <div className={classes.chatPanelHeaderAvatarBadge}>
                    <Avatar className={classes.chatPanelHeaderAvatar}>
                      <AccountCircleIcon className={classes.chatPanelHeaderIcon} />
                    </Avatar>
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
                        <AccountCircleIcon className={classes.chatPanelHeaderIcon} />
                      </Avatar>
                    </StyledBadge>
                  </div>
                )
              ) : currentIsRead ? (
                <div className={classes.chatPanelHeaderAvatarBadge}>
                  <Avatar className={classes.chatPanelHeaderAvatar}>
                    <img src={currentConverserImage} alt="profile image" className={classes.chatPanelHeaderImage} />
                  </Avatar>
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
                      <img src={currentConverserImage} alt="profile image" className={classes.chatPanelHeaderImage} />
                    </Avatar>
                  </StyledBadge>
                </div>
              )}
            </Grid>
            <Grid item className={classes.chatPanelHeaderText}>
              <Typography variant="h5">{currentConverserName}</Typography>
            </Grid>
            <Grid item className={classes.chatPanelHeaderOptionButton}>
              <div>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={onOptionMenuClick}
                >
                  <MoreHorizIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleOptionMenuClose}
                >
                  <MenuItem onClick={onDeleteMenuItemClick}>Delete</MenuItem>
                </Menu>
              </div>
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
