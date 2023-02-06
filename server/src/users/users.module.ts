import { UserSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, Global } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]) // 3. Setup the mongoose module to use the User schema
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
