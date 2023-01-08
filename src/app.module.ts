import { QuotesService } from './quotes/quotes.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuoteSchema } from './quotes/quote.schema';
import { QuotesController } from './quotes/quotes.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://quotes_user:KbLfBjdIQGtvsbFw@cluster0.7ivjqle.mongodb.net/?retryWrites=true&w=majority',
      { dbName: 'quotes' }
    ),
    MongooseModule.forFeature([
      { name: 'Quote', schema: QuoteSchema }
    ]),
    UsersModule,
  ],
  controllers: [AppController, QuotesController],
  providers: [AppService, QuotesService],
})
export class AppModule { }
