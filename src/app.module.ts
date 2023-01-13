import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { QuoteModule } from './quote/quote.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI, { dbName: 'quotesDB' }),
    UsersModule,
    QuoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
