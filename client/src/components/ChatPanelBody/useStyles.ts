import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  chatPanelHeaderAvatar: {
    margin: '20px 20px 20px 30px',
    height: 50,
    width: 50,
  },
  chatPanelHeaderIcon: {
    fontSize: 50,
  },
  chatPanelBodyBubbleUser: {
    margin: '10px',
    padding: '10px',
    borderRadius: '15px',
    maxWidth: '15vw',
  },
  chatPanelBodyBubbleUserText: {
    overflowWrap: 'break-word',
    fontWeight: 450,
  },
  chatPanelBodyBubbleConverser: {
    margin: '10px',
    padding: '10px',
    borderRadius: '15px',
    maxWidth: '15vw',
    backgroundColor: 'lightGrey',
  },
  chatPanelBodyBubbleConverserText: {
    overflowWrap: 'break-word',
    fontWeight: 450,
  },
}));

export default useStyles;
