export interface Skill {
  id: string;
  name: string;
  category?: string | null;
}

export abstract class SkillRepository {
  abstract findMany(): Promise<Skill[]>;
  abstract findById(id: string): Promise<Skill | null>;
}

export const SKILL_REPOSITORY = Symbol('SKILL_REPOSITORY');





