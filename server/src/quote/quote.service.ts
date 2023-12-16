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

    const docCount = await this.quoteModel.countDocuments({ status: 'allowed' });

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

  // async findAllByUsersInterests(interests, query): Promise<any> {
  //   console.log("PAGE: ", query.page)
  //   console.log("LIMIT: ", query.limit)
  //   let quoteData = await this.quoteModel.find(
  //     query.category ?
  //       { category: query.category, status: 'allowed' }
  //       :
  //       { status: 'allowed' }
  //   ).exec();
  //   quoteData.sort((a, b) => (interests.includes(a.category)) ? -1 : 0);
  //   const page = quoteData.slice(query.page, query.limit);
  //   const docCount = await this.quoteModel.countDocuments({ status: 'allowed' });
  //   if (!quoteData || quoteData.length == 0) {
  //     throw new NotFoundException('Quotes data not found!');
  //   }

  //   return { page, docCount };
  // }

  async findAllByUsersInterests(interests, query): Promise<any> {
    console.log(interests, query)
    let quoteData = await this.quoteModel.aggregate([
      { $match: { status: "allowed", category: { $in: interests } } },
      {
        $addFields: {
          "sort-key": {
            $cond: {
              if: { $in: ["$category", interests] },
              then: {
                $add: [
                  { $indexOfArray: [interests, "$category"] },
                  { $multiply: [{ $rand: {} }, 10] }// Multiply by a random number to add randomness
                ]
              },
              else: 9999// Assign a high value to categories not in the desired order
            }
          }
        }
      },
      { $sort: { "createdAt": -1,  "sort-key": 1} }, // Sort based on the custom order with randomness
      { $unset: ["sort-key"] }, // Remove the added field after sorting
      {
        $skip: +query.page // Skip the first 5 documents
      },
      {
        $limit: +query.limit // Limit to 10 documents
      }
    ])

    const docCount = await this.quoteModel.countDocuments({ status: 'allowed', category: { $in: interests } });
    return { quoteData, docCount };
  }

  // async findAllByUsersInterests(interests, query): Promise<any> {
  //   console.log(interests, query);

  //   // Find quotes that match the given interests and status
  //   const quoteData = await this.quoteModel.find(
  //     { status: "allowed", category: { $in: interests } }
  //   );

  //   // Sort the retrieved quotes based on the specified custom order with randomness
  //   quoteData.sort((a, b) => {
  //     const indexA = interests.indexOf(a.category);
  //     const indexB = interests.indexOf(b.category);

  //     // If both categories are in the interests array, sort based on the custom order with randomness
  //     if (indexA !== -1 && indexB !== -1) {
  //       const randomA = indexA + Math.random() * 10;
  //       const randomB = indexB + Math.random() * 10;
  //       return randomA - randomB;
  //     }

  //     // Categories not in the desired order get a higher value for sorting
  //     if (indexA === -1) return 1;
  //     if (indexB === -1) return -1;

  //     return 0;
  //   });

  //   // Count the documents that match the criteria
  //   const docCount = await this.quoteModel.countDocuments({
  //     status: 'allowed',
  //     category: { $in: interests }
  //   });

  //   return { quoteData, docCount };
  // }



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
