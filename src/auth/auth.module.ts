import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './../users/schema/user.schema';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport/dist';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '7d' },
    })
  ],

  controllers: [AuthController],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule { }
