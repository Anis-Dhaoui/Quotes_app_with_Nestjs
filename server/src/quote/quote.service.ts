import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { Model, ObjectId } from 'mongoose';
import { IQuote } from './entities/quote.entity';

@Injectable()
export class QuoteService {
  constructor(@InjectModel('Quote') public quoteModel: Model<IQuote>) { }


  async create(createQuoteDto: CreateQuoteDto): Promise<IQuote> {
    const newQuote = await new this.quoteModel(createQuoteDto);
    return newQuote.save();
  }

  async findAll(query: any): Promise<any> {

    const pageOpts = {
      page: query.page,
      limit: query.limit
    }

    const quoteData = await this.quoteModel.find(query.category ? { category: query.category, status: 'allowed' } : { status: 'allowed' })
      .sort({ createdAt: -1 })
      .skip(pageOpts.page)
      .limit(pageOpts.limit)
      .exec();

    const docCount = await this.quoteModel.countDocuments({status: 'allowed'});

    if (!quoteData || quoteData.length == 0) {
      throw new NotFoundException('Quotes data not found!');
    }
    return { quoteData, docCount };
  }

  async findOne(quoteId: string): Promise<IQuote> {
    const quote = await this.quoteModel.findById(quoteId).populate('owner likedBy', 'firstName lastName userPic');
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

  async findAllByUsersInterests(interests, query): Promise<IQuote[]> {
    let quoteData = await this.quoteModel.find().exec();
    quoteData.sort((a, b) => (interests.includes(a.category)) ? -1 : 0);
    const page = quoteData.slice((query.page - 1) * query.limit, query.page * query.limit);

    if (!quoteData || quoteData.length == 0) {
      throw new NotFoundException('Quotes data not found!');
    }

    return page;
  }

  async findByAuthor(query): Promise<IQuote[]> {
    const regex = new RegExp(query.author, 'i') // i for case insensitive
    let data = await this.quoteModel.find({ author: { $regex: regex } });

    if (!data || data.length == 0) {
      throw new NotFoundException('Quotes data not found!');
    }

    return data;
  }

  async findMyQuotes(userId: ObjectId): Promise<IQuote[]> {

    const myQuotesData = await this.quoteModel
      .find({ owner: userId }, ['-owner', '-__v'])
      .sort({ 'createdAt': -1, 'status': 1 });

    if (!myQuotesData || myQuotesData.length == 0) {
      throw new NotFoundException('You have no Quotes yet');
    }
    return myQuotesData;
  }
}
