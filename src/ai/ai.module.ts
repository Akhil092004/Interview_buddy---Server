import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import OpenAI from 'openai';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports : [ConfigModule],
  providers: [AiService,
    {
      provide:OpenAI,
      useFactory: (configService : ConfigService) =>{
        new OpenAI({apiKey: configService.getOrThrow<string>('OPENAI_API_KEY')});
      },
      inject: [ConfigService]
    }
  ],
  controllers: [AiController],
  exports : [AiService]
})
export class AiModule {}
