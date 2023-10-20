import { differenceInDays } from "date-fns";

interface SpentProps {
  moneySpent: number;
  firstSalaryOfTheMonth: number;
  firstSalaryDate: Date | undefined;
}

const Spent = ({
  moneySpent,
  firstSalaryOfTheMonth,
  firstSalaryDate,
}: SpentProps) => {
  const today = new Date();
  const daysSinceFirstSalary = firstSalaryDate
    ? differenceInDays(today, firstSalaryDate)
    : 0;
  const percentageSpent = (moneySpent / firstSalaryOfTheMonth) * 100;

  return (
    <div className="flex flex-1 flex-col py-4 px-4 rounded-2xl bg-slate-100 text-slate-500 text-sm">
      <div className="text-center">
        <p>
          In the last{" "}
          <span className="font-bold text-black">{daysSinceFirstSalary}</span>{" "}
          days you spent around
        </p>
        <p className="my-2">
          <span className="text-3xl text-black">
            {moneySpent.toLocaleString()} <span className="text-xl">kr</span>
          </span>
        </p>
      </div>

      <div className="mt-3 relative w-full h-4">
        <div className="absolute top-[1px] left-0 h-[8px] bg-slate-300 rounded-full w-full" />
        <div
          className="absolute top-0 left-0 h-[10px] bg-white rounded-full"
          style={{ width: `${percentageSpent}%` }}
        ></div>
      </div>
      <div className="mt-2 text-center">
        That's about {Math.round(percentageSpent)}% of the money you got this
        month.
      </div>
    </div>
  );
};

export default Spent;
