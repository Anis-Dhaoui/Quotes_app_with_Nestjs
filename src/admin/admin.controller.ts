import { NotificationService } from './../notification/notification.service';
import { RoleGuard } from 'src/auth/RBAC/verify-admin/roles.guard';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { ObjectId } from 'mongoose';
import { Roles } from './../auth/RBAC/verify-admin/roles.decorator';
import { QuoteService } from './../quote/quote.service';
import { Controller, Get, Query, Res, HttpStatus, Param, UseGuards, Put, Req } from '@nestjs/common';
import { AdminService } from './admin.service';
// var ObjectId = require('mongoose').Types.ObjectId;

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly notificationService: NotificationService
  ) { }

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
