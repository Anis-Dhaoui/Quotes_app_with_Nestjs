import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';

@Controller('quotes')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) { }

  @Post()
  async create(@Res() response, @Body() createQuoteDto: CreateQuoteDto) {
    try {
      const newQuote = await this.quoteService.create(createQuoteDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Quote has been created successfully',
        quote: newQuote,
      });
    } catch (err) {
      if (err.errors && err.errors['owner.0'].reason.path == "owner") {
        return response.status(HttpStatus.NOT_FOUND).json({
          statusCode: 404,
          message: 'Error: User does not exist!',
          error: 'Not Found'
        });
      }
      if (err && err.code == 11000 && err.keyPattern.author == 1) {
        return response.status(HttpStatus.CONFLICT).json({
          statusCode: 409,
          message: `Error: The same quote of '${err.keyValue.author}' is already exists`,
          error: 'Conflict'
        })
      }
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Quote could not be added!',
        error: 'Bad Request'
      });
    }
  }

  @Get()
  async findAll(@Res() response) {
    try {
      const quotesData = await this.quoteService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'All quotes data found successfully', quotesData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get(':quoteId')
  async findOne(@Res() response, @Param('quoteId') quoteId: string) {
    try {
      const existingQuote = await
        this.quoteService.findOne(quoteId);
      return response.status(HttpStatus.OK).json({
        message: 'Quote found successfully', existingQuote,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put(':quoteId')
  async update(@Res() response, @Param('quoteId') quoteId: string, @Body() updateQuoteDto: UpdateQuoteDto) {
    try {
      const existingQuote = await this.quoteService.update(quoteId, updateQuoteDto);
      return response.status(HttpStatus.OK).json({
        message: 'Quote has been successfully updated',
        existingQuote,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete(':quoteId')
  async remove(@Res() response, @Param('quoteId') quoteId: string) {
    try {
      const deletedQuote = await this.quoteService.remove(quoteId);
      return response.status(HttpStatus.OK).json({
        message: 'Quote deleted successfully',
        deletedQuote,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}