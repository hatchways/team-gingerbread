import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  appbar: {
    maxHeight: 100,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  link: { textDecoration: 'none' },
}));

export default useStyles;
