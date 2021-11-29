import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'auto',
  },
  topRowWrapper: {
    margin: '100px 0 50px 0',
  },
  textFieldWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textField: {
    margin: '5px',
  },
  profilePreviewWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  showMoreButton: {
    margin: '50px 0 20px 0',
  },
}));

export default useStyles;
