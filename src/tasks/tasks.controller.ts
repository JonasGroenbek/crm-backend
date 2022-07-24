import {
  Controller,
  Get,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/identity/guards/jwt.guard';
import { API_PREFIX } from './constants';
import { GetManyTaskDto } from './dto/get-many.dto';
import { TaskService } from './tasks.service';

@Controller(API_PREFIX)
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  getMany(
    @Query(
      new ValidationPipe({
        expectedType: GetManyTaskDto,
        transform: true,
      }),
    )
    query: GetManyTaskDto,
  ) {
    return this.taskService.getMany(query);
  }
}
