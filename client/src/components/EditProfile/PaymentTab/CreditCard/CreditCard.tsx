import { Box, Typography, Checkbox } from '@material-ui/core';
import useStyles from './useStyles';
import MastercardLogo from './mastercard.png';
import VisaLogo from './visa.png';

interface props {
  card: {
    name: string;
    cardNumber: string;
    cardExpDate: string;
    cardCVC: string;
    cardType: string;
  };
}

export default function CreditCard(props: props): JSX.Element {
  const classes = useStyles();
  const card = props.card;

  return (
    <Box className={classes.creditCard}>
      <Box display="flex" justifyContent="space-between">
        {card.cardType === 'mastercard' && (
          <img className={classes.cardLogo} src={MastercardLogo} alt="mastercard logo" />
        )}
        {card.cardType === 'visa' && <img className={classes.cardLogo} src={VisaLogo} alt="visa logo" />}
        <Checkbox className={classes.cardCheckbox} />
      </Box>

      <Typography className={classes.cardNumberText}>**** **** **** {card.cardNumber.slice(-4)}</Typography>
      <Typography className={classes.cardExpDateText}>Exp. Date {card.cardExpDate}</Typography>
      <Typography className={classes.cardNameText}>{card.name}</Typography>
    </Box>
  );
}
