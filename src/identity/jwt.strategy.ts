import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { IdentityService } from './identity.service';
import { JWTPayloadDTO } from './dto/jwt-payload.dto';
import { Identity } from './identity.entity';
import { ResponseException } from 'src/exceptions/response-exception';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly IdentityService: IdentityService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(
    payload: JWTPayloadDTO,
    done: (error: Error, user: Identity) => void,
  ) {
    const user = await this.userService.getById(payload.sub);
    if (!user) {
      return (
        new ResponseException(
          'Could not validate user',
          HttpStatus.BAD_REQUEST,
        ),
        null
      );
    }
    return done(null, user);
  }
}
