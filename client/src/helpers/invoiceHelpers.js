export const taxRate = 0.19;

export const invoiceTotal = (positions, hourlyRate) => {
  const netTotal = positions.reduce((acc, position) => {
    return acc + Number((position.hours * hourlyRate).toFixed(2));
  }, 0);

  const taxes = taxRate * netTotal;

  return {
    netTotal,
    taxes,
    grossTotal: netTotal + taxes,
  };
};

export const invoiceHours = (positions) =>
  positions.reduce((acc, position) => {
    return acc + position.hours;
  }, 0);

export const formatPrice = (total) => {
  return total.toFixed(2).toString().replace(".", ",") + " €";
};
