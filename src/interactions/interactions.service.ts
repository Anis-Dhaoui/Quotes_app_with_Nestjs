import { IQuote } from './../quote/entities/quote.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class InteractionsService {
  constructor(@InjectModel('Quote') public quoteModel: Model<IQuote>) { }

  async likeQ(quoteId: ObjectId, userId: ObjectId) {
    const likedQuote = await this.quoteModel.findByIdAndUpdate(quoteId, { $addToSet: { likedBy: userId } }, { new: true });
    if (!likedQuote) {
      throw new NotFoundException(`Quote #${quoteId} not found`);
    }
    return likedQuote;
  }

  async findAll() {
    return `This action returns all interactions`;
  }

}
