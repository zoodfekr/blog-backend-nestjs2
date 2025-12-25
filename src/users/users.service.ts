import { Injectable } from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';
import { User, UserDocument } from './schema/user.chema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  async findOne(username: string) {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) throw new Error('نام کاربری یا رمز عبور اشتباه است ');
    return user;
  }

  async create(createUserDto: any) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async allUsers() {
    return this.userModel.find().exec();
  }

}
