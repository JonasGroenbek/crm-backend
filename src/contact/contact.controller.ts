import {
  Controller,
  Get,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/identity/guards/jwt.guard';
import { API_PREFIX } from './constants';
import { ContactService } from './contact.service';
import { GetManyContactsDto } from './dto/get-many.dto';

@Controller(API_PREFIX)
@UseGuards(JwtAuthGuard)
export class ContactController {
  constructor(private readonly contactService: ContactService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  getMany(
    @Query(
      new ValidationPipe({
        expectedType: GetManyContactsDto,
        transform: true,
      }),
    )
    query: GetManyContactsDto,
  ) {
    return this.contactService.getMany(query);
  }
}
