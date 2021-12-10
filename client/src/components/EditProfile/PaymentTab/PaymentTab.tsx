import useStyles from './useStyles';
import Typography from '@material-ui/core/Typography';
import { Box, Button, OutlinedInput, Grid } from '@material-ui/core';
import { useState } from 'react';
import { useFormik } from 'formik';
import CreditCard from './CreditCard/CreditCard';

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

  const addCard = (newCard: card) => {
    setSavedCards([...savedCards, newCard]);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      cardNumber: '',
      cardExpDate: '',
      cardCVC: '',
    },
    onSubmit: (values) => {
      addCard({
        name: values.name,
        cardNumber: values.cardNumber,
        cardExpDate: values.cardExpDate,
        cardCVC: values.cardCVC,
        cardType: ['visa', 'mastercard'][Math.floor(Math.random() * 2)],
      });
      formik.resetForm();
      setShowCardInput(!showCardInput);
    },
  });

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
        <Button onClick={(e) => setShowCardInput(!showCardInput)} className={classes.showCardInputButton}>
          Add new payment profile
        </Button>
      )}
      {showCardInput && (
        <Box width="100%">
          <form className={classes.cardForm} onSubmit={formik.handleSubmit}>
            <Typography className={classes.cardFormLabel}>Name</Typography>
            <OutlinedInput
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              type="text"
              autoComplete="cc-name"
              placeholder="Name On Card"
              fullWidth
            />
            <Typography className={classes.cardFormLabel}>Credit Card Number</Typography>
            <OutlinedInput
              name="cardNumber"
              value={formik.values.cardNumber}
              onChange={formik.handleChange}
              type="text"
              autoComplete="cc-number"
              placeholder="9999 9999 9999 9999"
              fullWidth
            />
            <Grid className={classes.cardFormGrid}>
              <Box>
                <Typography className={classes.cardFormLabel}>Expiration Date</Typography>
                <OutlinedInput
                  name="cardExpDate"
                  value={formik.values.cardExpDate}
                  onChange={formik.handleChange}
                  type="text"
                  autoComplete="cc-exp"
                  placeholder="MM/YY"
                  fullWidth
                />
              </Box>
              <Box>
                <Typography className={classes.cardFormLabel}>Security Code</Typography>
                <OutlinedInput
                  name="cardCVC"
                  value={formik.values.cardCVC}
                  onChange={formik.handleChange}
                  type="password"
                  autoComplete="cc-csc"
                  placeholder="CVC"
                  fullWidth
                />
              </Box>
            </Grid>
            <Box display="flex" justifyContent="space-around" width="100%" marginTop="30px">
              <Button className={classes.cancelPaymentButton} onClick={(e) => setShowCardInput(!showCardInput)}>
                Cancel
              </Button>
              <Button type="submit" className={classes.savePaymentButton}>
                Save Payment
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </Box>
  );
}
