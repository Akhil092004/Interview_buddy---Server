import { Module } from '@nestjs/common';
import { AiSessionService } from './ai-session.service';
import { AiSessionSchema } from './schemas/ai-session.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AiSessionController } from './ai-session.controller';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'AiSession',schema:AiSessionSchema}])
  ],
  providers: [AiSessionService],
  exports : [AiSessionService],
  controllers: [AiSessionController]
})
export class AiSessionModule {}
