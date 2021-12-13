import { ChangeEvent, useState, useEffect } from 'react';
import { Grid, Paper, Typography, Avatar, Button } from '@material-ui/core';
import useStyles from './useStyles';
import SendIcon from '@material-ui/icons/Send';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ForumIcon from '@material-ui/icons/Forum';
import { User } from '../../interface/User';
import { Conversation } from '../../interface/Conversation';
import { MessageProfileData } from '../../interface/MessageProfileData';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import CustomTextField from '../../components/CustomTextField/CustomTextField';
import InboxPanelBody from '../../components/InboxPanelBody/InboxPanelBody';
import ChatPanelBody from '../../components/ChatPanelBody/ChatPanelBody';
import StartConversationModal from '../../components/StartConversationModal/StartConversationModal';
import startConversation from '../../helpers/APICalls/startConversation';
import loadConversation from '../../helpers/APICalls/loadConversations';

const Messages = (): JSX.Element => {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const [open, setOpen] = useState<boolean>(false);
  const [newChatUser, setNewChatUser] = useState<User | null>(null);
  const [search, setSearch] = useState<string>('');
  const [conversations, setConversations] = useState<Array<Conversation>>([]);
  const [profileData, setProfileData] = useState<Map<string, MessageProfileData>>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>, newInputValue: string) => {
    if (e) setSearch(newInputValue);
  };

  const getNewUser = (user: User) => {
    if (user) {
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
        if (data.error) updateSnackBarMessage('This conversation already exists.');
      });
    } else if (loggedInUser) {
      loadConversation(loggedInUser.id).then((data) => {
        if (data.error) {
          updateSnackBarMessage('Unable to load conversations.');
        } else if (data.success.conversations) {
          setConversations(data.success.conversations);
        }
      });
    }
  }, [loggedInUser, newChatUser, updateSnackBarMessage]);

  useEffect(() => {
    if (conversations.length > 0) {
    }
  }, [conversations]);

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
            handleChange={handleChange}
          />
          <Grid>
            <InboxPanelBody conversations={conversations} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item direction="column" className={classes.chatPanel}>
        <Grid container direction="row">
          <Grid container direction="row" component={Paper} elevation={0} className={classes.chatPanelHeader}>
            <Grid item>
              <Avatar className={classes.chatPanelHeaderAvatar}>
                <AccountCircleIcon className={classes.chatPanelHeaderIcon} />
              </Avatar>
            </Grid>
            <Grid item className={classes.chatPanelHeaderText}>
              <Typography variant="h5">Converser</Typography>
            </Grid>
          </Grid>
          <Grid container direction="column-reverse" className={classes.chatPanelBody}>
            <ChatPanelBody />
          </Grid>
          <Grid container direction="row" className={classes.chatPanelFooter}>
            <Grid item className={classes.chatPanelInput}>
              <CustomTextField variant="outlined" placeholder="Reply to Converser" fullWidth />
            </Grid>
            <Grid item className={classes.chatPanelButton}>
              <Button
                startIcon={<SendIcon />}
                variant="contained"
                color="primary"
                size="large"
                onClick={() => console.log('send clicked!')}
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
