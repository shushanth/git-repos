export function areDateSame(newDate: Date, oldDate: Date): boolean {
  const newDateDay = newDate.getDate();
  const newDateMonth = newDate.getMonth();
  const newDateYear = newDate.getFullYear();
  const oldDateDay = oldDate.getDate();
  const oldDateMonth = oldDate.getMonth();
  const oldDateYear = oldDate.getFullYear();
  if (
    newDateDay === oldDateDay &&
    newDateMonth === oldDateMonth &&
    newDateYear === oldDateYear
  ) {
    return true;
  }
  return false;
}

export function dateFormat(date: Date): string {
  const exactDate = new Date(date);
  const exactMonth = exactDate.getMonth() + 1;
  const month = exactMonth < 10 ? `0${exactMonth}` : exactMonth;
  const day =
    exactDate.getDate() < 10 ? `0${exactDate.getDate()}` : exactDate.getDate();
  const dateFormat = `${exactDate.getFullYear()}-${month}-${day}`;
  return dateFormat;
}
