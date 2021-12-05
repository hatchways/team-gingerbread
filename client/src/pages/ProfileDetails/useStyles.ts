import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backgroundImg: {
    width: '100%',
    height: '25vh',
    objectFit: 'cover',
  },
  userImg: {
    width: '15vh',
    height: '15vh',
    objectFit: 'cover',
    borderRadius: '50%',
    border: 'white 7px solid',
    boxSizing: 'border-box',
    marginTop: '-6vh',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  },
  userLocationIcon: {
    height: 20,
    width: 'auto',
    marginRight: 5,
    color: theme.palette.primary.main,
  },
  userAdditionalPhoto: {
    width: 150,
    height: 150,
    objectFit: 'cover',
    marginRight: 20,
    borderRadius: 5,
  },
}));

export default useStyles;
