import useStyles from './useStyles';
import Typography from '@material-ui/core/Typography';
import { Box, Button } from '@material-ui/core';
import { useState } from 'react';
import CreditCard from './CreditCard/CreditCard';
import { setUpFuturePayment } from '../../../helpers/APICalls/setUpFuturePayment';

interface card {
  name: string;
  cardNumber: string;
  cardExpDate: string;
  cardCVC: string;
  cardType: string;
}

export default function PaymentTab(): JSX.Element {
  const classes = useStyles();
  const [savedCards, setSavedCards] = useState<card[]>([]);
  const [showCardInput, setShowCardInput] = useState(false);

  const handlePayment = async () => {
    setUpFuturePayment().then((data) => window.location.replace(`https://checkout.stripe.com/pay/${data.success}`));
  };

  return (
    <Box minHeight="50vh" padding="45px 40px" display="flex" flexDirection="column" alignItems="center">
      <Typography className={classes.paymentHeader}>Payment Methods</Typography>

      {savedCards.length > 0 && !showCardInput && (
        <Box width="100%" marginBottom="30px">
          <Typography className={classes.savedText}>Saved Payment Profiles: </Typography>
          <Box display="flex" width="100%" height="300px" overflow="scroll">
            {savedCards.map((card) => {
              return <CreditCard card={card} key={card.cardNumber} />;
            })}
          </Box>
        </Box>
      )}

      {!showCardInput && (
        <Button onClick={() => handlePayment()} className={classes.showCardInputButton}>
          Add new payment profile
        </Button>
      )}
    </Box>
  );
}
