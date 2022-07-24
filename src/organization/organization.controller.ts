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
import { GetManyOrganizationsDto } from './dto/get-many.dto';
import { OrganizationService } from './organization.service';

@Controller(API_PREFIX)
@UseGuards(JwtAuthGuard)
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getMany(
    @Query(
      new ValidationPipe({
        expectedType: GetManyOrganizationsDto,
        transform: true,
      }),
    )
    query: GetManyOrganizationsDto,
  ) {
    return this.organizationService.getMany(query);
  }

  @Get(`:id`)
  @UseGuards(JwtAuthGuard)
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.organizationService.getById(id);
  }
}
