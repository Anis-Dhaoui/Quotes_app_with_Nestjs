import { NotificationService } from './../../../notification/notification.service';
import { QuoteService } from './../../../quote/quote.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private quoteService: QuoteService, private notificationService: NotificationService) { }

  async canActivate(context: ExecutionContext) {

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const params = request.params;

    if (params.userId) {
      return user._id == params.userId || user.role == 'Admin';

    }

    if (params.quoteId) {
      const quote = await this.quoteService.findOne(params.quoteId);
      return quote.owner == user._id || user.role == 'Admin';
    }

    if (params.notifId) {
      const notification = await this.notificationService.findOneNotif(params.notifId, user);
      return notification.reciever.toString() == user._id.toString();
    }

    return true;
  }
}
