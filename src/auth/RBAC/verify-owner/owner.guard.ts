import { QuoteService } from './../../../quote/quote.service';
import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private quoteService: QuoteService) { }

  async canActivate(context: ExecutionContext) {

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const params = request.params;

    if (params.userId) {
      return user._id == params.userId;
    }

    if (params.quoteId) {
      const quote = await this.quoteService.findOne(params.quoteId);
      return quote.owner == user._id
    }

    return true;
  }
}
