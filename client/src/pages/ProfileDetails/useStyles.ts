import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  profileCard: {
    width: '100%',
    minWidth: '600px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  topCardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
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
  userNameText: {
    marginTop: 20,
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },
  userTitleText: {
    color: 'darkGrey',
    fontSize: 16,
  },
  userLocationText: {
    color: 'darkGrey',
    fontSize: 14,
  },
  userLocationIcon: {
    height: 20,
    width: 'auto',
    marginRight: 5,
    color: theme.palette.primary.main,
  },
  bottomCardContent: {
    padding: 30,
    width: '100%',
  },
  userDescriptionHeaderText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  userDescriptionText: {
    marginTop: 10,
    color: 'black',
    fontSize: 16,
  },
  userAdditionalPhoto: {
    width: 150,
    height: 150,
    objectFit: 'cover',
    marginRight: 20,
    borderRadius: 5,
  },
  reviewsCardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    width: '100%',
    paddingLeft: 30,
  },
  reviewsHeader: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  review: {
    border: 'grey 1px solid',
    width: '50%',
    borderRadius: 5,
  },
  reviewerName: {
    color: 'black',
    fontSize: 14,
  },
}));

export default useStyles;
