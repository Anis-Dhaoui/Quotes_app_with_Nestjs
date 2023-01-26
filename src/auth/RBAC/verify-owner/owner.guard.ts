import { NotificationService } from './../../../notification/notification.service';
import { QuoteService } from './../../../quote/quote.service';
import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private quoteService: QuoteService, private notificationService: NotificationService) { }

  async canActivate(context: ExecutionContext) {

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const params = request.params;

    if (params.userId) {
      Logger.log(user._id == params.userId || user.role == 'Admin');
      return user._id == params.userId || user.role == 'Admin';

    }

    if (params.quoteId) {
      const quote = await this.quoteService.findOne(params.quoteId);
      Logger.warn(quote.owner)
      return quote.owner == user._id || user.role == 'Admin';
    }

    if (params.notifId) {
      const notification = await this.notificationService.findOneNotif(params.notifId, user);
      Logger.warn(notification.reciever.toString() == user._id.toString())
      return notification.reciever.toString() == user._id.toString();
    }

    return true;
  }
}
