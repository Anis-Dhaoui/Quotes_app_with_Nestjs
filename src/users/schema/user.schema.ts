import { ROLES } from './roles.enum';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { INTERESTS } from "./interests.enum";
import * as bcrypt from 'bcrypt';

@Schema()
export class User {
    @Prop({ required: true })
    firstName: string;
    @Prop({ required: true })
    lastName: string;
    @Prop({ unique: true, required: true })
    email: string;
    @Prop({ required: true })
    password: string;
    @Prop({ required: true })
    userPic: string;
    @Prop({ required: true })
    interests: INTERESTS[];
    @Prop({ default: ROLES.User })
    role: ROLES;
}
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next: (err?: Error) => void) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashed = await bcrypt.hash(this['password'], 10);
        this['password'] = hashed;
        return next();
    } catch (err) {
        return next(err);
    }
});