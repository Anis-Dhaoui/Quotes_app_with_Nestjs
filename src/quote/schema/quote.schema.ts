import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { INTERESTS } from "src/users/schema/interests.enum";
import { User } from "src/users/schema/user.schema";

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
}
export const QuoteSchema = SchemaFactory.createForClass(Quote);
QuoteSchema.index({ author: 1, quote: 1 }, { unique: true });
