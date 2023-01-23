import { InjectModel } from '@nestjs/mongoose';
import { INotification } from './entities/notification.entity';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Model } from 'mongoose';

@Injectable()
export class NotificationService {
  constructor(@InjectModel('Notification') public notifModel: Model<INotification>) { }

  async createNotif(createNotificationDto: CreateNotificationDto): Promise<INotification> {
    const notif = await new this.notifModel(createNotificationDto);
    return notif.save();
  }

  async findAllNotifs(): Promise<INotification[]> {

    const notifData = await this.notifModel.find().exec();

    if (!notifData || notifData.length == 0) {
      throw new NotFoundException('There is no notifications');
    }
    return notifData;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
