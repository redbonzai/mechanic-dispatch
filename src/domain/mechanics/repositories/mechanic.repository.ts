import { Mechanic } from '../entities/mechanic.entity';

export interface CreateMechanicData {
  name: string;
  slug: string;
  bio?: string | null;
  imageUrl?: string | null;
  location: string;
  yearsExperience: number;
  sinceYear: number;
  certifications?: string[];
  badges?: string[];
  skillIds?: string[];
}

export interface UpdateMechanicData extends Partial<CreateMechanicData> {
  isActive?: boolean;
}

export abstract class MechanicRepository {
  abstract findById(id: string): Promise<Mechanic | null>;
  abstract findBySlug(slug: string): Promise<Mechanic | null>;
  abstract findMany(params?: { isActive?: boolean }): Promise<Mechanic[]>;
  abstract create(data: CreateMechanicData): Promise<Mechanic>;
  abstract update(id: string, data: UpdateMechanicData): Promise<Mechanic>;
  abstract delete(id: string): Promise<void>;
}

export const MECHANIC_REPOSITORY = Symbol('MECHANIC_REPOSITORY');

