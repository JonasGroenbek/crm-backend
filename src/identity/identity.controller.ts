import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AppendIdentity } from 'src/decorators/user.decorator';
import { API_PREFIX } from './constants';
import { SignUpDTO } from './dto/sign-up.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { Identity } from './identity.entity';
import { IdentityService } from './identity.service';

@Controller(API_PREFIX)
export class IdentityController {
  constructor(private readonly IdentityService: IdentityService) {}

  @Post('authenticate')
  @UseGuards(LocalAuthGuard)
  async login(@AppendIdentity() identity: Identity) {
    return await {
      identity,
      jwt: await this.IdentityService.signToken(identity.id),
    };
  }

  @Post('sign-up')
  async signUp(@Body() body: SignUpDTO) {
    const identity = await this.IdentityService.createIdentity(body);
    return {
      identity,
      jwt: await this.IdentityService.signToken(identity.id),
    };
  }
}
