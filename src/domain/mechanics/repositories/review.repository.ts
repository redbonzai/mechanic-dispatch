import { Review } from '../entities/review.entity';

export interface FindReviewsParams {
  mechanicId?: string;
  rating?: number;
  serviceDescription?: string;
  vehicleMake?: string;
  limit?: number;
  offset?: number;
  sortBy?: 'newest' | 'oldest' | 'highest' | 'lowest' | 'relevance';
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
}

export interface CreateReviewData {
  rating: number;
  reviewerName: string;
  reviewerLocation: string;
  reviewText: string;
  carModel: string;
  carYear: number;
  serviceDescription: string;
  mechanicId: string;
  serviceRequestId?: string | null;
  photoUrls?: string[];
}

export interface UpdateReviewData extends Partial<CreateReviewData> {}

export abstract class ReviewRepository {
  abstract findMany(params: FindReviewsParams): Promise<Review[]>;
  abstract findById(id: string): Promise<Review | null>;
  abstract getStats(params?: { mechanicId?: string }): Promise<ReviewStats>;
  abstract create(data: CreateReviewData): Promise<Review>;
  abstract update(id: string, data: UpdateReviewData): Promise<Review>;
  abstract delete(id: string): Promise<void>;
}

export const REVIEW_REPOSITORY = Symbol('REVIEW_REPOSITORY');

