import { BookingRequests } from '../../pages/ManageBookings/types';
import { dateIsTodayOrAfter, sortBookingsByStartDate } from '../../helpers/ManageBookings';

export default function getCurrentBookings(bookingRequests: BookingRequests): BookingRequests {
  const filteredByStartDate = bookingRequests.filter((bookingRequest) => {
    return dateIsTodayOrAfter(bookingRequest.start);
  });

  const sortedByStartDate = sortBookingsByStartDate(filteredByStartDate);

  sortedByStartDate.pop();

  return sortedByStartDate;
}
