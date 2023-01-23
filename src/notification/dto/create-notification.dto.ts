import { ObjectId } from 'mongoose';
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateNotificationDto {
    @IsNotEmpty()
    sender: ObjectId;

    @IsNotEmpty()
    reciever: ObjectId;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    context: ObjectId;

    @IsNotEmpty()
    @IsBoolean()
    read: boolean;
}
