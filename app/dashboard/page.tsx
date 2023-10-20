"use client";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import EditBalance from "@/components/EditBalance";
import getData from "@/firebase/firestore/getData";
import { montserrat } from "../layout";
import useCanSpendDaily from "@/helpers/useCanSpendDaily";
import calculateSpending from "@/helpers/calculateSpending";
import Balance from "@/components/Balance";
import Spendable from "@/components/Spendable";
import Spent from "@/components/Spent";
import getFirstSalaryDate from "@/helpers/getFirstSalaryDate";

function DashboardPage() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [showEditBalance, setShowEditBalance] = useState<boolean>(false);
  const [balance, setBalance] = useState<number | null>(null);
  const { dailySpendableAmount, daysUntilNextSalary } = useCanSpendDaily(
    balance || 0
  );
  const [moneySpent, setMoneySpent] = useState<number>(0);
  const [firstSpendDay, setFirstSpendDay] = useState<Date | null>(null);
  const [firstSalaryOfTheMonth, setFirstSalaryOfTheMonth] = useState<number>(0);
  const [firstSalaryDate, setFirstSalaryDate] = useState<Date>();

  useEffect(() => {
    if (user == null) router.push("/signin");
  }, [user]);

  const fetchBalance = async () => {
    if (user) {
      const { result, error } = await getData("users", user.uid);
      if (error) {
        console.error("Error fetching user balance:", error);
        return;
      }
      if (result?.exists()) {
        const currentBalance = result.data().currentBalance;
        const lastUpdatedBalance = result.data().lastUpdatedBalance || 0; // Fallback to 0 if undefined
        const lastUpdatedDate = result.data().lastUpdatedDate;
        const firstSalary = result.data().firstSalaryOfTheMonth;

        const { moneySpent, firstSpendDay } = calculateSpending(
          currentBalance,
          lastUpdatedBalance,
          lastUpdatedDate
        );

        setBalance(currentBalance);
        setMoneySpent(moneySpent);
        setFirstSpendDay(firstSpendDay);
        setFirstSalaryOfTheMonth(firstSalary);
        setFirstSalaryDate(getFirstSalaryDate());
      }
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [user]);

  const onEditBalance = () => {
    setShowEditBalance(true);
  };

  const onCloseBalance = () => {
    setShowEditBalance(false);
    console.log(showEditBalance);
  };

  return (
    <main className="dashboard flex min-h-screen flex-col items-center justify-between p-5">
      <div className="max-w-lg w-full p-5 rounded-xl shadow-lg bg-white text-black">
        <div className="relative w-full flex flex-col items-center ">
          <Balance
            balance={balance}
            onEditBalance={onEditBalance}
            showEditBalance={showEditBalance}
            onCloseBalance={onCloseBalance}
            fetchBalance={fetchBalance}
            userId={user?.uid || ""}
          />
        </div>
        <div className="w-full flex flex-col gap-4 mt-5">
          <Spendable
            dailySpendableAmount={dailySpendableAmount}
            daysUntilNextSalary={daysUntilNextSalary}
          />
          <Spent
            moneySpent={moneySpent}
            firstSalaryDate={firstSalaryDate}
            firstSalaryOfTheMonth={firstSalaryOfTheMonth}
          />
        </div>
      </div>
    </main>
  );
}

export default DashboardPage;
