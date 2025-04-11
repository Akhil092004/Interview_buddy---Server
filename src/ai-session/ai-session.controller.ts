import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserGuard } from 'src/user/user.guard';
import { AiSessionService } from './ai-session.service';
import { createSessionDto } from './dto';

@Controller('ai-session')
export class AiSessionController {

    constructor(private readonly aiSessionService: AiSessionService) {}

    @UseGuards(UserGuard)
    @Post('add-session')
    async addSession(dto : createSessionDto) {
        return await this.aiSessionService.addAiSession(dto);
    }

    @UseGuards(UserGuard)
    @Get('get-session/:id')
    async getSession(@Param() param:{id:string}) {
        return await this.aiSessionService.getAiSessionById(param.id);
    }

    @UseGuards(UserGuard)
    @Get('get-sessions-by-user/:userId')
    async getSessionsByUser(@Param() param:{userId:string}) {
        return await this.aiSessionService.getSessionsByUserId(param.userId);
    }








}
