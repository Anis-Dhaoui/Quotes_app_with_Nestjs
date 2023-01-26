import { ObjectId } from 'mongoose';
import { OwnerGuard } from './../auth/RBAC/verify-owner/owner.guard';
import { RoleGuard } from './../auth/RBAC/verify-admin/roles.guard';
import { Roles } from './../auth/RBAC/verify-admin/roles.decorator';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Controller, Get, Post, Param, UseGuards, Res, Req, HttpStatus } from '@nestjs/common';
import { InteractionsService } from './interactions.service';

@Controller('interactions')
export class InteractionsController {
  constructor(private readonly interactionsService: InteractionsService) { }

  @UseGuards(JwtAuthGuard)
  @Post(':quoteId')
  async likeQuote(@Param('quoteId') quoteId: ObjectId, @Res() res, @Req() req) {
    try {
      const likedQuote = await this.interactionsService.likeDislikeQ(quoteId, req.user._id);
      return res.status(HttpStatus.OK).json({
        message: 'Inrerraction has been performed successfully!', likedQuote,
      });
    } catch (err) {
      return res.status(err.status).json(err.response);
    }
  }

  @Roles('Admin', 'User')
  @UseGuards(JwtAuthGuard, RoleGuard, OwnerGuard)
  @Get()
  findAll() {
    return this.interactionsService.findAll();
  }

}
