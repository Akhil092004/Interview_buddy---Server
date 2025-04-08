

import { Body, Controller,Delete,Get,Param,Post, Query, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { createQuestionDto } from './dto';
import { UserGuard } from './../user/user.guard';
import { Question } from './schemas/question.schema';

@Controller('question')
export class QuestionController {
    constructor(private QuestionService:QuestionService){}

    @UseGuards(UserGuard)
    @Post()
    async createQuestion( @Body() dto:createQuestionDto ) : Promise<Question>{
        return await this.QuestionService.createQuestion(dto);
    }

    @UseGuards(UserGuard)
    @Get()
    async getQuestions(@Query() dto:{topic:string,diffifulty?:string}) {
        return await this.QuestionService.getQuestions(dto);
    }

    @UseGuards(UserGuard)
    @Get(':id')
    async getQuestionById(@Param() param:{id:string}){
        return await this.QuestionService.getQuestionById(param.id);
    }

    @UseGuards(UserGuard)
    @Delete(':id')
    async deleteQuestion(@Param() param:{id:string}){
        return await this.QuestionService.deleteQuestion(param.id);
    }

}
