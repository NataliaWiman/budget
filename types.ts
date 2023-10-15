interface Budget {
  currentBalance: number;
  items?: BudgetItem[];
}

interface BudgetItem {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
}

interface User {
  email: string;
  name: string;
}

export type { Budget, BudgetItem, User };
