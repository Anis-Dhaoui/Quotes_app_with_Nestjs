import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') public userModel: Model<IUser>) { }

  async findAll(): Promise<IUser[]> {
    const userData = await this.userModel.find();
    if (!userData || userData.length == 0) {
      throw new NotFoundException('User data not found');
    }

    return userData;
  }

  async findOneUser(id: string): Promise<IUser> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async remove(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return deletedUser;
  }
}
