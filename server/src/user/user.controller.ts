import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthorizedRequest } from '~/auth/auth.type'
import { CreateUserDto } from './user.dto'
import { UserRepository } from './user.repository'

@Controller('users')
export class UserController {
  @Get()
  async index() {
    const users = await new UserRepository().all()
    return { users }
  }

  @Get(':uid')
  async show(@Param('uid') uid: string) {
    const user = await new UserRepository().find(uid)
    return { user }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto, @Req() req: AuthorizedRequest) {
    if (req.user != null) throw new UnauthorizedException()

    await new UserRepository().create(createUserDto)
  }

  @Patch(':uid')
  async update(@Param() uid: string, @Req() req: AuthorizedRequest) {
    if (req.user.uid !== uid) throw new UnauthorizedException()
  }
}
