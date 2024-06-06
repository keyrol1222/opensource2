import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rent } from './rent.entity';

@Injectable()
export class RentsService {
  constructor(
    @InjectRepository(Rent)
    private rentRepository: Repository<Rent>,
  ) {}

  async findAll(): Promise<Rent[]> {
    return this.rentRepository.find();
  }

  async findOne(id: number): Promise<Rent> {
    return this.rentRepository.findOne({ where: { id } });
  }

  async create(rent: Partial<Rent>): Promise<Rent> {
    const newrent = this.rentRepository.create(rent);
    return this.rentRepository.save(newrent);
  }

  async update(id: number, rent: Partial<Rent>): Promise<Rent> {
    await this.rentRepository.update(id, rent);
    return this.rentRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.rentRepository.delete(id);
  }
}
