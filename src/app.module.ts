import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { UserModule } from './user/user.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    QuestionModule, 
    AnswerModule, 
    MongooseModule.forRoot(process.env.MONGODB_URI ?? ''), UserModule, AiModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
