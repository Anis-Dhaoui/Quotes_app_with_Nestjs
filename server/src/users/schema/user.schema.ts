import { ROLES } from '../enum/roles.enum';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import * as bcrypt from 'bcrypt';
import { INTERESTS } from '../enum/interests.enum';

@Schema()
export class User {
    @Prop({ required: true })
    firstName: string;
    @Prop({ required: true })
    lastName: string;
    @Prop({ unique: true, required: true })
    email: string;
    @Prop({ required: true, select: false })
    password: string;
    @Prop({ required: false })
    userPic: string;
    @Prop({ required: true })
    interests: INTERESTS[];
    @Prop({ default: ROLES.User, immutable: true })
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