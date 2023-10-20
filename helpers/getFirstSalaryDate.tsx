const getFirstSalaryDate = () => {
  const today = new Date();
  const dayOfMonth = today.getDate();

  // Check if it's between the 25th of the current month and 24th of the next month
  if (dayOfMonth >= 25) {
    return new Date(today.getFullYear(), today.getMonth(), 25);
  } else {
    // If today is before the 25th, set the date to the 25th of the previous month
    return new Date(today.getFullYear(), today.getMonth() - 1, 25);
  }
};

export default getFirstSalaryDate;
