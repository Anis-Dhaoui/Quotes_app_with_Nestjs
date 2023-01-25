import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { User } from "src/users/schema/user.schema";
import { STATUS } from '../enum/status.enum';
import { INTERESTS } from "src/users/enum/interests.enum";

@Schema({ timestamps: true })
export class Quote {
    @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
    owner: User;

    @Prop()
    author: string;

    @Prop()
    authorPic: string;

    @Prop()
    quote: string;

    @Prop()
    category: INTERESTS;

    @Prop({ default: STATUS.PENDING, type: String, enum: STATUS })
    status;

    @Prop([{ type: mongoose.Types.ObjectId, ref: 'User' }])
    likedBy: [User]
}
export const QuoteSchema = SchemaFactory.createForClass(Quote);
// Condition for author and quote (together) must be unique 
QuoteSchema.index({ author: 1, quote: 1 }, { unique: true });
