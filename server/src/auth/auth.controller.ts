import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { Controller, Post, Body, HttpStatus, Res, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/register')
  async create(@Res() res, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.authService.register(createUserDto);
      return res.status(HttpStatus.CREATED).json({
        statusCode: 200,
        message: 'Account created successfully',
      });
    } catch (error) {
      if (error && error.keyPattern.email == 1) {
        return res.status(HttpStatus.CONFLICT).json({
          statusCode: 409,
          message: `Error: ${error.keyValue.email} belongs to other account`,
        })
      }

      return res.status(error.status).json(error.response);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

}
