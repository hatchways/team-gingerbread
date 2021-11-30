import { Box, Typography } from '@material-ui/core';
import { FC } from 'react';
import formatBookingDate from '../../helpers/ManageBookings/formatBookingDate';
import sortBookingsByStartDate from '../../helpers/ManageBookings/sortBookingsByStartDate';
import { BookingRequests, BookingStatus } from '../../pages/ManageBookings/types';
import useStyles from './useStyles';

type NextBookingProps = {
  bookingRequests: BookingRequests;
};

const CurrentBookings: FC<NextBookingProps> = ({ bookingRequests: bookingRequests }) => {
  const classes = useStyles();

  const currentBookings = bookingRequests.filter((bookingRequest) => {
    const startDayEpoch = bookingRequest.start.getTime();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayUTC = today.getTime();
    return startDayEpoch >= todayUTC;
  });

  const sortedBookings = sortBookingsByStartDate(currentBookings);
  const nextBooking = sortedBookings[sortedBookings.length - 1];

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
