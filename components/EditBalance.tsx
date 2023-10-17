// components/EditBalance.tsx
import React, { useEffect, useRef, useState } from "react";
import updateBalance from "@/firebase/firestore/updateBalance";

interface Props {
  userId: string;
  currentBalance: number;
  onClose: () => void;
  onUpdate: () => void;
}

const EditBalance: React.FC<Props> = ({
  userId,
  onClose,
  onUpdate,
  currentBalance,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [newBalance, setNewBalance] = useState<number>(currentBalance);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBalance(parseFloat(e.target.value));
  };

  const handleUpdateBalance = async () => {
    const { result, error } = await updateBalance(userId, newBalance);
    if (error) {
      console.log("Error updating balance:", error);
    } else {
      console.log("Balance updated:", result);
      onClose();
      onUpdate();
    }
  };

  return (
    <div className="edit-balance absolute top-0 left-0 w-full">
      <input
        ref={inputRef}
        type="number"
        id="new-balance"
        name="new-balance"
        value={newBalance}
        onChange={handleInputChange}
        className="w-full py-2 px-10 rounded-2xl text-4xl text-center bg-slate-100"
      />
      <div className="mt-2 flex items-center justify-center gap-2">
        <button
          className="py-2 px-3 rounded-xl border-slate-200 border-[1px] text-sm text-black"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="py-2 px-3 rounded-xl bg-orange-400 text-sm text-white"
          onClick={handleUpdateBalance}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditBalance;
