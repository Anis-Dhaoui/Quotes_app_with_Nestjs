import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { INTERESTS } from "./interests.enum";

@Schema()
export class User {
    @Prop()
    firstName: string;
    @Prop()
    lastName: string;
    @Prop({ unique: true })
    email: string;
    @Prop()
    userPic: string;
    @Prop()
    interests: INTERESTS[];
}
export const UserSchema = SchemaFactory.createForClass(User);