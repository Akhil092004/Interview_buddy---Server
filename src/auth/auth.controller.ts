import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto';


@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signup")
    signup(@Body () dto:SignupDto): { message: string } {

        return this.authService.signup(dto);
    }


    @Post("signin")
    signin(): { message: string } {
        return this.authService.signin();
    }


}