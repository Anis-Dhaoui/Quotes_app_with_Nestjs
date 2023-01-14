import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { Controller, Post, Body, HttpStatus, Res, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/signup')
  async create(@Res() res, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.authService.register(createUserDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        user: newUser,
      });
    } catch (error) {
      if (error && error.keyPattern.email == 1) {
        return res.status(HttpStatus.CONFLICT).json({
          statusCode: 409,
          message: `Error: ${error.keyValue.email} belongs to other account`,
          error: 'Conflict'
        })
      }
      return res.status(error.status).json(error.response);
    }
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req) {
    return req.body;
  }

}
