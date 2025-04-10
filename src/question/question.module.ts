import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionSchema } from './schemas/question.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:"Question",schema:QuestionSchema}])
  ],
  providers: [QuestionService],
  controllers: [QuestionController],
  exports:[QuestionService]
})
export class QuestionModule {}
