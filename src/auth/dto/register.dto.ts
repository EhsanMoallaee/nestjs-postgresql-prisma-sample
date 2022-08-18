import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RegisterDto {

    @IsString()
    @IsNotEmpty()
    fullname: string;

    @IsNumber()
    @IsInt()
    @IsNotEmpty()
    balance: number;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}