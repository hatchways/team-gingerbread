export default function dateIsTodayOrAfter(date: Date): boolean {
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
}
