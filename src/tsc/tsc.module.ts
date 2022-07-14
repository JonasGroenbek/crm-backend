import { Module } from '@nestjs/common';
import { TscController } from './tsc.controller';
import { TscService } from './tsc.service';

@Module({
  controllers: [TscController],
  providers: [TscService],
  exports: [TscService],
})
export class TscModule {}
