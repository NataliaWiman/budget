"use client";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import SignOut from "@/components/SignOut";
import EditBalance from "@/components/EditBalance";
import getData from "@/firebase/firestore/getData";
import { montserrat } from "../layout";
import useCanSpendDaily from "@/helpers/useCanSpendDaily";
import calculateSpending from "@/helpers/calculateSpending";
import Image from "next/image";

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

  useEffect(() => {
    if (user == null) router.push("/signin");
  }, [user]);

  useEffect(() => {
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

          const { moneySpent, firstSpendDay } = calculateSpending(
            currentBalance,
            lastUpdatedBalance,
            lastUpdatedDate
          );

          setBalance(currentBalance);
          setMoneySpent(moneySpent);
          setFirstSpendDay(firstSpendDay);
        }
      }
    };

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
      <div className="max-w-lg w-full">
        <header className="relative w-full flex flex-col items-center p-5 rounded-xl shadow-lg bg-white text-black">
          <p className="mb-2 text-sm text-slate-500">Current balace</p>
          <div
            className={`balance-wrapper ${
              showEditBalance ? "open" : ""
            } relative py-2 px-10 rounded-2xl text-black`}
          >
            <p
              onClick={onEditBalance}
              className={`${montserrat.variable} balance text-4xl`}
            >
              <span className="font-bold">
                {balance !== null ? balance.toLocaleString() : 0}
              </span>
            </p>
            {showEditBalance ? (
              <EditBalance
                userId={user?.uid || ""}
                currentBalance={balance || 0}
                onClose={onCloseBalance}
              />
            ) : null}
          </div>
          <div className="w-full flex gap-4 mt-5">
            <div className="flex flex-1 flex-col py-4 px-4 rounded-2xl bg-orange-400 text-orange-100 text-sm">
              <p>You can spend</p>
              <p className="my-1 text-white">
                <span className="text-2xl">
                  {dailySpendableAmount.toLocaleString()}
                </span>
                <span className="text-md"> kr / day</span>
              </p>
              <p>
                the next{" "}
                <span className="font-bold text-white">
                  {daysUntilNextSalary}
                </span>{" "}
                days
              </p>
            </div>
            <div className="flex flex-1 flex-col py-4 px-4 rounded-2xl bg-slate-100 text-slate-600 text-sm">
              <p>You spent around</p>
              <p className="my-1">
                <span className="text-2xl text-black">
                  {moneySpent.toLocaleString()} kr
                </span>
              </p>
              <p>
                in last{" "}
                <span className="font-bold text-black">
                  {daysUntilNextSalary}
                </span>{" "}
                days
              </p>
            </div>
          </div>
        </header>
      </div>
    </main>
  );
}

export default DashboardPage;
