import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { APP_DB_CONFIG } from 'src/config/typeorm';
import { ResponseException } from 'src/exceptions/response-exception';
import { Tenant } from 'src/tenant/tenant.entity';
import { EntityManager, Repository } from 'typeorm';
import { SALT_ROUNDS } from './constants';
import { AuthenticateDTO } from './dto/authenticate.dto';
import { JWTPayloadDTO } from './dto/jwt-payload.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import { Identity } from './identity.entity';
@Injectable()
export class IdentityService {
  constructor(
    @InjectRepository(Identity, APP_DB_CONFIG.name)
    private readonly identityRepository: Repository<Identity>,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: AuthenticateDTO): Promise<Identity> {
    const identity = await this.identityRepository.findOne({
      where: { email: email.trim().toLowerCase() },
      relations: ['tenant'],
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

  async getById(identityId: number) {
    return this.identityRepository.findOne({ where: { id: identityId } });
  }

  async signToken(userId: number, tenantId: number) {
    const JWTPayload = new JWTPayloadDTO(userId, tenantId);
    const accesToken = await this.jwtService.signAsync({
      ...Object.assign(JWTPayload),
    });
    return accesToken;
  }

  async createIdentity({ email, password }: SignUpDTO) {
    return this.identityRepository.manager.transaction(
      async (transaction: EntityManager) => {
        const identityRepository = transaction.getRepository(Identity);
        const tenantRepository = transaction.getRepository(Tenant);
        const confictingIdentity = await this.identityRepository.findOne({
          where: { email },
        });
        if (confictingIdentity) {
          throw new ResponseException(
            'The identity already exists',
            HttpStatus.CONFLICT,
          );
        }
        const tenantEntity = tenantRepository.create();
        const tenant = await tenantRepository.save(tenantEntity);
        const identity = identityRepository.create();
        identity.tenantId = tenant.id;
        identity.email = email.trim().toLowerCase();
        const hash = await bcrypt.hash(password.trim(), SALT_ROUNDS);
        identity.password = hash;
        return identityRepository.save(identity);
      },
    );
  }
}
