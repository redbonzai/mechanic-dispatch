import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { StripeModule } from '../../infrastructure/payments/stripe/stripe.module';
import { RequestsService } from '../../application/requests/requests.service';
import { RequestsController } from '../../interfaces/http/requests.controller';
import { StripeWebhookController } from '../../interfaces/http/stripe-webhook.controller';
import {
  SERVICE_REQUEST_REPOSITORY,
  ServiceRequestRepository,
} from '../../domain/requests/repositories/service-request.repository';
import {
  MECHANIC_WORK_LOG_REPOSITORY,
  MechanicWorkLogRepository,
} from '../../domain/requests/repositories/mechanic-work-log.repository';
import { PrismaServiceRequestRepository } from '../../infrastructure/requests/prisma-service-request.repository';
import { PrismaMechanicWorkLogRepository } from '../../infrastructure/requests/prisma-mechanic-work-log.repository';

@Module({
  imports: [DatabaseModule, StripeModule],
  controllers: [RequestsController, StripeWebhookController],
  providers: [
    RequestsService,
    {
      provide: SERVICE_REQUEST_REPOSITORY,
      useClass: PrismaServiceRequestRepository,
    },
    {
      provide: MECHANIC_WORK_LOG_REPOSITORY,
      useClass: PrismaMechanicWorkLogRepository,
    },
  ],
  exports: [RequestsService],
})
export class RequestsModule {}

