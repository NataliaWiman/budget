import dayjs from "dayjs";

interface SpendingInfo {
  moneySpent: number;
  firstSpendDay: Date | null;
}

function calculateSpending(
  currentBalance: number,
  lastUpdatedBalance: number,
  lastUpdatedDate: string
): SpendingInfo {
  const lastSalaryDate = dayjs().date(25).startOf("day"); // 25th of this month, start of the day
  const today = dayjs().startOf("day"); // start of today

  let firstSpendDay = lastSalaryDate;

  if (dayjs(lastUpdatedDate).isAfter(lastSalaryDate)) {
    firstSpendDay = dayjs(lastUpdatedDate).startOf("day"); // If last updated after salary date, then that's the first spend day
  }

  const daysSinceFirstSpend = today.diff(firstSpendDay, "day");

  const moneySpent = lastUpdatedBalance - currentBalance;
  const averageDailySpending =
    daysSinceFirstSpend === 0 ? 0 : moneySpent / daysSinceFirstSpend;

  return {
    moneySpent: Math.round(moneySpent),
    firstSpendDay: firstSpendDay.toDate(),
  };
}

export default calculateSpending;
