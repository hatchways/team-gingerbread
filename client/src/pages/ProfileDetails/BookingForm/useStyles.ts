import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  bookingFormCard: {
    width: '80%',
    minWidth: 400,
    height: '55%',
    minHeight: 550,
    justifySelf: 'flex-end',
  },
  bookingForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  userRateText: {
    marginTop: 40,
    marginBottom: 10,
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
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
    marginBottom: 35,
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    transition: '1s',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: '#30E664',
    },
  },
}));

export default useStyles;
