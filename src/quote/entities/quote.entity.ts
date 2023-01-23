import { STATUS } from './../enum/status.enum';
import { Document, ObjectId } from 'mongoose';
import { INTERESTS } from 'src/users/enum/interests.enum';

export interface IQuote extends Document {
    readonly owner: ObjectId;
    readonly author: string;
    readonly authorPic: string;
    readonly quote: string;
    readonly category: INTERESTS;
    readonly status: STATUS;
    readonly likedBy: [ObjectId];
}