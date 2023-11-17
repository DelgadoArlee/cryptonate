export class Transaction {
  readonly id: string;

  readonly donor: string;

  readonly amount: number;

  constructor(id: string, donor: string, amount: number) {
    this.id = id;
    this.donor = donor;
    this.amount = amount;
  }
}
