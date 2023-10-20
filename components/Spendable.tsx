interface SpendableProps {
  dailySpendableAmount: number;
  daysUntilNextSalary: number;
}

const spendableMessages = [
  { threshold: 200, message: "You better slow down the spending spree." },
  {
    threshold: 400,
    message: "You are okay, but be mindful of your spendings.",
  },
  {
    threshold: 600,
    message: "You're doing well. You can still afford a little extra.",
  },
  { threshold: Infinity, message: "You're in a great spot! Treat yourself!" },
];

const getSpendableMessage = (amount: number): string => {
  for (let item of spendableMessages) {
    if (amount < item.threshold) {
      return item.message;
    }
  }
  return "Ok.";
};

const Spendable = ({
  dailySpendableAmount,
  daysUntilNextSalary,
}: SpendableProps) => {
  const maximumDailyAmount = 1000;
  const percentageSpent =
    100 - (dailySpendableAmount / maximumDailyAmount) * 100;
  const spendableMessage = getSpendableMessage(dailySpendableAmount);

  return (
    <div className="flex flex-1 flex-col py-4 px-4 rounded-2xl bg-orange-400 text-orange-100 text-sm">
      <div className="text-center">
        <p className="text-md">
          For the next{" "}
          <span className="font-bold text-white">{daysUntilNextSalary}</span>{" "}
          days you can spend around
        </p>
        <p className="my-2 text-white">
          <span className="text-3xl">
            {dailySpendableAmount.toLocaleString()}
          </span>
          <span className="text-xl"> kr/day</span>
        </p>
      </div>
      <div className="mt-3 relative w-full h-4">
        <div className="absolute top-[1px] left-0 h-[8px] bg-orange-300 rounded-full w-full" />
        <div
          className="absolute top-0 left-0 h-[10px] bg-white rounded-full"
          style={{ width: `${percentageSpent}%` }}
        ></div>
      </div>
      <div className="mt-2 text-center">{spendableMessage}</div>
    </div>
  );
};

export default Spendable;
