import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { get } from 'http';


@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) { }


  @Get('')
  getAllUsers() {
    return this.usersService.allUSers()
  }



}

