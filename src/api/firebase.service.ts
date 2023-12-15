import {
  DataSnapshot,
  Database,
  DatabaseReference,
  onValue,
  runTransaction,
  push,
  ref,
  IteratedDataSnapshot,
} from 'firebase/database';
import { Donation } from './models/donation.entity';
import Donor from './models/donor.entity';

export class FirebaseService {
  constructor(private readonly db: Database) {}

  public createDonor(name: string, amount: number) {
    return (donor?: { name: string; totalDonations: number }) => {
      if (donor) {
        donor.name = name;
        donor.totalDonations += amount;
      } else {
        donor = {
          name: name,
          totalDonations: amount,
        };
      }

      return donor;
    };
  }

  public async addDonor(
    key: string,
    name: string,
    amount: number,
  ): Promise<void> {
    const reference: DatabaseReference = ref(this.db, 'donors/' + key);

    await runTransaction(reference, this.createDonor(name, amount));
  }

  getTopDonors(): Donor[] {
    const reference: DatabaseReference = ref(this.db, 'donors/');
    let topDonors: Donor[] = [];

    const findTopDonors = (donorSnapshot: DataSnapshot) => {
      const donors: Donor[] = [];
      const donorArray = (donor: IteratedDataSnapshot) => {
        donors.push(
          new Donor(donor.key, donor.val().name, donor.val().totalDonations),
        );
      };

      if (donorSnapshot.exists()) {
        donorSnapshot.forEach(donorArray);
      }

      const highestDonors = (a: Donor, b: Donor) =>
        b.totalDonations - a.totalDonations;

      donors.sort(highestDonors);

      topDonors = donors.slice(0, 10);
    };

    onValue(reference, findTopDonors);

    return topDonors;
  }

  async addTransaction(userId: string, amount: number): Promise<void> {
    const reference: DatabaseReference = ref(
      this.db,
      'transactions/' + userId + '/donations',
    );

    const donation = new Donation(amount);

    await push(reference, donation);
  }

  // async getTransactions(): Promise<{ [userId: string]: number }> {
  //   const reference: DatabaseReference = ref(this.db, 'transactions/');

  //   // Create a promise to handle the asynchronous operation
  //   const leaderboardPromise = new Promise<{ [userId: string]: number }>(
  //     (resolve, reject) => {
  //       onValue(
  //         reference,
  //         (usersSnapshot: DataSnapshot) => {
  //           const leaderboard: { [userId: string]: number } = {};

  //           usersSnapshot.forEach((userSnapshot: DataSnapshot) => {
  //             const userId = userSnapshot.key as string;
  //             const userDonations = Object.values(
  //               userSnapshot.val().donations,
  //             ) as Donation[];

  //             // Calculate the total donation amount for each user
  //             let totalAmount = 0;
  //             userDonations.forEach((donation: Donation) => {
  //               totalAmount += donation.amount;
  //             });

  //             leaderboard[userId] = totalAmount;
  //           });

  //           resolve(leaderboard);
  //         },
  //         (error) => {
  //           reject(error);
  //         },
  //       );
  //     },
  //   );

  //   // Return the leaderboard
  //   return leaderboardPromise;
  // }
}
