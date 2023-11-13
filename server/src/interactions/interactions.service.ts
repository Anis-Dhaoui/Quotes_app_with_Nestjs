import { IQuote } from './../quote/entities/quote.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class InteractionsService {
  constructor(@InjectModel('Quote') public quoteModel: Model<IQuote>) { }

  async likeDislikeQ(quoteId: ObjectId, userId: ObjectId) {

    const quote = await this.quoteModel.findById(quoteId);

    if (!quote) {
      throw new NotFoundException(`Quote #${quoteId} not found`);
    }

    // if the user already liked the quote then it will dislike it, if it's clicked again
    if (quote.likedBy.includes(userId)) {
      await this.quoteModel.findByIdAndUpdate(quoteId, { $pull: { likedBy: userId } }, { new: true });
      return "Unliked"
    } else {
      await this.quoteModel.findByIdAndUpdate(quoteId, { $addToSet: { likedBy: userId } }, { new: true });
      return "Liked"
    }
  }

  async findAll() {
    return `This action returns all interactions`;
  }
}
