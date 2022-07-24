import {
  Controller,
  Get,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/identity/guards/jwt.guard';
import { API_PREFIX } from './constants';
import { DealService } from './deals.service';
import { GetManyDealDto } from './dto/get-many.dto';

@Controller(API_PREFIX)
@UseGuards(JwtAuthGuard)
export class DealController {
  constructor(private readonly dealService: DealService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  getMany(
    @Query(
      new ValidationPipe({
        expectedType: GetManyDealDto,
        transform: true,
      }),
    )
    query: GetManyDealDto,
  ) {
    return this.dealService.getMany(query);
  }
}
