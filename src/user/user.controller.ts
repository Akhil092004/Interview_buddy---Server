
import { Body, Controller, Get, HttpCode, Param, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { SigninDto, SignupDto } from './dto';
import { User } from './schemas/user.schema';
import { UserGuard } from './user.guard';
// import { Question } from 'src/question/interface/question.interface';


@Controller('users')
export class UserController {
    constructor(private readonly UserService: UserService){}

    @Post('signup')
    async signup(@Body() dto: SignupDto): Promise<User> {
        return await this.UserService.signup(dto);
    }

    @Post('signin')
    @HttpCode(200)
    async signin(@Body() dto: SigninDto, @Res({ passthrough: true }) res: Response): Promise<{message:string}> {

        const { accessToken } = await this.UserService.signin(dto);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return { message: 'Login successful' };
    }

    @UseGuards(UserGuard)
    @Get('profile')
    async getProfile(@Request() req: { user: {sub:string} }): Promise<any> {
        return await this.UserService.getProfile(req.user.sub);
    }

    @UseGuards(UserGuard)
    @Get('marked-questions-with-answers')
    async getMarkedQuestionsWithAnswers(@Request() req: { user: {sub:string} }) : Promise<any[]> {
        return await this.UserService.getMarkedQuestions(req.user.sub);
    }
    
    @UseGuards(UserGuard)
    @Post('mark-question/:id')
    async markQuestion(@Request() req:{user : {sub:string}},@Param('id') id:string) : Promise<User>{
        return await this.UserService.markQuestion(id,req.user.sub);
    }

    @UseGuards(UserGuard)
    @Post('updateCreds')
    async updateCredits(
        @Request() req: { user: { sub: string } },
        @Body('value') value: number,
    ): Promise<User> {
        return await this.UserService.updateCredits(req.user.sub, value);
    }

}
