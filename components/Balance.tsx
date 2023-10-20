import { montserrat } from "@/app/layout";
import EditBalance from "./EditBalance";
import { useAuthContext } from "@/context/AuthContext";

interface BalanceProps {
  balance: number | null;
  onEditBalance: () => void;
  showEditBalance: boolean;
  onCloseBalance: () => void;
  fetchBalance: () => Promise<void>;
  userId: string;
}

const Balance = ({
  balance,
  onEditBalance,
  showEditBalance,
  onCloseBalance,
  fetchBalance,
  userId,
}: BalanceProps) => {
  const { user } = useAuthContext();

  return (
    <header className="relative w-full flex flex-col items-center">
      <p className="mb-2 text-md text-slate-500">Current balace</p>
      <div
        className={`balance-wrapper ${
          showEditBalance ? "open" : ""
        } relative min-w-[200px] py-2 px-10 rounded-2xl text-black text-center`}
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
            onUpdate={fetchBalance}
          />
        ) : null}
      </div>
    </header>
  );
};

export default Balance;
