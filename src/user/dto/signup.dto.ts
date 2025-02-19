
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    password: string;
}