import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { QuoteSchema } from './schema/quote.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Quote', schema: QuoteSchema }]) // 3. Setup the mongoose module to use the User schema
  ],
  controllers: [QuoteController],
  providers: [QuoteService]
})
export class QuoteModule { }
