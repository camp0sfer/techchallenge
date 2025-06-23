import { Transacao } from "../../transactions/models/transation";

export class Conta {
	private saldo: number;
	private transacoes: Transacao[];

	constructor() {
		this.saldo = 0;
		this.transacoes = [];
	}

	getSaldo(): number {
		return this.saldo;
	}

	adicionarTransacao(transacao: Transacao): void {
		this.transacoes.push(transacao);
		this.saldo += transacao.getValor();
	}

	listarTransacoes(): Transacao[] {
		return this.transacoes;
	}

	editarTransacao(index: number, nova: Transacao): void {
		this.transacoes[index] = nova;
		this.recalcularSaldo();
	}

	deletarTransacao(index: number): void {
		this.transacoes.splice(index, 1);
		this.recalcularSaldo();
	}

	private recalcularSaldo(): void {
		this.saldo = this.transacoes.reduce((acc, t) => acc + t.getValor(), 0);
	}
}
