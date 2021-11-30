export default function formatBookingDate(date: Date) {
  const day = date.getDate();
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
  const year = date.getFullYear();
  return `${day} ${month} ${year}, 8-9`;
}
