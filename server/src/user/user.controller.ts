import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post } from '@nestjs/common'
import { User, UserEntity } from './user.entity'
import { UserRepository } from './user.repository'

@Controller('users')
export class UserController {
  @Get()
  async index() {
    const users = await new UserRepository().all()
    return { users }
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    const user = await new UserRepository().find(id)
    return { user }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() user: User) {
    console.log(user)

    const userEntity = new UserEntity(user)
    const errs = [userEntity.validateSchema(), userEntity.validateHasAllProperty()]
    errs.forEach((err) => {
      if (err != null) throw new HttpException(errs, HttpStatus.BAD_REQUEST)
    })

    await new UserRepository().create(user)
  }
}
