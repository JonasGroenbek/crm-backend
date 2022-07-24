import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ResponseException } from 'src/exceptions/response-exception';
import { Tenant } from 'src/tenant/tenant.entity';
import { TenantService } from 'src/tenant/tenant.service';
import { JWTPayloadDto } from './dto/jwt-payload.dto';
import { Identity } from './identity.entity';
import { IdentityService } from './identity.service';

/**
 * This is the definition of passport.authenticate from passport source code line 12.
 * So basically, passport.authenticate is a middleware it will do the data extraction
 * and then bind data into req.user.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly identityService: IdentityService,
    private readonly tenantService: TenantService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret'),
    });
  }

  async validate(
    payload: JWTPayloadDto,
    done: (error: Error, identity: Identity, tenant: Tenant) => void,
  ) {
    if (!payload) {
      return (
        new ResponseException('Invalid token', HttpStatus.BAD_REQUEST), null
      );
    }
    const identity = await this.identityService.getById(payload.sub);
    if (!identity) {
      return (
        new ResponseException(
          'Could not validate identity',
          HttpStatus.BAD_REQUEST,
        ),
        null
      );
    }
    const tenant = await this.tenantService.getById(payload.tenantId);
    if (!tenant) {
      return (
        new ResponseException(
          'Could not validate tenant',
          HttpStatus.BAD_REQUEST,
        ),
        null
      );
    }
    if (identity.tenantId !== tenant.id) {
      return (
        new ResponseException(
          'Could not validate identies tenant',
          HttpStatus.BAD_REQUEST,
        ),
        null
      );
    }

    return done(null, identity, tenant);
  }
}
