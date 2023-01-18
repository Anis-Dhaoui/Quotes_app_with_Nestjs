import { INTERESTS } from './../../users/schema/interests.enum';
import { IsEmpty, IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateQuoteDto {

    readonly owner: ObjectId;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly author: string;

    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly authorPic: string;

    @IsString()
    @MaxLength(300)
    @IsNotEmpty()
    readonly quote: string;

    @IsEnum(INTERESTS)
    @MaxLength(20)
    @IsNotEmpty()
    readonly category: string;
}
