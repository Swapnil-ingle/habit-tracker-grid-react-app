export const formatDateObj = (temp) => {
  let year = temp.getFullYear();

  let month = String(temp.getMonth() + 1);
  month = month.length <= 1 ? "0" + month : month;

  let date = String(temp.getDate());
  date = date.length <= 1 ? "0" + date : date;

  let fullDateInStr = year + "-" + month + "-" + date;

  return fullDateInStr;
};

// Accepts string date "YYYY-MM-DD"
export const generateGridDateArray = (startDate, endDate) => {
  startDate = ensureStartDateIsStartOfWeek(startDate).getTime();
  endDate = new Date(endDate).getTime();

  let gridDateArr = [];
  let startingDate = startDate;
  let gridBoxColId = -1;

  for (let i = 0; i <= 7; i++) {
    // Pushing empty dates for day legends (Mon, Wed, Fri)
    gridDateArr.push(null);
  }

  while (startingDate <= endDate) {
    const currDate = formatDateObj(new Date(startingDate));
    gridBoxColId = gridBoxColId >= 8 ? 0 : gridBoxColId + 1;

    if (gridBoxColId === 0) {
      gridDateArr.push(currDate);
      gridBoxColId++;
      continue;
    }

    gridDateArr.push(currDate);
    startingDate += 24 * 60 * 60 * 1000; // add one day
  }

  return gridDateArr;
};

export const ensureStartDateIsStartOfWeek = (startDate) => {
  const dayOfWeek = new Date(startDate).getDay();

  if (dayOfWeek !== 0) {
    let tempDate = new Date(startDate);
    tempDate.setDate(tempDate.getDate() - dayOfWeek);
    return tempDate;
  }

  return new Date(startDate);
};

export const resolveMonthNumeralToSpell = (monthInt) => {
  switch (monthInt) {
    case 1:
      return "Jan";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Apr";
    case 5:
      return "May";
    case 6:
      return "Jun";
    case 7:
      return "Jul";
    case 8:
      return "Aug";
    case 9:
      return "Sep";
    case 10:
      return "Oct";
    case 11:
      return "Nov";
    case 12:
      return "Dec";
    default:
      return "NaN";
  }
};

export const resolveDayNumberToDayName = (dayNum) => {
  switch (dayNum) {
    case 3:
      return "Mon";
    case 5:
      return "Wed";
    case 7:
      return "Fri";
    default:
      return "";
  }
};
