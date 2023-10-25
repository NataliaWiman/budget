import { useMemo } from "react";

interface DailySpendableResult {
  dailySpendableAmount: number;
  daysUntilNextSalary: number;
}

const useCanSpendDaily = (totalAmount: number): DailySpendableResult => {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  let nextSalaryDate: Date;

  if (currentDay < 25) {
    nextSalaryDate = new Date(currentYear, currentMonth, 25);
  } else {
    nextSalaryDate = new Date(currentYear, currentMonth + 1, 25);
  }

  const msPerDay = 24 * 60 * 60 * 1000;
  const daysUntilNextSalary = Math.ceil(
    (nextSalaryDate.getTime() - today.getTime()) / msPerDay
  );

  const dailySpendableAmount = useMemo(() => {
    return (totalAmount / daysUntilNextSalary).toFixed(2);
  }, [totalAmount, daysUntilNextSalary]);

  return {
    dailySpendableAmount: parseFloat(dailySpendableAmount),
    daysUntilNextSalary,
  };
};

export default useCanSpendDaily;
