import { CreateUserDto } from './../users/dto/create-user.dto';
import { Model } from 'mongoose';
import { IUser } from './../users/entities/user.entity';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<IUser>, private jwtService: JwtService) { }

  //$$$$$$$$$$$$$$$$$$// SIGNUP //$$$$$$$$$$$$$$$$$$//
  async register(createUserDto: CreateUserDto): Promise<IUser> {

    // const user = await this.userModel.findOne({ email: createUserDto.email });
    // if (user) {
    //   throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    // }
    const newUser = await new this.userModel(createUserDto);
    return newUser.save();
  }

  //$$$$$$$$$$$$$$$$$$// CHECK IF USER EXISTS WHEN TRYING TO AUTHENTICATE //$$$$$$$$$$$$$$$$$$//
  async getUser(query: object): Promise<IUser> {
    return this.userModel.findOne(query);
  }

  //$$$$$$$$$$$$$$$$$$// VALIDATE EMAIL AND PASSWORD //$$$$$$$$$$$$$$$$$$//
  async validateUser(email: string, password: string): Promise<any> {
    Logger.log('infooooooooooooooooooooooooooooooooooooooooooooo')

    const user = await this.getUser({ email });
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!user) {
      throw new HttpException('No account belongs to this email', HttpStatus.NOT_FOUND);
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  //$$$$$$$$$$$$$$$$$$// SIGNIN //$$$$$$$$$$$$$$$$$$//
  async login(user: any) {
    console.log("xxxxxxxxxxxxxxxxxx");
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
