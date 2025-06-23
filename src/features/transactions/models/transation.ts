export class Transacao {
  tipo: 'Depósito' | 'Transferência';
  valor: number;
  data: Date;

  constructor(tipo: 'Depósito' | 'Transferência', valor: number, data: Date = new Date()) {
    this.tipo = tipo;
    this.valor = tipo === 'Transferência' ? -Math.abs(valor) : Math.abs(valor);
    this.data = data;
  }

  getValor(): number {
    return this.valor;
  }

  getTipo(): string {
    return this.tipo;
  }

  getData(): string {
    return this.data.toLocaleDateString('pt-BR');
  }
}