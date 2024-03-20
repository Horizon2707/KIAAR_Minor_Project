const moment = require("moment");
function convertDateFormat(dateStr) {
  // Split the date string by '-' to get the year, month, and day parts
  const parts = dateStr.split("-");

  // Reorder the parts to dd mm yyyy format
  const formattedDate = parts[2] + "-" + parts[1] + "-" + parts[0];
  var dateMomentObject = moment(formattedDate, "DD/MM/YYYY");
  var dateObject = dateMomentObject.toDate();
  console.log(formattedDate);
}

convertDateFormat("2024-03-20");
