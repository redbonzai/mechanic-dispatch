import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Skill, SkillRepository } from '../../domain/mechanics/repositories/skill.repository';

@Injectable()
export class PrismaSkillRepository implements SkillRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(): Promise<Skill[]> {
    // Using type assertion until Prisma client is regenerated
    const skills = await (this.prisma as any).skill.findMany({
      orderBy: { name: 'asc' },
    });
    return skills;
  }

  async findById(id: string): Promise<Skill | null> {
    const skill = await (this.prisma as any).skill.findUnique({
      where: { id },
    });
    return skill;
  }
}





