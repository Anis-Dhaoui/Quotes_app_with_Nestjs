import { Roles } from './../auth/RBAC/verify-admin/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Controller, Get, Post, Body, Param, Delete, Res, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleGuard } from 'src/auth/RBAC/verify-admin/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Roles('Admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async findAll(@Res() res) {
    try {
      const users = await this.usersService.findAll();
      return res.status(HttpStatus.OK).json({
        message: 'Fetched all users successfully',
        users: users
      })
    } catch (error) {
      return res.status(error.status).json(error.response);
    }

  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') userId: string) {
    try {
      const user = await this.usersService.findOne(userId);
      return res.status(HttpStatus.OK).json({
        message: `User ${user.firstName} fetched successfully`,
        user: user
      })
    } catch (error) {
      return res.status(error.status).json(error.response);
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
      return res.status(error.status).json(error.response);
    }
  }

  @Delete(':userId')
  async remove(@Res() res, @Param('userId') userId: string) {
    try {
      const deletedUser = await this.usersService.remove(userId);
      return res.status(HttpStatus.OK).json({
        message: `User ${deletedUser._id} deleted successfully`,
        deletedUser: deletedUser
      })
    } catch (error) {
      return res.status(error.status).json(error.response);
    }
  }
}