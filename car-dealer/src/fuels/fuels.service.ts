import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fuel } from './fuel.entity';

@Injectable()
export class FuelsService {
  constructor(
    @InjectRepository(Fuel)
    private fuelRepository: Repository<Fuel>,
  ) {}

  async findAll(): Promise<Fuel[]> {
    return this.fuelRepository.find();
  }

  async findOne(id: number): Promise<Fuel> {
    return this.fuelRepository.findOne({ where: { id } });
  }

  async create(fuel: Partial<Fuel>): Promise<Fuel> {
    const newfuel = this.fuelRepository.create(fuel);
    return this.fuelRepository.save(newfuel);
  }

  async update(id: number, fuel: Partial<Fuel>): Promise<Fuel> {
    await this.fuelRepository.update(id, fuel);
    return this.fuelRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.fuelRepository.delete(id);
  }
}
