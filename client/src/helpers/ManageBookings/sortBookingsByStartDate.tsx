import { BookingRequests } from '../../pages/ManageBookings/types';

export default function sortBookingsByStartDate(bookingRequests: BookingRequests) {
  const sorted = [...bookingRequests].sort((bookingA, bookingB) => {
    return bookingB.start.getDate() - bookingA.start.getDate();
  });
  return sorted;
}
