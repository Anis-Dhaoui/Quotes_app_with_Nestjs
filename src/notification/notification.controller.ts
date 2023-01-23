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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationService.remove(+id);
  }
}
