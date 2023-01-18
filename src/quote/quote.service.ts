import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { Model } from 'mongoose';
import { IQuote } from './entities/quote.entity';

@Injectable()
export class QuoteService {
  constructor(@InjectModel('Quote') public quoteModel: Model<IQuote>) { }


  async create(createQuoteDto: CreateQuoteDto): Promise<IQuote> {
    const newQuote = await new this.quoteModel(createQuoteDto);
    return newQuote.save();
  }

  async findAll(): Promise<IQuote[]> {
    const quoteData = await this.quoteModel.find().exec();
    if (!quoteData || quoteData.length == 0) {
      throw new NotFoundException('Quotes data not found!');
    }
    return quoteData;
  }

  async findOne(quoteId: string): Promise<IQuote> {
    const quote = await this.quoteModel.findById(quoteId).populate('owner');
    if (!quote) {
      throw new NotFoundException(`Quote #${quoteId} not found`);
    }
    return quote;
  }

  async update(quoteId: string, updateQuoteDto: UpdateQuoteDto): Promise<IQuote> {
    const quote = await this.quoteModel.findByIdAndUpdate(quoteId, updateQuoteDto, { new: true });
    if (!quote) {
      throw new NotFoundException(`Quote #${quoteId} not found`);
    }
    return quote;
  }

  async remove(quoteId: string): Promise<IQuote> {
    const deletedQuote = await this.quoteModel.findByIdAndDelete(quoteId);
    if (!deletedQuote) {
      throw new NotFoundException(`Quote #${quoteId} not found`);
    }
    return deletedQuote;
  }
}
