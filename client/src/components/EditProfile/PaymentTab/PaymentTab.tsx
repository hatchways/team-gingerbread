import useStyles from './useStyles';
import Typography from '@material-ui/core/Typography';
import { Box, Button } from '@material-ui/core';
import { useState } from 'react';
import CreditCard from './CreditCard/CreditCard';

import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

interface card {
  name: string;
  cardNumber: string;
  cardExpDate: string;
  cardCVC: string;
  cardType: string;
}

export default function PaymentTab(): JSX.Element {
  const classes = useStyles();
  // const [savedCards, setSavedCards] = useState<card[]>([]);
  // const [showCardInput, setShowCardInput] = useState(false);

  // const stripe = useStripe();
  // const elements = useElements();

  // const handleSubmit = async (event: any) => {
  //   event.preventDefault();
  //   if (!stripe || !elements) {
  //     return;
  //   }
  //   const result = await stripe.confirmPayment({
  //     elements,
  //     confirmParams: {
  //       return_url: 'https://google.com',
  //     },
  //   });
  //   if (result.error) {
  //     console.log(result.error.message);
  //   }
  // };

  return (
    <Box minHeight="50vh" padding="45px 40px" display="flex" flexDirection="column" alignItems="center">
      {/* <Typography className={classes.paymentHeader}>Payment Methods</Typography>
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
        <Button onClick={(e) => setShowCardInput(!showCardInput)} className={classes.showCardInputButton}>
          Add new payment profile
        </Button>
      )}
      {showCardInput && (
        <Box width="100%">
          <form className={classes.cardForm} onSubmit={handleSubmit}>
            <PaymentElement />
            <Button className={classes.cancelPaymentButton} onClick={(e) => setShowCardInput(!showCardInput)}>
              Cancel
            </Button>
            <Button type="submit" className={classes.savePaymentButton}>
              Save Payment
            </Button>
          </form>
        </Box>
      )} */}
      <form action="/stripe/session" method="POST">
        <button type="submit">Checkout</button>
      </form>
    </Box>
  );
}
