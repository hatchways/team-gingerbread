import { Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: '45px 0px 0px 0px',
    minWidth: '100%',
    maxHeight: '100%',
  },
  inboxPanel: {
    margin: '40px 0px 0px 0px',
    minWidth: '23vw',
    maxWidth: '23vw',
    minHeight: '91vh',
    maxHeight: '91vh',
    borderRadius: 0,
    overflow: 'hidden',
  },
  inboxPanelHeader: {
    margin: '15px 0px 5px 0px',
  },
  startConversationButton: {
    margin: '1px',
  },
  chatPanel: {
    margin: '45px 0px 0px 0px',
    minWidth: '77vw',
    maxWidth: '77vw',
    maxHeight: '92vh',
  },
  chatPanelBody: {
    minHeight: '70vh',
    maxHeight: '70vh',
    overflow: 'auto',
  },
  chatPanelHeader: {
    minHeight: '10vh',
    maxHeight: '10vh',
    borderBottom: '1px solid lightGrey',
    borderLeft: '1px solid lightGrey',
    borderRadius: 0,
  },
  chatPanelHeaderAvatar: {
    height: 50,
    width: 50,
  },
  chatPanelHeaderImage: {
    maxHeight: '110%',
    maxWidth: '110%',
  },
  chatPanelHeaderAvatarBadge: {
    margin: '20px 20px 20px 30px',
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  chatPanelHeaderIcon: {
    fontSize: 50,
  },
  chatPanelHeaderText: {
    margin: '25px 20px 20px 10px',
  },
  chatPanelFooter: {
    maxHeight: '10vh',
    borderTop: '1px solid lightGrey',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatPanelInput: {
    margin: '10px 0px 0px 15px',
    width: '40vw',
    alignItems: 'center',
  },
  chatPanelButton: {
    margin: '10px 20px 0px 0px',
    alignItems: 'center',
  },
  sendButton: {
    padding: '15px',
  },
}));

export default useStyles;
