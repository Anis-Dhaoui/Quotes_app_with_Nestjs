import { UsersService } from './../users/users.service';
import { NotificationService } from './../notification/notification.service';
import { RoleGuard } from 'src/auth/RBAC/verify-admin/roles.guard';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { ObjectId } from 'mongoose';
import { Roles } from './../auth/RBAC/verify-admin/roles.decorator';
import { Controller, Get, Query, Res, HttpStatus, Param, UseGuards, Put, Req, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
// var ObjectId = require('mongoose').Types.ObjectId;

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly notificationService: NotificationService,
    private readonly usersService: UsersService
  ) { }

  //$$$$$$$$$$$$$$$$$$$$$$$$// FETCH ALL USERS  //$$$$$$$$$$$$$$$$$$$$$$$$//
  @Roles('Admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('allusers')
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

  //$$$$$$$$$$$$$$$$$$$$$$$$// REMOVE SPECICIFIC USER  //$$$$$$$$$$$$$$$$$$$$$$$$//
  @Roles('Admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('/allusers/:userId')
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

  //$$$$$$$$$$$$$$$$$$$$$$$$// APPROVE OR DISAPROVE POSTED QUOTES  //$$$$$$$$$$$$$$$$$$$$$$$$//
  @Roles('Admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put('/:quoteId')
  async allowDeny(@Param('quoteId') quoteId: ObjectId, @Query() query, @Res() res, @Req() req) {
    try {
      const quote = await this.adminService.allowDenyQuote(quoteId, query);

      // Notify the quote OWNER either his quote has been allowed or denied
      await this.notificationService.createNotif({
        sender: req.user._id,
        reciever: quote.owner, //Quote Owner ID
        title: `ADMIN: Your Quote has been ${query.status}`,
        context: quote._id
      })

      return res.status(HttpStatus.OK).json({
        message: `Quote has been ${query.status}`, quote,
      });
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }
}
