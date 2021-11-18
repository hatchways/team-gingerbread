import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  appbar: {
    maxHeight: 100,
    backgroundColor: 'transparent',
  },
  appbarHomePage: {
    maxHeight: 100,
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  homePageBar: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: 'transparent',
  },
  link: { textDecoration: 'none' },
}));

export default useStyles;
