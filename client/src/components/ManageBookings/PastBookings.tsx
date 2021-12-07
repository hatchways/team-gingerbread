import { Box, Typography } from '@material-ui/core';
import { FC } from 'react';
import formatBookingDate from '../../helpers/ManageBookings/formatBookingDate';
import sortBookingsByStartDate from '../../helpers/ManageBookings/sortBookingsByStartDate';
import { BookingRequests, BookingStatus } from '../../pages/ManageBookings/types';
import useStyles from './useStyles';

type PastBookingsProps = {
  bookingRequests: BookingRequests;
};

const PastBookings: FC<PastBookingsProps> = ({ bookingRequests: bookingRequests }) => {
  const classes = useStyles();

  const pastBookings = bookingRequests.filter((bookingRequest) => {
    const startDayEpoch = bookingRequest.start.getTime();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayEpoch = today.getTime();
    return startDayEpoch < todayEpoch;
  });

  const sortedBookings = sortBookingsByStartDate(pastBookings);

  return (
    <>
      {sortedBookings.map((booking) => (
        <Box key={booking.requestId} className={classes.bookingContainer}>
          <Typography variant="body2">{formatBookingDate(booking.start)}</Typography>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography variant="body2">NAME OF DOG OWNER</Typography>
            </Box>
            <Box>{BookingStatus[booking.status]}</Box>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default PastBookings;