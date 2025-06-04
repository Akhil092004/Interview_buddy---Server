import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { UserModule } from './user/user.module';
import { AiModule } from './ai/ai.module';
import { AiSessionModule } from './ai-session/ai-session.module';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true, expandVariables:true }),
    QuestionModule, 
    AnswerModule, 
    MongooseModule.forRoot(process.env.MONGODB_URI ?? ''), UserModule, AiModule, AiSessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
