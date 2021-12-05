import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: '#30E664',
    },
  },
}));

export default useStyles;
