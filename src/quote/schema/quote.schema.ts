import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { User } from "src/users/schema/user.schema";
@Schema()
export class Quote {
    @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'User' }] })
    owner: User;

    @Prop()
    author: string;
    @Prop()
    authorPic: string;
    @Prop()
    quote: string;
    @Prop()
    category: string;
}
export const QuoteSchema = SchemaFactory.createForClass(Quote);