import moment from "moment";
import "moment/locale/de";

moment.locale("de");

let januaryIndex;
let months = [];

const getLastTwelveMonths = () => {
  for (let i = 11; i >= 0; i--) {
    const month = moment().subtract(i, "months").format("MMMM");
    months.push({ month, billedHours: 0, totalHours: 0 });
    if (month === "Januar") januaryIndex = 11 - i;
  }
};

const getMonthIndex = (date) => {
  const dateIndex = moment(date).format("M") - 1;
  console.log(dateIndex);
  if (januaryIndex + dateIndex > 11) return januaryIndex + dateIndex - 11;
  if (januaryIndex == dateIndex) return januaryIndex;
  return januaryIndex + dateIndex;
};

const data = {
  month: {
    totalHours: {
      label: "Gesamtstunden",
      count: 0,
    },
    billedHours: {
      label: "Verrechnete Stunden",
      count: 0,
    },
    billedSum: {
      label: "Verrechnete Summe",
      count: 0,
    },
  },
  year: months,
};

const isWithinYear = (date) => {
  return moment(date).isSame(moment(), "year");
};

const isSameMonth = (date) => {
  return moment(date).isSame(moment(), "month");
};

const lastTwelveMonths = getLastTwelveMonths();

const calculateBilledData = (invoices) => {
  for (let i = 0; i < invoices.length; i++) {
    const invoice = invoices[i];
    const { creationDate, totalHours, totalSum } = invoice;

    if (isSameMonth(creationDate)) {
      data.month.billedHours.count += totalHours;
      data.month.billedSum.count += totalSum;
    }
    if (isWithinYear(creationDate)) {
      const monthIndex = getMonthIndex(creationDate);
      data.year[monthIndex]["billedHours"] += totalHours;
    }
  }
};

const calculateTotalData = (projects) => {};

const prepareData = (invoices, projects) => {
  calculateTotalData(projects);
  calculateBilledData(invoices);
  return data;
};

export default prepareData;
