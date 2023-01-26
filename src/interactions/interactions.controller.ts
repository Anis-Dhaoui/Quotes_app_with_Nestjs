import { OwnerGuard } from './../auth/RBAC/verify-owner/owner.guard';
import { RoleGuard } from './../auth/RBAC/verify-admin/roles.guard';
import { Roles } from './../auth/RBAC/verify-admin/roles.decorator';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { InteractionsService } from './interactions.service';

@Controller('interactions')
export class InteractionsController {
  constructor(private readonly interactionsService: InteractionsService) { }

  @UseGuards(JwtAuthGuard)
  @Post(':quoteId')
  likeQuote(@Param('quoteId') quoteId: string) {
    return this.interactionsService.findOne(+quoteId);
  }

  @Roles('Admin', 'User')
  @UseGuards(JwtAuthGuard, RoleGuard, OwnerGuard)
  @Get()
  findAll() {
    return this.interactionsService.findAll();
  }

}
