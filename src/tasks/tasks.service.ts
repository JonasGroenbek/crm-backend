import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm.config';
import { Repository } from 'typeorm';
import { GetManyTaskDto } from './dto/get-many.dto';
import { Task } from './tasks.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task, APP_DB_CONFIG.name)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getMany({
    limit = 50,
    offset = 0,
  }: GetManyTaskDto): Promise<{ count: number; tasks: Task[] }> {
    const query = this.taskRepository.createQueryBuilder('task');

    query.skip(offset);
    query.take(limit);

    const [tasks, count] = await query.getManyAndCount();

    return {
      count: count,
      tasks,
    };
  }
}
