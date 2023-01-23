import { QuoteService } from './../quote/quote.service';
import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }


  @Get('/')
  async findAll(@Res() res, @Query() query) {

    try {
      const quotesData = await this.adminService.findAll(query);
      return res.status(HttpStatus.OK).json({
        message: 'All quotes data found successfully', quotesData,
      });
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }

}
