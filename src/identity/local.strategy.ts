import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { IdentityService } from './identity.service';

/**
 * When this strategy is as a decorator for a function, it takes the fields specified in the
 * constructor. It will then return the type
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly IdentityService: IdentityService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string) {
    return await this.IdentityService.login({
      email,
      password,
    });
  }
}
