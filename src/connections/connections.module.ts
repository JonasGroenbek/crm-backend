import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm';
import { ConnectionsController } from './connections.controller';
import { Connections } from './connections.entity';
import { ConnectionsService } from './connections.service';

@Module({
  imports: [TypeOrmModule.forFeature([Connections], APP_DB_CONFIG.name)],
  controllers: [ConnectionsController],
  providers: [ConnectionsService],
  exports: [ConnectionsService],
})
export class ConnectionsModule {}
