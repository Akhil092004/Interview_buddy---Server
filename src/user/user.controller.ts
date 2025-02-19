
import { Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { SigninDto, SignupDto } from './dto';
import { User } from './schemas/user.schema';
import { UserGuard } from './user.guard';


@Controller('users')
export class UserController {
    constructor(private readonly UserService: UserService){}

    @Post('signup')
    async signup(@Body() dto: SignupDto): Promise<User> {
        return await this.UserService.signup(dto);
    }


    @Post('signin')
    async singin(@Body() dto:SigninDto):Promise<{accessToken:string}>{
        return await this.UserService.signin(dto);
    }

    @UseGuards(UserGuard)
    @Get('profile')
    getProfile(@Request() req) : {message:string} {
        console.log(req.user);
        return this.UserService.getProfile();
    }

}
