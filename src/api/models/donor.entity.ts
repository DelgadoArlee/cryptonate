class Donor {
  readonly key: string;
  readonly name: string;
  readonly totalDonations: number;

  constructor(key: string, name: string, totalDonations: number) {
    this.key = key;
    this.name = name;
    this.totalDonations = totalDonations;
  }
}

export default Donor;
