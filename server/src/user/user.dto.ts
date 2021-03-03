import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'
import { User } from './user.entity'

export class CreateUserDto implements User {
  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  age!: number
}
