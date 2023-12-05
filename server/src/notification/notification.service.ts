import { InjectModel } from '@nestjs/mongoose';
import { INotification } from './entities/notification.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Model, Query, ObjectId } from 'mongoose';

@Injectable()
export class NotificationService {
  constructor(@InjectModel('Notification') public notifModel: Model<INotification>) { }

  async createNotif(createNotificationDto: CreateNotificationDto): Promise<INotification> {
    const notif = await new this.notifModel(createNotificationDto);
    return notif.save();
  }

  async findAllNotifs(query: any, user: any): Promise<INotification[]> {
    const pageOpts = {
      page: query.page,
      limit: query.limit
    }

    const notifData = await this.notifModel.aggregate([
      { $match: { reciever: user._id } },
      { $sort: { createdAt: -1 } },
      { $skip: pageOpts.page * pageOpts.limit },
      { $limit: +pageOpts.limit },
      { $sort: { read: 1 } },
      {
        $lookup: {
          from: 'users',
          localField: 'sender',
          foreignField: '_id',
          as: 'user',
          pipeline: [{ $project: { _id: 0, firstName: 1, lastName: 1, userPic: 1 } }]
        }
      },
      {
        $project:
          user.role == 'Admin' ?
            { sender: 0, reciever: 0, context: 0, updatedAt: 0, __v: 0 } :
            { sender: 0, reciever: 0, context: 0, updatedAt: 0, __v: 0, user: 0 }
      }
    ])

    if (!notifData || notifData.length == 0) {
      throw new NotFoundException('There is no notifications');
    }
    return notifData;
  }

  async findOneNotif(notifId: ObjectId, user: any): Promise<INotification> {
    const isAdmin = user.role == 'Admin';
    const quote = await this.notifModel.findByIdAndUpdate(notifId, { read: true }, { new: true })
      .populate(
        isAdmin ? 'context sender' : 'context',
        '-interests -email -role -owner -likedBy -updatedAt -__v'
      );
    if (!quote) {
      throw new NotFoundException(`Notification #${notifId} not found`);
    }
    return quote;
  }

  async removeNotif(notifId: ObjectId) {
    const deletedNotif = await this.notifModel.findByIdAndDelete(notifId);
    if (!deletedNotif) {
      throw new NotFoundException(`Notification #${notifId} not found`);
    }
    return deletedNotif;
  }
}
