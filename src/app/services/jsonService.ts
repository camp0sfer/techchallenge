import { Transaction, TransactionType } from "../models/transaction";

let transactions: Transaction[] = [
  new Transaction(1, 'depósito', 1000, '05/07/2025'),
  new Transaction(2, 'transferência', 500, '06/07/2025'),
];

export const JsonService = {
  list: async () => transactions,
  get: async (id: number) => transactions.find(t => t.id === id),
  add: async (t: Omit<Transaction, 'id'>) => {
    const newTransaction = new Transaction(Date.now(), t.type, t.amount, t.date);
    transactions.push(newTransaction);
    return newTransaction;
  },
  update: async (id: number, data: Partial<Transaction>) => {
    const idx = transactions.findIndex(t => t.id === id);
    if (idx > -1) transactions[idx] = { ...transactions[idx], ...data };
    return transactions[idx];
  },
  delete: async (id: number) => {
    transactions = transactions.filter(t => t.id !== id);
  }
};
