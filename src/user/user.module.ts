import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { QuestionModule } from 'src/question/question.module';
import { AnswerModule } from 'src/answer/answer.module';
import { AiSessionModule } from 'src/ai-session/ai-session.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name:"User",schema:UserSchema}]),
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: process.env.ACCESS_TOKEN_SECRET,
        signOptions: { expiresIn: '1d' }
      })
    }),
    QuestionModule,
    AnswerModule,
    AiSessionModule,
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
