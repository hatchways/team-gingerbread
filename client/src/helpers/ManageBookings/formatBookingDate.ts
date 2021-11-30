export default function formatBookingDate(date: Date): string {
  const day = date.getDate();
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
  const year = date.getFullYear();
  return `${day} ${month} ${year}, 8-9`;
}
