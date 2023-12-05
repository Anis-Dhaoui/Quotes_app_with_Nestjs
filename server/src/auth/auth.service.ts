import { UsersService } from './../users/users.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { IUser } from './../users/entities/user.entity';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UsersService) { }

  //$$$$$$$$$$$$$$$$$$// SIGNUP //$$$$$$$$$$$$$$$$$$//
  async register(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = await new this.userService.userModel(createUserDto);
    return newUser.save();
  }

  //$$$$$$$$$$$$$$$$$$// CHECK IF USER EXISTS WHEN TRYING TO AUTHENTICATE //$$$$$$$$$$$$$$$$$$//
  async getUser(query: object): Promise<IUser> {
    return this.userService.userModel.findOne(query, '+password -__v');
  }

  //$$$$$$$$$$$$$$$$$$// VALIDATE EMAIL AND PASSWORD //$$$$$$$$$$$$$$$$$$//
  async validateUser(email: string, password: string): Promise<any> {

    const user = await this.getUser({ email });
    if (!user) {
      throw new HttpException('No account belongs to this email', HttpStatus.NOT_FOUND);
    }

    const passwordValid = await bcrypt.compare(password, user.password)

    if (!passwordValid) {
      throw new HttpException('Incorrect password!', HttpStatus.UNAUTHORIZED);
    }

    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  //$$$$$$$$$$$$$$$$$$// SIGNIN //$$$$$$$$$$$$$$$$$$//
  async login(user: IUser) {
    const payload = { email: user.email, sub: user._id };
    const userWithoutPassword = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userPic: user.userPic,
      interests: user.interests,
      role: user.role
    }
    return {
      user: userWithoutPassword,
      access_token: this.jwtService.sign(payload),
    };
  }
}
