import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Model } from './model.entity';

@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(Model)
    private modelRepository: Repository<Model>,
  ) {}

  async findAll(): Promise<Model[]> {
    return this.modelRepository.find();
  }

  async findOne(id: number): Promise<Model> {
    return this.modelRepository.findOne({ where: { id } });
  }

  async create(model: Partial<Model>): Promise<Model> {
    const newmodel = this.modelRepository.create(model);
    return this.modelRepository.save(newmodel);
  }

  async update(id: number, model: Partial<Model>): Promise<Model> {
    await this.modelRepository.update(id, model);
    return this.modelRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.modelRepository.delete(id);
  }
}
