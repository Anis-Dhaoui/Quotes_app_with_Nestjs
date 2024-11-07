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

    const quoteData = await this.quoteModel.aggregate([
      {
        $match: {
          status: 'allowed',
          ...(query.category ? { category: query.category } : {})
        }
      },

      { $sort: { createdAt: -1 } },
      { $skip: +pageOpts.page },
      { $limit: +pageOpts.limit },

      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'quoteOwner',
          pipeline: [{ $project: { _id: 0, firstName: 1, lastName: 1, userPic: 1 } }]
        }
      }
    ]);
    
    const docCount = await this.quoteModel.countDocuments({ status: 'allowed' });

    if (!quoteData || quoteData.length == 0) {
      throw new NotFoundException('Quotes data not found!');
    }
    return { quoteData, docCount };
  }


  async findMostPopularQuotes(): Promise<any> {
    let popularQuotes = await this.quoteModel
      .aggregate([
        { $match: { status: "allowed" } },
        { $addFields: { "likedByCount": { $size: '$likedBy' } } },
        { $sort: { "likedByCount": -1, "createdAt": -1 } },
        { $limit: 15 }
      ])

    return popularQuotes;
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

  async findAllByUsersInterests(interests, query): Promise<any> {
    let quoteData = await this.quoteModel.aggregate([
      { $match: { status: "allowed" } },
      {
        $addFields: {
          "sort-key": {
            $cond: {
              if: { $in: ["$category", interests] },
              then: 0, // Assign a lower value for matching categories
              else: 1   // Assign a higher value for non-matching categories
            }
          }
        }
      },
      { $sort: { "sort-key": 1, "createdAt": -1, "_id": 1 } }, // Sort based on the custom order with randomness
      { $unset: ["sort-key", "__v"] }, // Remove the added field after sorting
      {
        $skip: +query.page // Skip the first 5 documents
      },
      {
        $limit: +query.limit // Limit to 10 documents
      }
    ])

    const docCount = await this.quoteModel.countDocuments({ status: 'allowed' });
    return { quoteData, docCount };
  }



  // $$$$$$$$$$$$$$$ THIS IS TO LOWERCASE CATEGORIES (exp: from "LIFE" to "life") $$$$$$$$$$$$$$$
  // async findAllByUsersInterests(interests, query): Promise<any> {
  //   let quoteData = await this.quoteModel.updateMany(
  //     {},
  //     [{ $set: { category: { $toLower: "$category" } } }],
  //     { multi: true }
  //   )
  //     .then((result) => {
  //       console.log("Categories updated successfully:", result);
  //     })
  //     .catch((error) => {
  //       console.error("Error updating categories:", error);
  //     });;
  //     return quoteData
  // }

  // $$$$$$$$$$$$$$$ THIS IS TO CONVERT THE FIRST LETTER OF CATEGORIES TO UPPERCASE (exp: from "life" to "Life") $$$$$$$$$$$$$$$
  // async findAllByUsersInterests(interests, query): Promise<any> {
  //   let quoteData = await this.quoteModel.updateMany(
  //     {},
  //     [
  //       {
  //         $set: {
  //           category: {
  //             $concat: [
  //               { $toUpper: { $substrCP: ["$category", 0, 1] } },
  //               { $substrCP: ["$category", 1, { $subtract: [{ $strLenCP: "$category" }, 1] }] }
  //             ]
  //           }
  //         }
  //       }
  //     ]
  //   )
  //     return quoteData
  // }

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