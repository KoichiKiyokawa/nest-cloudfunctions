import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req } from '@nestjs/common'
import { CreateUserDto } from './user.dto'
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
  async create(@Body() createUserDto: CreateUserDto, @Req() req: any) {
    if (req.user) await new UserRepository().create(createUserDto)
  }
}
