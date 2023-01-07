import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Quote {
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