import { BookingRequests } from '../../pages/ManageBookings/types';

export default function isThereBookingOnThisDate(bookingRequests: BookingRequests, dateToCheck: Date | null): boolean {
  const check = bookingRequests.findIndex((booking) => {
    const startDay = booking.start.getTime();
    const checkDay = dateToCheck?.getTime();
    return startDay === checkDay;
  });
  return check > -1;
}
