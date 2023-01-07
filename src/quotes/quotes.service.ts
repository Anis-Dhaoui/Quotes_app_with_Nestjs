import { UpdateQuoteDto } from './dto/update-quote.dto';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Model } from 'mongoose';
import { IQuote } from './quote.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class QuotesService {
    constructor(@InjectModel('Quote') private quoteModel: Model<IQuote>) { }

    async createQuote(createQuoteDto: CreateQuoteDto): Promise<IQuote> {
        const newQuote = await new this.quoteModel(createQuoteDto);
        return newQuote.save();
    }

    async updateQuote(quoteId: string, updateQuoteDto: UpdateQuoteDto): Promise<IQuote> {
        const existingQuote = await this.quoteModel.findByIdAndUpdate(quoteId, updateQuoteDto, { new: true });
        if (!existingQuote) {
            throw new NotFoundException(`Quote #${quoteId} not found`);
        }
        return existingQuote;
    }

    async getAllQuotes(): Promise<IQuote[]> {
        const quoteData = await this.quoteModel.find();
        if (!quoteData || quoteData.length == 0) {
            throw new NotFoundException('Quotes data not found!');
        }
        return quoteData;
    }

    async getQuote(quoteId: string): Promise<IQuote> {
        const existingQuote = await this.quoteModel.findById(quoteId).exec();
        if (!existingQuote) {
            throw new NotFoundException(`Quote #${quoteId} not found`);
        }
        return existingQuote;
    }

    async deleteQuote(quoteId: string): Promise<IQuote> {
        const deletedQuote = await this.quoteModel.findByIdAndDelete(quoteId);
        if (!deletedQuote) {
            throw new NotFoundException(`Quote #${quoteId} not found`);
        }
        return deletedQuote;
    }

}
