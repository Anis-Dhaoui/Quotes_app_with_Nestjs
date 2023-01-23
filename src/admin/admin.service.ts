import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IQuote } from './../quote/entities/quote.entity';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';


@Injectable()
export class AdminService {
  constructor(@InjectModel('Quote') private quoteModel: Model<IQuote>) { }

  async findAll(query: any): Promise<IQuote[]> {
    Logger.log(query.category);

    const pageOpts = {
      page: query.page || 0,
      limit: query.limit || 5
    }

    const quoteData = await this.quoteModel.find(query.category ? { category: query.category } : {})
      .sort({ createdAt: -1 })
      .skip(pageOpts.page * pageOpts.limit)
      .limit(pageOpts.limit)
      .exec();

    if (!quoteData || quoteData.length == 0) {
      throw new NotFoundException('Quotes data not found!');
    }
    return quoteData;
  }

}
