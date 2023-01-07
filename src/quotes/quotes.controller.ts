import { UpdateQuoteDto } from './dto/update-quote.dto';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { QuotesService } from './quotes.service';

@Controller('quotes')
export class QuotesController {
    constructor(private readonly quoteService: QuotesService) { }

    @Post()
    async createQuote(@Res() response, @Body() createQuoteDto: CreateQuoteDto) {
        try {
            const newQuote = await this.quoteService.createQuote(createQuoteDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Student has been created successfully',
                newQuote,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Quote not created!',
                error: 'Bad Request'
            });
        }
    }

    @Put('/:id')
    async updateQuote(@Res() response, @Param('id') quoteId: string,
        @Body() updateQuoteDto: UpdateQuoteDto) {
        try {
            const existingQuote = await this.quoteService.updateQuote(quoteId, updateQuoteDto);
            return response.status(HttpStatus.OK).json({
                message: 'Quote has been successfully updated',
                existingQuote,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get()
    async getQuotes(@Res() response) {
        try {
            const quotesData = await this.quoteService.getAllQuotes();
            return response.status(HttpStatus.OK).json({
                message: 'All quotes data found successfully', quotesData,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id')
    async getQuote(@Res() response, @Param('id') quoteId: string) {
        try {
            const existingQuote = await
                this.quoteService.getQuote(quoteId);
            return response.status(HttpStatus.OK).json({
                message: 'Quote found successfully', existingQuote,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('/:id')
    async deleteQuote(@Res() response, @Param('id') quoteId: string) {
        try {
            const deletedQuote = await this.quoteService.deleteQuote(quoteId);
            return response.status(HttpStatus.OK).json({
                message: 'Quote deleted successfully',
                deletedQuote,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

}