import { IQuote } from './../quote/entities/quote.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class InteractionsService {
  constructor(@InjectModel('Quote') public quoteModel: Model<IQuote>) { }


  findAll() {
    return `This action returns all interactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} interaction`;
  }

}
