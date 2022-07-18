import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseException } from 'src/exceptions/response-exception';
import { Repository } from 'typeorm';
import { Identity } from './identity.entity';
import * as bcrypt from 'bcrypt';
import { AuthenticateDTO } from './dto/authenticate.dto';
import { TSC_DB_CONFIG } from 'src/config/typeorm';
import { SignUpDTO } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { JWTPayloadDTO } from './dto/jwt-payload.dto';
@Injectable()
export class IdentityService {
  constructor(
    @InjectRepository(Identity, TSC_DB_CONFIG.name)
    private readonly identityRepository: Repository<Identity>,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate({ email, password }: AuthenticateDTO): Promise<Identity> {
    const identity = await this.identityRepository.findOne({
      where: { email: email.trim().toLowerCase() },
    });
    if (!identity) {
      throw new ResponseException(
        'Could not find the user',
        HttpStatus.NOT_FOUND,
      );
    }
    const match = await bcrypt.compare(password.trim(), identity.password);
    if (!match) {
      throw new ResponseException(
        'Could not match the user',
        HttpStatus.BAD_REQUEST,
      );
    }
    return identity;
  }

  async signToken(userId: number) {
    const JWTPayload = new JWTPayloadDTO(userId);
    const accesToken = await this.jwtService.signAsync({
      ...Object.assign(JWTPayload),
    });
    return accesToken;
  }

  async createIdentity({ email, password }: SignUpDTO) {
    const confictingIdentity = await this.identityRepository.findOne({
      where: { email },
    });
    if (confictingIdentity) {
      throw new ResponseException(
        'The identity already exists',
        HttpStatus.CONFLICT,
      );
    }
    const identity = this.identityRepository.create();
    identity.email = email.trim().toLowerCase();
    identity.password = password.trim();
    return this.identityRepository.save(identity);
  }
}
