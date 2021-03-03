import { admin } from '~/modules/firebase-admin'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TBase {}

export abstract class BaseRepository<T extends TBase> {
  abstract get collectionName(): string
  get collectionReference() {
    return admin.firestore().collection(this.collectionName) as admin.firestore.CollectionReference<T>
  }

  find(id: string): Promise<T & { id: string }> {
    return this.collectionReference
      .doc(id)
      .get()
      .then((snap) => ({ ...(snap.data() as T), id: snap.id }))
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async all(..._args: any[]): Promise<Array<T & { id: string }>> {
    const snap = await this.collectionReference.get()
    return snap.docs.map((doc) => ({ ...(doc.data() as T), id: doc.id }))
  }

  async create(data: T) {
    return this.collectionReference.add(data)
  }
}
