import { STATUS } from './../enum/status.enum';
import { IsEmpty, IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ObjectId } from "mongoose";
import { INTERESTS } from "src/users/enum/interests.enum";

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

    @IsEmpty()
    readonly status: string;
}
