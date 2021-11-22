import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
  loginButton: {
    borderColor: 'white',
    color: 'white',
    [theme.breakpoints.down('xs')]: {
      border: `1px solid ${theme.palette.primary.main}`,
      color: theme.palette.primary.main,
    },
  },
}));

export default useStyles;
