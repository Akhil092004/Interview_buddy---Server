import { Module } from '@nestjs/common';
import { AiSessionService } from './ai-session.service';
import { AiSessionSchema } from './schemas/ai-session.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    MongooseModule.forFeature([{name:'AiSession',schema:AiSessionSchema}])
  ],
  providers: [AiSessionService],
  exports : [AiSessionService]
})
export class AiSessionModule {}
