import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
export class CreateQuoteDto {
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