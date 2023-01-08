import { Document } from 'mongoose';
import { INTERESTS } from '../schema/interests.enum';

export interface IUser extends Document {
    readonly firsName: string;
    readonly lastName: string;
    readonly email: string;
    readonly userPic: string;
    readonly interests: INTERESTS[];
}
