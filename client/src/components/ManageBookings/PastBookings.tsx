import { FC } from 'react';
import formatBookingDate from '../../helpers/ManageBookings/formatBookingDate';
import sortBookingsByStartDate from '../../helpers/ManageBookings/sortBookingsByStartDate';
import { BookingRequests, BookingStatus } from '../../pages/ManageBookings/types';
import { Box, Typography } from '@material-ui/core';

type PastBookingsProps = {
  bookingRequests: BookingRequests;
};

const PastBookings: FC<PastBookingsProps> = ({ bookingRequests: bookingRequests }) => {
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
        <Box key={booking.requestId} border="1px solid #dfe2e475" m={1} p={1}>
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
