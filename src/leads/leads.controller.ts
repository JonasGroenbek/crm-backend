import {
  Controller,
  Get,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/identity/guards/jwt.guard';
import { API_PREFIX } from './constants';
import { GetManyLeadDTO } from './dto/get-many.dto';
import { LeadService } from './leads.service';

@Controller(API_PREFIX)
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getMany(
    @Query(
      new ValidationPipe({
        expectedType: GetManyLeadDTO,
        transform: true,
      }),
    )
    query: GetManyLeadDTO,
  ) {
    return this.leadService.getMany(query);
  }
}
