import { Box, Typography } from '@material-ui/core';
import { FC } from 'react';
import formatBookingDate from '../../helpers/ManageBookings/formatBookingDate';
import { BookingRequest, BookingStatus } from '../../pages/ManageBookings/types';
import useStyles from './useStyles';

type NextBookingProps = {
  nextBooking: BookingRequest | null;
};

const CurrentBookings: FC<NextBookingProps> = ({ nextBooking }) => {
  const classes = useStyles();

  return (
    <>
      {nextBooking ? (
        <Box className={classes.bookingContainer}>
          <Typography variant="body2">{formatBookingDate(nextBooking.start)}</Typography>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography variant="body2">NAME OF DOG OWNER</Typography>
            </Box>
            <Box>{BookingStatus[nextBooking.status]}</Box>
          </Box>
        </Box>
      ) : (
        <Box>No Upcoming Bookings</Box>
      )}
    </>
  );
};

export default CurrentBookings;
