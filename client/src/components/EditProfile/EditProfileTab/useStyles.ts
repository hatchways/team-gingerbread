import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    marginTop: '4vh',
    marginBottom: '3vh',
    fontSize: 28,
    color: 'black',
  },
  form: {
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'start',
  },
  section: {
    display: 'grid',
    gridTemplateColumns: '30fr 70fr',
    width: '60%',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: '5vw',
    minHeight: '4.2vh',
  },
  label: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    justifySelf: 'end',
    textAlign: 'right',
    marginRight: 20,
  },
  input: {
    width: '100%',
  },
  select: {
    width: '35%',
  },
  selectAvailability: {
    width: '50%',
  },
  selectBirthdateContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  selectMonth: {
    width: '35%',
  },

  selectDay: {
    width: '20%',
  },
  selectYear: {
    width: '40%',
  },
  phoneNumberInput: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  phoneMessage: {
    fontStyle: 'italic',
    color: 'black',
  },
  phoneNumberInputComponent: {
    width: '80%',
  },
  addPhone: {
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    textTransform: 'none',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
  },
  save: {
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    width: 160,
    height: 56,
    borderRadius: theme.shape.borderRadius,
    marginTop: 20,
    marginBottom: 35,
    fontSize: 16,
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
