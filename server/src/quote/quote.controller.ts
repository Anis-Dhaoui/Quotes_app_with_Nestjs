import { NotificationService } from './../notification/notification.service';
import { OwnerGuard } from './../auth/RBAC/verify-owner/owner.guard';
import { RoleGuard } from './../auth/RBAC/verify-admin/roles.guard';
import { Roles } from './../auth/RBAC/verify-admin/roles.decorator';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Controller, Get, Post, Body, Param, Delete, Res, HttpStatus, Put, UseGuards, Req, Query } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
var ObjectId = require('mongoose').Types.ObjectId;

@Controller('quotes')
export class QuoteController {
  constructor(
    private readonly quoteService: QuoteService,
    private readonly notificationService: NotificationService
  ) { }

  // $$$$$$$$$$$$$$$$$$$$$$ AUTHENTICATED USER CAN POST NEW QUOTE $$$$$$$$$$$$$$$$$$$$$$
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Res() response, @Req() req, @Body() createQuoteDto: CreateQuoteDto) {
    (createQuoteDto.owner as any) = req.user._id;
    try {
      const newQuote = await this.quoteService.create(createQuoteDto);

      // Send notification to the ADMIN in order to review this quote
      await this.notificationService.createNotif({
        sender: req.user._id,
        reciever: ObjectId(process.env.ADMIN_ID), //Admin ID
        title: `${req.user.firstName} ${req.user.lastName} added new quote`,
        context: ObjectId(newQuote._id)
      })

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

  // $$$$$$$$$$$$$$$$$$$$$$ EVERYONE CAN FETCH ALL ALLOWED QUOTES $$$$$$$$$$$$$$$$$$$$$$
  @Get('/')
  async findAll(@Res() res, @Query() query) {
    try {
      const quotesData = await this.quoteService.findAll(query);
      const data = quotesData.quoteData;
      const count = quotesData.docCount;
      return res.status(HttpStatus.OK).json({
        message: 'All quotes data found successfully', quotesData: data, docCount: count
      });
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }

  // $$$$$$$$$$$$$$$$$$$$$$ GET THE MOST POPULAR AND RECENT QUOTES FOR HEADER SLIDE SHOW $$$$$$$$$$$$$$$$$$$$$$
  @Get('/popular-quotes')
  async findMostPopularQuotes(@Res() res) {
    try {
      const result = await this.quoteService.findMostPopularQuotes()
      return res.status(HttpStatus.OK).json({
        message: 'Popular quotes fetched successfully',
        popularQuotes: result
      })
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }

  // $$$$$$$$$$$$$$$$$$$$$$ EVERYONE CAN VISIT ALLOWED QUOTE DETAIL $$$$$$$$$$$$$$$$$$$$$$
  @Get('/detail/:quoteId')
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

  // $$$$$$$$$$$$$$$$$$$$$$ USER CAN UPDATE HIS OWN QUOTE (ADMIN has this privelge as well) $$$$$$$$$$$$$$$$$$$$$$
  @Roles('Admin', 'User')
  @UseGuards(JwtAuthGuard, RoleGuard, OwnerGuard)
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

  // $$$$$$$$$$$$$$$$$$$$$$ USER CAN REMOVE HIS OWN QUOTE (ADMIN has this privelge as well) $$$$$$$$$$$$$$$$$$$$$$
  @Roles('Admin', 'User')
  @UseGuards(JwtAuthGuard, RoleGuard, OwnerGuard)
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

  // $$$$$$$$$$$$$$$$$$$$$$$ SORT QUOTES ACCORDING TO USER INTERESTS $$$$$$$$$$$$$$$$$$$$$$$
  @UseGuards(JwtAuthGuard)
  @Get('/interests')
  async findByInterests(@Res() res, @Req() req, @Query() query) {

    try {
      const quotesData = await this.quoteService.findAllByUsersInterests(req.user.interests, query);
      const data = quotesData.quoteData;
      const count = quotesData.docCount;
      return res.status(HttpStatus.OK).json({
        message: 'All quotes data found successfully', quotesData: data, docCount: count
      });
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }

  // $$$$$$$$$$$$$$$$$$$$$$ USERS CAN SEARCH FOR QUOTES BY AUTHOR NAME $$$$$$$$$$$$$$$$$$$$$$
  @Get('/search')
  async searchByAuthor(@Res() res, @Req() req, @Query() query) {
    try {
      const quotesData = await this.quoteService.findByAuthor(query);
      return res.status(HttpStatus.OK).json({
        message: 'All quotes data found successfully', quotesData,
      });
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }

  // $$$$$$$$$$$$$$$$$$$$$$ EVERY USER CAN FETCH HIS OWN QUOTES EITHER ALLOWED, DENIED OR PENDING $$$$$$$$$$$$$$$$$$$$$$
  @Roles('User')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/myquotes')
  async getMyQuotes(@Res() res, @Req() req) {
    try {
      const myQuotes = await this.quoteService.findMyQuotes(req.user._id);
      return res.status(HttpStatus.OK).json({
        message: 'All your quotes data fetched successfully', myQuotes,
      });
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }
}
