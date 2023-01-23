import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from './schema/notification.schema';
import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }]) // 3. Setup the mongoose module to use the User schema
  ],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule { }
