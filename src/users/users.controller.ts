import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, HttpCode, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Res() res, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.create(createUserDto);
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
      return res.json(error);
    }
  }

  @Get()
  async findAll(@Res() res) {
    try {
      const users = await this.usersService.findAll();
      return res.status(HttpStatus.OK).json({
        message: 'Fetched all users successfully',
        users: users
      })
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: 404,
        message: 'Error: User data not found!',
        error: 'Not Found'
      });
    }

  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') userId: string) {
    try {
      const user = await this.usersService.findOne(userId);
      return res.status(HttpStatus.OK).json({
        message: `User ${user.firsName} fetched successfully`,
        user: user
      })
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: 404,
        message: 'Error: User not found!',
        error: 'User Not Found'
      });
    }
  }

  @Put(':id')
  async update(@Res() res, @Param('id') userId: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.usersService.update(userId, updateUserDto);
      return res.status(HttpStatus.OK).json({
        message: `User ${updatedUser.id} updated successfully`,
        updatedUser: updatedUser
      })
    } catch (error) {
      if (error && error.keyPattern.email == 1) {
        return res.status(HttpStatus.CONFLICT).json({
          statusCode: 409,
          message: `Error: ${error.keyValue.email} belongs to other account`,
          error: 'Conflict'
        })
      }
      return res.json(error);
    }
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') userId: string) {
    try {
      const deletedUser = await this.usersService.remove(userId);
      return res.status(HttpStatus.OK).json({
        message: `User ${deletedUser.id} deleted successfully`,
        deletedUser: deletedUser
      })
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: 'Bad Request'
      });
    }
  }
}