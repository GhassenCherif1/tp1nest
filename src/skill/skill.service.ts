import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(Skill)
    private skillrespository: Repository<Skill>) {}

  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    return await this.skillrespository.save(createSkillDto);
  }

  async findAll(): Promise<Skill[]> {
    return await this.skillrespository.find();
  }

  async findById(id: number): Promise<Skill> {
    const found = await this.skillrespository.findOne({ where: { id } });
    if (found) {
      return found;
    }
    throw new NotFoundException(`Skill with id ${id} not found`);
  }

  async removeById(id: number): Promise<Skill> {
    const found = await this.findById(id);
    if (found) {
      this.skillrespository.softDelete(id);
      return found;
    }
  }
}