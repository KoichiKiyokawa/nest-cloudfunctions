export interface User {
  name: string
  age: number
}

export class UserEntity {
  constructor(private readonly data: User) {}
}
