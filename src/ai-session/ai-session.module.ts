import { Module } from '@nestjs/common';
import { AiSessionService } from './ai-session.service';

@Module({
  providers: [AiSessionService]
})
export class AiSessionModule {}
