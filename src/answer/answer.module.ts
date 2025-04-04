import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswerSchema } from './schemas/answer.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:"Answer",schema:AnswerSchema}])
  ],
  providers: [AnswerService],
  controllers: [AnswerController]
})
export class AnswerModule {}
