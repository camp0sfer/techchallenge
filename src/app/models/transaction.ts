export type TransactionType = 'depósito' | 'transferência' | 'pagamento';

export class Transaction {
  constructor(
    public id: number,
    public type: TransactionType,
    public amount: number,
    public date: string
  ) {}
}
