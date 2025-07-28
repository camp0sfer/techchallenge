import { Transaction, TransactionType } from "../models/transaction";

const STORAGE_KEY = "transactions";

function loadTransactions(): Transaction[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  return JSON.parse(data);
}

function saveTransactions(transactions: Transaction[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

export const JsonService = {
  list: async () => loadTransactions(),
  get: async (id: number) => loadTransactions().find(t => t.id === id),
  add: async (t: Omit<Transaction, 'id'>) => {
    const transactions = loadTransactions();
    const newTransaction = new Transaction(Date.now(), t.type, t.amount, t.date);
    transactions.push(newTransaction);
    saveTransactions(transactions);
    return newTransaction;
  },
  update: async (id: number, data: Partial<Transaction>) => {
    const transactions = loadTransactions();
    const idx = transactions.findIndex(t => t.id === id);
    if (idx > -1) transactions[idx] = { ...transactions[idx], ...data };
    saveTransactions(transactions);
    return transactions[idx];
  },
  delete: async (id: number) => {
    let transactions = loadTransactions();
    transactions = transactions.filter(t => t.id !== id);
    saveTransactions(transactions);
  }
};
