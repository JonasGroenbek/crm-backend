import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppendIdentity } from 'src/decorators/user.decorator';
import { ResponseException } from 'src/exceptions/response-exception';
import { API_PREFIX } from './constants';
import { SignUpDTO } from './dto/sign-up.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';
import { Identity } from './identity.entity';
import { IdentityService } from './identity.service';

@Controller(API_PREFIX)
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@AppendIdentity() identity: Identity) {
    return await {
      identity,
      jwt: await this.identityService.signToken(identity.id, identity.tenantId),
    };
  }

  @Get('authenticate')
  @UseGuards(JwtAuthGuard)
  async authenticate(@AppendIdentity() identity: Identity) {
    if (!identity) {
      throw new ResponseException(
        'Could not authenticate identity',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return {
      identity,
      jwt: await this.identityService.signToken(identity.id, identity.tenantId),
    };
  }

  @Post('sign-up')
  async signUp(@Body() body: SignUpDTO) {
    const identity = await this.identityService.createIdentity(body);
    return {
      identity,
      jwt: await this.identityService.signToken(identity.id, identity.tenantId),
    };
  }
}
