import { Box, Typography } from '@material-ui/core';
import { FC } from 'react';
import { formatBookingDate } from '../../helpers/ManageBookings';
import { BookingRequests, BookingStatus } from '../../pages/ManageBookings/types';
import useStyles from './useStyles';

type CurrentBookingsProps = {
  currentBookings: BookingRequests;
};

const CurrentBookings: FC<CurrentBookingsProps> = ({ currentBookings }) => {
  const classes = useStyles();

  return (
    <>
      {currentBookings.map((booking) => (
        <Box
          key={booking.requestId}
          minHeight={'75px'}
          padding={'10px'}
          marginBottom={'5px'}
          className={classes.bookingContainer}
        >
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
