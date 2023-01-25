import { QuoteService } from './../quote/quote.service';
import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

}
