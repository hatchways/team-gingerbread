import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  requestForm: {
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    width: '80%',
    minWidth: 400,
    height: '55%',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifySelf: 'flex-end',
  },
  userRate: {
    marginTop: 40,
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },
  userRatingContainer: {
    marginTop: 10,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  userRateStar: {
    height: 18,
    width: 'auto',
  },
  profileDetailsForm: {
    width: '100%',
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileDetailsLabel: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  profileDetailsFormContainer: {
    width: '80%',
    display: 'grid',
    gridTemplateColumns: '50fr 50fr',
  },
  profileDetailsFormInput: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  profileDetailsFormSelect: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  requestFormButton: {
    marginTop: 70,
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    width: 160,
    height: 56,
    borderRadius: theme.shape.borderRadius,
    marginBottom: 35,
    fontSize: 14,
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    transition: '1s',
    '&:hover': {
      backgroundColor: '#30E664',
    },
  },
}));

export default useStyles;
