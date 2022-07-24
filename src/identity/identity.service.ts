import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { APP_DB_CONFIG } from 'src/config/typeorm.config';
import { ResponseException } from 'src/exceptions/response-exception';
import { Tenant } from 'src/tenant/tenant.entity';
import { EntityManager, Repository } from 'typeorm';
import { SALT_ROUNDS } from './constants';
import { AuthenticateDto } from './dto/authenticate.dto';
import { JWTPayloadDto } from './dto/jwt-payload.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Identity } from './identity.entity';
import * as moment from 'moment';
import { StripeCustomerService } from 'src/stripe/stripe-customer.service';
import { GetManyIdentitiesDto } from './dto/get-many.dto';

@Injectable()
export class IdentityService {
  constructor(
    @InjectRepository(Identity, APP_DB_CONFIG.name)
    private readonly identityRepository: Repository<Identity>,
    private readonly jwtService: JwtService,
    private readonly stripeCustomerService: StripeCustomerService,
  ) {}

  async login({ email, password }: AuthenticateDto): Promise<Identity> {
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

  async getMany({
    limit = 50,
    offset = 0,
  }: GetManyIdentitiesDto): Promise<{ count: number; identities: Identity[] }> {
    const query = this.identityRepository.createQueryBuilder('identity');

    query.skip(offset);
    query.take(limit);

    const [identities, count] = await query.getManyAndCount();

    return {
      count: count,
      identities,
    };
  }

  async signToken(userId: number, tenantId: number) {
    const JWTPayload = new JWTPayloadDto(userId, tenantId);
    const accesToken = await this.jwtService.signAsync({
      ...Object.assign(JWTPayload),
    });
    return accesToken;
  }

  async createIdentity({ email, password }: SignUpDto) {
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
        tenantEntity.trialPeriodEnd = moment().add(14, 'days').toDate();
        const tenant = await tenantRepository.save(tenantEntity);
        const identityEntity = identityRepository.create();
        identityEntity.tenantId = tenant.id;
        identityEntity.email = email.trim().toLowerCase();
        const hash = await bcrypt.hash(password.trim(), SALT_ROUNDS);
        identityEntity.password = hash;
        const identity = await identityRepository.save(identityEntity);
        await this.stripeCustomerService.createCustomer({
          email: identity.email,
        });
        return identity;
      },
    );
  }
}
