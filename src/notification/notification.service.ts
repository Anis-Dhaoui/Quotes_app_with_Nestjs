import { InjectModel } from '@nestjs/mongoose';
import { INotification } from './entities/notification.entity';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Model, Query, ObjectId } from 'mongoose';

@Injectable()
export class NotificationService {
  constructor(@InjectModel('Notification') public notifModel: Model<INotification>) { }

  async createNotif(createNotificationDto: CreateNotificationDto): Promise<INotification> {
    const notif = await new this.notifModel(createNotificationDto);
    return notif.save();
  }

  async findAllNotifs(query: any, userId: ObjectId): Promise<INotification[]> {
    const pageOpts = {
      page: query.page,
      limit: query.limit
    }
    const notifData = await this.notifModel.find({ reciever: userId })
      .populate('sender', '-interests -email -role -owner -likedBy -updatedAt -_id -__v')
      .sort({ createdAt: -1 })
      .skip(pageOpts.page * pageOpts.limit)
      .limit(pageOpts.limit)
      .exec();

    if (!notifData || notifData.length == 0) {
      throw new NotFoundException('There is no notifications');
    }
    return notifData;
  }

  async findOneNotif(notifId: ObjectId) {
    const quote = await this.notifModel.findById(notifId)
      .populate('context sender', '-interests -email -role -owner -likedBy -updatedAt -__v');
    if (!quote) {
      throw new NotFoundException(`Notification #${notifId} not found`);
    }
    return quote;
  }

  remove(notifId: number) {
    return `This action removes a #${notifId} notification`;
  }
}
