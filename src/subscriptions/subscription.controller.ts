import {
  Controller,
  Get,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/identity/guards/jwt.guard';
import { API_PREFIX } from './constants';
import { GetManySubscriptionDto } from './dto/get-many.dto';
import { SubscriptionService } from './subscription.service';

@Controller(API_PREFIX)
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getMany(
    @Query(
      new ValidationPipe({
        expectedType: GetManySubscriptionDto,
        transform: true,
      }),
    )
    query: GetManySubscriptionDto,
  ) {
    return this.subscriptionService.getMany(query);
  }
}
