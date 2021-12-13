import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
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
    margin: '0px 15px 0px 0px',
    height: 50,
    width: 50,
  },
  inboxPanelConversationIcon: {
    fontSize: 50,
  },
}));

export default useStyles;
