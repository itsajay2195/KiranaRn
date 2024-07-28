export const dateFormatter = (date: any) => {
  // Extract hours and minutes
  let hours = date.getHours();
  let minutes: any = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours from 24-hour to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;

  // Format the time as 'h.mmAM/PM'
  return `${hours}.${minutes}${ampm}`;
};
