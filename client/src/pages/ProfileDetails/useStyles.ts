import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  profileDetailsPage: {
    margin: '0 auto',
    marginTop: '11vh',
    width: '65vw',
    minWidth: 1000,
    display: 'grid',
    gridTemplateColumns: '60fr 40fr',
  },
  profileDetails: {
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    width: '100%',
    minWidth: 600,
    borderRadius: 5,
    overflow: 'hidden',
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
  userName: {
    marginTop: 20,
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },
  userTitle: {
    color: 'darkGrey',
    fontSize: 16,
  },
  userLocationContainer: {
    marginTop: 20,
    display: 'flex',
  },
  userLocationIcon: {
    height: 16,
    width: 'auto',
    marginTop: 1,
    marginRight: 5,
  },
  userLocation: {
    color: 'darkGrey',
    fontSize: 14,
  },
  userDescriptionContainer: {
    marginTop: 10,
    width: '100%',
    padding: 30,
    textAlign: 'left',
  },
  userDescriptionContainerHeader: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userDescription: {
    marginTop: 10,
    color: 'black',
    fontSize: 16,
  },
  userAdditionalPhotoContainer: {
    width: '100%',
    display: 'flex',
    padding: 30,
    alignItems: 'center',
    marginBottom: 15,
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
