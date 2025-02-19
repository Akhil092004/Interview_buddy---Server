

import { Body, Controller,Post, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionDto } from './dto';
import { UserGuard } from 'src/user/user.guard';
import { Question } from './schemas/question.schema';

@Controller('question')
export class QuestionController {
    constructor(private QuestionService:QuestionService){}

    @UseGuards(UserGuard)
    @Post()
    async createQuestion(@Body() dto:QuestionDto) : Promise<Question>{
        return await this.QuestionService.createQuestion(dto);
    }
    


}
