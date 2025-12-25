import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { Roles } from './partials/roles.decorator';
import { Role } from 'src/common/enums/role.enum';


@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }

  @Post()
  @Roles(Role.Admin)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('')
  @Roles(Role.Admin)
  getAllUsers() {
    return this.usersService.allUsers()
  }

}

