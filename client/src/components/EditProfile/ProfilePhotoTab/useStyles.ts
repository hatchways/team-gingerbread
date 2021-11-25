import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    margin: '10px',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px',
    fontSize: 26,
    fontWeight: 950,
    fontFamily: "'Roboto'",
  },
  avatar: {
    margin: '40px 5px 25px 0',
    height: 150,
    width: 150,
  },
  photo: {
    maxHeight: '110%',
    maxWidth: '110%',
  },
  icon: {
    fontSize: 150,
  },
  reminderTxt: {
    margin: '10px',
    color: '#696969',
    textAlign: 'center',
    textJusify: 'center',
  },
  validationText: {
    margin: '10px',
    color: '#F14140',
    textAlign: 'center',
    textJusify: 'center',
  },
  input: {
    display: 'none',
  },
  button: {
    margin: '15px',
  },
  uploadBtnTxt: {
    padding: '10px',
    fontWeight: 500,
  },
  deleteBtnTxt: {
    padding: '10px',
    fontWeight: 500,
  },
}));

export default useStyles;
