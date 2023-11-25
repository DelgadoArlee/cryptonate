import {
  DataSnapshot,
  Database,
  DatabaseReference,
  onValue,
  runTransaction,
  push,
  ref,
} from 'firebase/database';
import { Donation } from './models/donation.entity';

export class FirebaseService {
  constructor(private readonly db: Database) {}

  async addDonor(id: string, name: string, amount: number): Promise<void> {
    const reference: DatabaseReference = ref(this.db, 'donors/' + id);

    runTransaction(reference, (donor) => {
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
    });
  }

  async addTransaction(userId: string, amount: number): Promise<void> {
    const reference: DatabaseReference = ref(
      this.db,
      'transactions/' + userId + '/donations',
    );

    const donation = new Donation(amount);

    await push(reference, donation);
  }

  async getTransactions(): Promise<{ [userId: string]: number }> {
    const reference: DatabaseReference = ref(this.db, 'transactions/');

    // Create a promise to handle the asynchronous operation
    const leaderboardPromise = new Promise<{ [userId: string]: number }>(
      (resolve, reject) => {
        onValue(
          reference,
          (usersSnapshot: DataSnapshot) => {
            const leaderboard: { [userId: string]: number } = {};

            usersSnapshot.forEach((userSnapshot: DataSnapshot) => {
              const userId = userSnapshot.key as string;
              const userDonations = Object.values(
                userSnapshot.val().donations,
              ) as Donation[];

              // Calculate the total donation amount for each user
              let totalAmount = 0;
              userDonations.forEach((donation: Donation) => {
                totalAmount += donation.amount;
              });

              leaderboard[userId] = totalAmount;
            });

            resolve(leaderboard);
          },
          (error) => {
            reject(error);
          },
        );
      },
    );

    // Return the leaderboard
    return leaderboardPromise;
  }
}
