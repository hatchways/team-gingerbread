import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
    justifyContent: 'start',
    paddingLeft: '14vw',
    paddingTop: 125,
    alignItems: 'start',
  },
  tabContainer: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    minHeight: 224,
    marginRight: '1vw',
  },
  tabs: {
    borderRight: 1,
    borderColor: 'divider',
  },
  tabComponents: {
    flexGrow: 2,
    minWidth: 800,
  },
}));

export default useStyles;
