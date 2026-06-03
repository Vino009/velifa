import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import configuration, { validate } from './config/configuration';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { AnalysesModule } from './analyses/analyses.module';
import { PaymentsModule } from './payments/payments.module';
import { GlobalExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate,
      cache: true,
    }),
    ThrottlerModule.forRoot([
      { name: 'short',  ttl: 60_000,    limit: 10  },
      { name: 'medium', ttl: 3_600_000, limit: 30  },
      { name: 'daily',  ttl: 86_400_000, limit: 100 },
    ]),
    PrismaModule,
    RedisModule,
    AnalysesModule,
    PaymentsModule,
  ],
  providers: [
    { provide: APP_FILTER,      useClass: GlobalExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
  ],
})
export class AppModule {}
