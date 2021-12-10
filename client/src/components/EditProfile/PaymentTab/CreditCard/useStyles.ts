import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  creditCard: {
    marginTop: 30,
    marginRight: 40,
    border: 'grey 1px solid',
    borderRadius: 10,
    width: 375,
    height: 200,
    padding: '10px 20px',
  },
  cardLogo: {
    height: '48px',
    width: 'auto',
  },
  cardCheckbox: {
    color: 'black',
    borderRadius: '50%',
  },
  cardNumberText: {
    marginTop: 20,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardExpDateText: {
    color: 'grey',
    fontSize: 14,
  },
  cardNameText: {
    marginTop: 20,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
}));

export default useStyles;
