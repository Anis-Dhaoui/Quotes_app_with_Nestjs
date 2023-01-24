import { Roles } from './../auth/RBAC/verify-admin/roles.decorator';
import { OwnerGuard } from './../auth/RBAC/verify-owner/owner.guard';
import { RoleGuard } from './../auth/RBAC/verify-admin/roles.guard';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Controller, Get, Post, Body, Param, Delete, Res, HttpStatus, Query, UseGuards, Req } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Res() res, @Req() req, @Query() query) {
    try {
      const notifData = await this.notificationService.findAllNotifs(query, req.user._id);
      return res.status(HttpStatus.OK).json({
        message: 'All notifications data found successfully', notifData,
      });
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }

  @Roles('Admin', 'User')
  @UseGuards(JwtAuthGuard, RoleGuard, OwnerGuard)
  @Get('/:notifId')
  async findOne(@Param('notifId') notifId: ObjectId, @Res() res) {
    try {
      const notification = await
        this.notificationService.findOneNotif(notifId);
      return res.status(HttpStatus.OK).json({
        message: 'Notfication found successfully', notification,
      });
    } catch (err) {
      return res.status(err.status).json(err.res);
    }
  }

  @Delete(':notifId')
  async remove(@Param('notifId') notifId: ObjectId, @Res() res) {
    try {
      const deletedNotif = await this.notificationService.removeNotif(notifId);
      return res.status(HttpStatus.OK).json({
        message: 'Notification deleted successfully',
        deletedNotif,
      });
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }
}
