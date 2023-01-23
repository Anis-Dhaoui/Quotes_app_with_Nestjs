import { INTERESTS } from '../enum/interests.enum';
import { ROLES } from '../enum/roles.enum';
import { Document } from 'mongoose';

export interface IUser extends Document {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
    readonly userPic: string;
    readonly interests: INTERESTS[];
    readonly role: ROLES;
}
