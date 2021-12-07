import { Box, Typography } from '@material-ui/core';
import { FC } from 'react';
import { formatBookingDate, sortBookingsByStartDate, dateIsTodayOrAfter } from '../../helpers/ManageBookings';
import { BookingRequests, BookingStatus } from '../../pages/ManageBookings/types';
import useStyles from './useStyles';

type CurrentBookingsProps = {
  bookingRequests: BookingRequests;
};

const CurrentBookings: FC<CurrentBookingsProps> = ({ bookingRequests: bookingRequests }) => {
  const currentBookings = bookingRequests.filter((bookingRequest) => {
    const startDate = bookingRequest.start;
    return dateIsTodayOrAfter(startDate);
  });

  const classes = useStyles();
  const sortedBookings = sortBookingsByStartDate(currentBookings);
  sortedBookings.pop();

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

export default CurrentBookings;
