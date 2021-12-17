import { Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: '23vw',
    maxHeight: '91vh',
    overflow: 'auto',
  },
  inboxPanelConversationWrapper: {
    margin: '10px',
  },
  inboxPanelConversationAvatar: {
    height: 50,
    width: 50,
  },
  inboxPanelConversationAvatarBadge: {
    margin: '0px 15px 0px 0px',
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  inboxPanelConversationIcon: {
    fontSize: 50,
  },
}));

export default useStyles;
