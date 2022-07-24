import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm.config';
import { TaskController } from './tasks.controller';
import { Task } from './tasks.entity';
import { TaskService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task], APP_DB_CONFIG.name)],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
