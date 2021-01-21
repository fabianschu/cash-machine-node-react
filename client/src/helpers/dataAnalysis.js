import moment from "moment";
import "moment/locale/de";

moment.locale("de");

const prepareData = (invoices, projects) => {
  let januaryIndex;
  let months = [];

  const getLastTwelveMonths = () => {
    for (let i = 11; i >= 0; i--) {
      const month = moment().subtract(i, "months");
      months.push({
        month: month.format("MMM"),
        billedHours: 0,
        totalHours: 0,
      });
      if (month.format("M") == 1) januaryIndex = 11 - i;
    }
  };

  const getMonthIndex = (date) => {
    const dateIndex = moment(date).format("M") - 1;
    return (januaryIndex + dateIndex) % 12;
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
    return moment().diff(date, "years") < 1;
  };

  const isSameMonth = (date) => {
    return moment(date).isSame(moment(), "month");
  };

  const calculateBilledData = (invoices) => {
    for (let i = 0; i < invoices.length; i++) {
      const invoice = invoices[i];
      const { updatedAt, totalHours, totalSum } = invoice;
      const parsedDate = new Date(updatedAt);
      if (isSameMonth(parsedDate)) {
        data.month.billedHours.count += totalHours;
        data.month.billedSum.count += totalSum;
      }
      if (isWithinYear(parsedDate)) {
        const monthIndex = getMonthIndex(parsedDate);
        data.year[monthIndex]["billedHours"] += totalHours;
      }
    }
  };

  const calculateTotalData = (projects) => {
    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      const { hours, updatedAt } = project;
      const parsedDate = new Date(updatedAt);
      if (isSameMonth(parsedDate)) {
        data.month.totalHours.count += hours;
      }
      if (isWithinYear(parsedDate)) {
        const monthIndex = getMonthIndex(parsedDate);
        data.year[monthIndex]["totalHours"] += hours;
      }
    }
  };

  getLastTwelveMonths();
  calculateTotalData(projects);
  calculateBilledData(invoices);

  return data;
};

export default prepareData;
