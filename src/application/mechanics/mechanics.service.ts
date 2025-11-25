import { Inject, Injectable } from '@nestjs/common';
import {
  CreateMechanicData,
  MECHANIC_REPOSITORY,
  MechanicRepository,
  UpdateMechanicData,
} from '../../domain/mechanics/repositories/mechanic.repository';
import {
  CreateReviewData,
  FindReviewsParams,
  REVIEW_REPOSITORY,
  ReviewRepository,
  UpdateReviewData,
} from '../../domain/mechanics/repositories/review.repository';
import {
  SKILL_REPOSITORY,
  SkillRepository,
} from '../../domain/mechanics/repositories/skill.repository';

@Injectable()
export class MechanicsService {
  constructor(
    @Inject(MECHANIC_REPOSITORY)
    private readonly mechanicRepository: MechanicRepository,
    @Inject(REVIEW_REPOSITORY)
    private readonly reviewRepository: ReviewRepository,
    @Inject(SKILL_REPOSITORY)
    private readonly skillRepository: SkillRepository,
  ) {}

  async getMechanic(id: string) {
    return this.mechanicRepository.findById(id);
  }

  async getMechanicBySlug(slug: string) {
    return this.mechanicRepository.findBySlug(slug);
  }

  async getMechanics(isActive?: boolean) {
    return this.mechanicRepository.findMany({ isActive });
  }

  async getReviews(params: FindReviewsParams) {
    return this.reviewRepository.findMany(params);
  }

  async getReviewStats(mechanicId?: string) {
    return this.reviewRepository.getStats({ mechanicId });
  }

  async createMechanic(data: CreateMechanicData) {
    return this.mechanicRepository.create(data);
  }

  async updateMechanic(id: string, data: UpdateMechanicData) {
    return this.mechanicRepository.update(id, data);
  }

  async deleteMechanic(id: string) {
    return this.mechanicRepository.delete(id);
  }

  async createReview(data: CreateReviewData) {
    return this.reviewRepository.create(data);
  }

  async updateReview(id: string, data: UpdateReviewData) {
    return this.reviewRepository.update(id, data);
  }

  async deleteReview(id: string) {
    return this.reviewRepository.delete(id);
  }

  async getSkills() {
    return this.skillRepository.findMany();
  }
}

