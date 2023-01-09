import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateQuoteDto {

    @IsString()
    @IsNotEmpty()
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

    @IsString()
    @MaxLength(20)
    @IsNotEmpty()
    readonly category: string;
}
