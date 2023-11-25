class Donor {
  readonly name: string;
  readonly totalDonations: number;

  constructor(name: string, totalDonations: number) {
    this.name = name;
    this.totalDonations = totalDonations;
  }
}

export default Donor;
