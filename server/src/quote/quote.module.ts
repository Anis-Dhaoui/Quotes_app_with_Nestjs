import { MongooseModule } from '@nestjs/mongoose';
import { Module, Global, Scope } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { QuoteSchema } from './schema/quote.schema';
import { TempData } from './tempData';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Quote', schema: QuoteSchema }]) // Setup the mongoose module to use the User schema
  ],
  controllers: [QuoteController],
  providers: [QuoteService,
    {
      provide: TempData,
      useClass: TempData,
      // scope: Scope.REQUEST,
    },
  ],
  exports: [
    QuoteService,
    MongooseModule.forFeature([{ name: 'Quote', schema: QuoteSchema }]),

  ]
})
export class QuoteModule { }
