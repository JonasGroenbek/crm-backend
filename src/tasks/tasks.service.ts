import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task, APP_DB_CONFIG.name)
    private readonly leads: Repository<Task>,
  ) {}
}
