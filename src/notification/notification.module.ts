import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from './schema/notification.schema';
import { Module, Global } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }]) // 3. Setup the mongoose module to use the User schema
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [
    NotificationService,
    MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }])
  ]
})
export class NotificationModule { }
