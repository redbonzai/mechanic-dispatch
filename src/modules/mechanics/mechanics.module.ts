import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { MechanicsService } from '../../application/mechanics/mechanics.service';
import { MechanicsController, ReviewsController } from '../../interfaces/http/mechanics.controller';
import { AdminController } from '../../interfaces/http/admin.controller';
import {
  MECHANIC_REPOSITORY,
  MechanicRepository,
} from '../../domain/mechanics/repositories/mechanic.repository';
import {
  REVIEW_REPOSITORY,
  ReviewRepository,
} from '../../domain/mechanics/repositories/review.repository';
import {
  SKILL_REPOSITORY,
  SkillRepository,
} from '../../domain/mechanics/repositories/skill.repository';
import { PrismaMechanicRepository } from '../../infrastructure/mechanics/prisma-mechanic.repository';
import { PrismaReviewRepository } from '../../infrastructure/mechanics/prisma-review.repository';
import { PrismaSkillRepository } from '../../infrastructure/mechanics/prisma-skill.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [MechanicsController, ReviewsController, AdminController],
  providers: [
    MechanicsService,
    {
      provide: MECHANIC_REPOSITORY,
      useClass: PrismaMechanicRepository,
    },
    {
      provide: REVIEW_REPOSITORY,
      useClass: PrismaReviewRepository,
    },
    {
      provide: SKILL_REPOSITORY,
      useClass: PrismaSkillRepository,
    },
  ],
  exports: [MechanicsService],
})
export class MechanicsModule {}

