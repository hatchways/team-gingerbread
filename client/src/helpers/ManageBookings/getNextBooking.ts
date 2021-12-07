import { BookingRequests, BookingRequest } from '../../pages/ManageBookings/types';
import { dateIsTodayOrAfter, sortBookingsByStartDate } from '../../helpers/ManageBookings';

export default function getNextBooking(bookingRequests: BookingRequests): BookingRequest | null {
  const filteredByStartDate = bookingRequests.filter((bookingRequest) => {
    return dateIsTodayOrAfter(bookingRequest.start);
  });

  const sortedByStartDate = sortBookingsByStartDate(filteredByStartDate);

  return sortedByStartDate.pop() || null;
}
