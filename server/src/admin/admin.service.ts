import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { IQuote } from './../quote/entities/quote.entity';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';


@Injectable()
export class AdminService {
  constructor(@InjectModel('Quote') private quoteModel: Model<IQuote>) { }

  async allowDenyQuote(quoteId: ObjectId, query: any): Promise<IQuote> {
    const quote = await this.quoteModel.findByIdAndUpdate(quoteId, { status: query.status }, { new: true })
    if (!quote) {
      throw new NotFoundException(`Quote #${quoteId} not found`);
    }
    return quote;
  }

}
