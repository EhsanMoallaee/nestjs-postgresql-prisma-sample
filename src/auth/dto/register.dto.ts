import { IsEmail, IsNotEmpty, IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class RegisterDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    fullname: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    balance: number;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}