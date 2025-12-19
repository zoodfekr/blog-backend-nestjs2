import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { get } from 'http';
import { Roles } from './partials/roles.decorator';
import { Role } from 'src/common/role.enum';


@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }


  @Get('')
  @Roles(Role.Admin)
  getAllUsers() {
    return this.usersService.allUSers()
  }



}

