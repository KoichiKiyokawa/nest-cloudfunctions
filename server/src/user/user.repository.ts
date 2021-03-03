import { BaseRepository } from '~/base/base.repository'
import { User } from './user.entity'

export class UserRepository extends BaseRepository<User> {
  get collectionName() {
    return 'users'
  }
}
