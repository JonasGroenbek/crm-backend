import {
  Controller,
  Get,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/identity/guards/jwt.guard';
import { API_PREFIX } from './constants';
import { DocumentService } from './documents.service';
import { GetManyDocumentDto } from './dto/get-many.dto';

@Controller(API_PREFIX)
@UseGuards(JwtAuthGuard)
export class DocumentController {
  constructor(private readonly documentsService: DocumentService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getMany(
    @Query(
      new ValidationPipe({
        expectedType: GetManyDocumentDto,
        transform: true,
      }),
    )
    query: GetManyDocumentDto,
  ) {
    return this.documentsService.getMany(query);
  }
}
