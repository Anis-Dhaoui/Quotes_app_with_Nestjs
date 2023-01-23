import { Quote } from './../../quote/schema/quote.schema';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { User } from "src/users/schema/user.schema";

@Schema({ timestamps: true })
export class Notification {
    @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
    sender: User;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
    reciever: User;

    @Prop()
    title: string;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'Quote' })
    context: Quote;

    @Prop({ default: false })
    read: boolean;
}
export const NotificationSchema = SchemaFactory.createForClass(Notification);