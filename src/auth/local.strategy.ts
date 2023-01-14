import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(email: string, password: string): Promise<any> {
        console.log("xxxxxxxxxxxxxxxxxxxxxjjjjjjjjjjjjjjjjjjjjjjjjjjj")
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            Logger.log('infooooooooooooooooooooooooooooooooooooooooooooo')

            throw new UnauthorizedException({}, "waaaaaaaaaaaaaaaaaaaaa");
        }
        return user;
    }
}