import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    QuestionModule, 
    AnswerModule, 
    AuthModule, 
    MongooseModule.forRoot(process.env.MONGODB_URI ?? ''), UserModule, // Ensure proper fallback
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
