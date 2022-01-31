import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const user = new this.userModel(createUserDto);
    user.password = await bcrypt.hash(createUserDto.password, salt);
    return user.save();
  }

  findAll() {
    return this.userModel.find().populate(['organizationId', 'teamId']).exec();
  }

  async findOne(id: string) {
    return await this.getById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const existingUser = await this.userModel
        .findOneAndUpdate({ _id: id }, { $set: updateUserDto }, { new: true })
        .populate(['organizationId', 'teamId']);

      if (!existingUser) {
        throw new NotFoundException(`User with #${id} not found`);
      }
      return existingUser;
    } catch {
      throw new NotFoundException(`User with #${id} not found`);
    }
  }

  async remove(id: string) {
    const user = await this.getById(id);
    return user.remove();
  }

  private async getById(id: string) {
    try {
      const user = await this.userModel
        .findOne({ _id: id })
        .populate(['organizationId', 'teamId'])
        .exec();
      if (!user) {
        throw new NotFoundException(`User with #${id} not found`);
      }
      return user;
    } catch {
      throw new NotFoundException(`User with #${id} not found`);
    }
  }
}
