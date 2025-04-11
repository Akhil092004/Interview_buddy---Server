import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswerSchema } from './schemas/answer.schema';
import { AiModule } from 'src/ai/ai.module';
import { QuestionModule } from 'src/question/question.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name:"Answer",schema:AnswerSchema}]),
    AiModule,
    QuestionModule
  ],
  providers: [AnswerService],
  controllers: [AnswerController],
  exports : [AnswerService]
})
export class AnswerModule {}
