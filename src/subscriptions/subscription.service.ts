import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { APP_DB_CONFIG } from 'src/config/typeorm.config';
import { Repository } from 'typeorm';
import { GetManySubscriptionDto } from './dto/get-many.dto';
import { Subscription } from './subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription, APP_DB_CONFIG.name)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  async getById(id: number) {
    return this.subscriptionRepository.findOne({ where: { id } });
  }

  async getMany({ limit = 50, offset = 0 }: GetManySubscriptionDto): Promise<{
    count: number;
    subscriptions: Subscription[];
  }> {
    const query =
      this.subscriptionRepository.createQueryBuilder('subscription');

    query.skip(offset);
    query.take(limit);

    const [subscriptions, count] = await query.getManyAndCount();

    return {
      count: count,
      subscriptions,
    };
  }
}
