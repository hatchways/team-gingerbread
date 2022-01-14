import { BookingRequests, BookingRequest } from '../pages/ManageBookings/types';

export const isThereBookingOnThisDate = (bookingRequests: BookingRequests, dateToCheck: Date | null): boolean => {
  const check = bookingRequests.findIndex((booking) => {
    const startDay = booking.start.getTime();
    const checkDay = dateToCheck?.getTime();
    return startDay === checkDay;
  });
  return check > -1;
};

export const formatBookingDate = (date: Date): string => {
  const day = date.getDate();
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
  const year = date.getFullYear();
  return `${day} ${month} ${year}, 8-9`;
};

export const sortBookingsByStartDate = (bookingRequests: BookingRequests): BookingRequests => {
  const sorted = [...bookingRequests].sort((bookingA, bookingB) => {
    return bookingB.start.getDate() - bookingA.start.getDate();
  });
  return sorted;
};

export const dateIsTodayOrAfter = (date: Date): boolean => {
  const dateYear = date.getFullYear();
  const dateMonth = date.getMonth();
  const dateDay = date.getDay();
  const dateCompare = parseInt(`${dateYear}${dateMonth}${dateDay}`);

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDay = today.getDay();
  const todayCompare = parseInt(`${todayYear}${todayMonth}${todayDay}`);

  let dateIsTodayOrAfter = false;
  if (dateCompare >= todayCompare) {
    dateIsTodayOrAfter = true;
  }

  return dateIsTodayOrAfter;
};

export const getCurrentBookings = (bookingRequests: BookingRequests): BookingRequests => {
  const filteredByStartDate = bookingRequests.filter((bookingRequest) => {
    return dateIsTodayOrAfter(bookingRequest.start);
  });

  const sortedByStartDate = sortBookingsByStartDate(filteredByStartDate);

  sortedByStartDate.pop();

  return sortedByStartDate;
};

export const getNextBooking = (bookingRequests: BookingRequests): BookingRequest | null => {
  const filteredByStartDate = bookingRequests.filter((bookingRequest) => {
    return dateIsTodayOrAfter(bookingRequest.start);
  });

  const sortedByStartDate = sortBookingsByStartDate(filteredByStartDate);

  return sortedByStartDate.pop() || null;
};
