import { Controller, Get, Post, Body, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @Post()
  create(@Res() res, @Body() createNotificationDto: CreateNotificationDto) {
    try {
      return this.notificationService.createNotif(createNotificationDto);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Notification could not be added!',
        error: 'Bad Request'
      });
    }
  }

  @Get()
  findAll() {
    return this.notificationService.findAllNotifs();
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
