import { HttpStatus, Injectable } from '@nestjs/common';
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
    private readonly identityService: IdentityService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret'),
    });
  }

  async validate(
    payload: JWTPayloadDTO,
    done: (error: Error, identity: Identity) => void,
  ) {
    if (!payload) {
      return (
        new ResponseException('Invalid token', HttpStatus.BAD_REQUEST), null
      );
    }
    console.log('payload', payload);
    const identity = await this.identityService.getById(payload.sub);
    console.log(identity);
    if (!identity) {
      return (
        new ResponseException(
          'Could not validate user',
          HttpStatus.BAD_REQUEST,
        ),
        null
      );
    }
    return done(null, identity);
  }
}
