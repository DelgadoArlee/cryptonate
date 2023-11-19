export class Donation {
  readonly amount: number;

  readonly timestamp: Date;

  constructor(amount: number) {
    this.amount = amount;
    this.timestamp = new Date(Date.now());
  }
}
