import { ArrayMinSize, IsArray, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength, Validate } from "class-validator";
import { INTERESTS } from "../enum/interests.enum";

export class CreateUserDto {
    @IsString()
    @MaxLength(15)
    @IsNotEmpty()
    readonly firstName: string;

    @IsString()
    @MaxLength(15)
    @IsNotEmpty()
    readonly lastName: string;

    @IsString()
    @MaxLength(40)
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    readonly userPic: string;

    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly password: string;

    // "each" tells class-validator to run the validation on each item of the array
    @IsArray()
    @IsEnum(INTERESTS, { each: true })
    @ArrayMinSize(1)
    readonly interests: INTERESTS[];
}
