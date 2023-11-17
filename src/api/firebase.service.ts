import { Database, DatabaseReference, ref, set } from 'firebase/database';
import { Transaction } from './models/transaction.entity';

export class FirebaseService {
  constructor(private readonly db: Database) {}

  async addTransaction(donor: string, amount: number) {
    const donation = new Transaction(donor, amount);
    const reference: DatabaseReference = ref(
      this.db,
      'donations/' + donation.donor,
    );

    set(reference, donation);
  }

  async getTransactions() {}
}
