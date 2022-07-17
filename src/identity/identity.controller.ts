import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { API_PREFIX } from './constants';
import { AuthenticateDTO } from './dto/authenticate.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { IdentityService } from './identity.service';

@Controller(API_PREFIX)
export class IdController {
  constructor(private readonly IdentityService: IdentityService) {}

  @Post('authenticate')
  @UseGuards(LocalAuthGuard)
  async login(@Body() body: AuthenticateDTO) {
    return await this.IdentityService.authenticate(body);
  }
}
