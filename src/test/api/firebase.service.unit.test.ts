import { vi, describe } from 'vitest';
import { runTransaction, ref, getDatabase } from 'firebase/database';
import { FirebaseService } from '../../api/firebase.service';

vi.mock('firebase/database', () => {
  const getDatabase = vi.fn();
  const ref = vi.fn();
  const runTransaction = vi.fn();

  return { getDatabase, ref, runTransaction };
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('FirebaseService', () => {
  describe('createDonor method', () => {
    it('creates donor to be saved unto firebase', () => {
      const firebaseService = new FirebaseService(getDatabase());
      const name = 'John';
      const amount = 0.01;
      const newDonor = {
        name: name,
        totalDonations: amount,
      };

      expect(
        firebaseService.createDonor(name, amount)(undefined),
      ).toStrictEqual(newDonor);
    });

    it('updates an existing donor from firebase', () => {
      const firebaseService = new FirebaseService(getDatabase());
      const existingDonor = { name: 'Jay', totalDonations: 0.02 };
      const newName = 'John';
      const amount = 0.1;

      firebaseService.createDonor(newName, amount)(existingDonor);

      expect(existingDonor.name).toBe(newName);
      expect(existingDonor.totalDonations).toBe(0.02 + amount);
      expect(existingDonor).toStrictEqual({
        name: newName,
        totalDonations: 0.02 + amount,
      });
    });
  });

  describe('addDonor method', () => {
    it('locates the data in firebase RDB and calls the createDonor method to update or create donor data', async () => {
      const key = 'wallet-address';
      const name = 'John';
      const amount = 0.01;
      const firebaseService = new FirebaseService(getDatabase());
      const fireDbSpy = vi.spyOn(firebaseService, 'createDonor');

      await firebaseService.addDonor(key, name, amount);
      expect(runTransaction).toHaveBeenCalled();
      expect(ref).toHaveBeenCalled();
      expect(fireDbSpy).toHaveBeenCalled();
      expect(fireDbSpy).toHaveBeenCalledWith(name, amount);
    });
  });
});
