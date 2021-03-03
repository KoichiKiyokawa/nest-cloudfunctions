import { BaseEntity } from '~/base/base.entity'

export type User = {
  name: string
  age: number
}

export class UserEntity extends BaseEntity<User> {
  constructor(public readonly data: User) {
    super(data)
  }

  protected readonly validater: Record<keyof User, () => string | null> = {
    name: () => {
      if (typeof this.data.name !== 'string') return 'invalid data'
      if (this.data.name.length > 30) return '名前は30文字以下にしてください'
      if (this.data.name.length <= 2) return '名前は3文字以上にしてください'
      return null
    },
    age: () => {
      if (typeof this.data.age !== 'number') return 'invalid data'
      return null
    },
  }
}
