export class Transaction {
  readonly donor: string;

  readonly amount: number;

  constructor(donor: string, amount: number) {
    this.donor = donor;
    this.amount = amount;
  }
}
