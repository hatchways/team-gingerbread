import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  navButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 40,
    '& > *': {
      margin: 10,
    },
  },
  link: { textDecoration: 'none' },
}));

export default useStyles;
