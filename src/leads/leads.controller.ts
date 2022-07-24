import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/identity/guards/jwt.guard';
import { API_PREFIX } from './constants';
import { GetManyLeadDto } from './dto/get-many.dto';
import { LeadService } from './leads.service';

@Controller(API_PREFIX)
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getMany(
    @Query(
      new ValidationPipe({
        expectedType: GetManyLeadDto,
        transform: true,
      }),
    )
    query: GetManyLeadDto,
  ) {
    return this.leadService.getMany(query);
  }

  @Get(`:id`)
  @UseGuards(JwtAuthGuard)
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.leadService.getById(id);
  }
}
