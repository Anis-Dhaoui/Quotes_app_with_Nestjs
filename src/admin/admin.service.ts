import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IQuote } from './../quote/entities/quote.entity';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';


@Injectable()
export class AdminService {
  constructor(@InjectModel('Quote') private quoteModel: Model<IQuote>) { }

  async allowDenyQuote(query: Object) {

  }

}
