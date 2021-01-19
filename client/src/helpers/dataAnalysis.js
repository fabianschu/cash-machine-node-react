import moment from "moment";

const currentTime = moment().toDate();

const prepareData = (invoices, projects) => {
  const data = {
    month: {
      totalHours: {
        label: "Gesamtstunden",
        count: 0,
      },
      billedHours: {
        label: "Gesamtstunden",
        count: 0,
      },
      billedSum: {
        label: "Verrechnet",
        count: 0,
      },
    },
  };

  for (let i = 0; i < invoices.length; i++) {
    const invoice = invoices[i];
    const { creationDate } = invoice;

    if (isSameMonth(creationDate)) {
    }
    // isSameYear(creationDate){

    // };
  }
};

const isSameYear = (date) => {
  return moment(date).isSame(currentTime, "year");
};

const isSameMonth = (date) => {
  return moment(date).isSame(currentTime, "month");
};

export default prepareData;
