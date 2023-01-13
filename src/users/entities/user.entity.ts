import { Document } from 'mongoose';
import { INTERESTS } from '../schema/interests.enum';

export interface IUser extends Document {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
    readonly userPic: string;
    readonly interests: INTERESTS[];
}
