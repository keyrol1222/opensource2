import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inspection } from './inspection.entity';

@Injectable()
export class InspectionsService {
  constructor(
    @InjectRepository(Inspection)
    private inspectionRepository: Repository<Inspection>,
  ) {}

  async findAll(): Promise<Inspection[]> {
    return this.inspectionRepository.find();
  }

  async findOne(id: number): Promise<Inspection> {
    return this.inspectionRepository.findOne({ where: { id } });
  }

  async create(inspection: Partial<Inspection>): Promise<Inspection> {
    const newinspection = this.inspectionRepository.create(inspection);
    return this.inspectionRepository.save(newinspection);
  }

  async update(
    id: number,
    inspection: Partial<Inspection>,
  ): Promise<Inspection> {
    await this.inspectionRepository.update(id, inspection);
    return this.inspectionRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.inspectionRepository.delete(id);
  }
}
