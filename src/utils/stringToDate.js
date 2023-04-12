export const stringToDate = (stringDate) => {
  // console.log(stringDate);
  const dateObj = new Date(stringDate);
  const formattedDate = `${dateObj.getUTCDate().toString().padStart(2, "0")}/${(
    dateObj.getUTCMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${dateObj.getUTCFullYear()}`;
  const formattedTime = `${dateObj
    .getUTCHours()
    .toString()
    .padStart(2, "0")}:${dateObj.getUTCMinutes().toString().padStart(2, "0")}`;

  const formattedDateTime = `${formattedDate} ${formattedTime}`;
  return formattedDateTime;
};
