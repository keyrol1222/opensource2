import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  async findAll(): Promise<Brand[]> {
    return this.brandRepository.find();
  }

  async findOne(id: number): Promise<Brand> {
    return this.brandRepository.findOne({ where: { id } });
  }

  async create(brand: Partial<Brand>): Promise<Brand> {
    const newbrand = this.brandRepository.create(brand);
    return this.brandRepository.save(newbrand);
  }

  async update(id: number, brand: Partial<Brand>): Promise<Brand> {
    await this.brandRepository.update(id, brand);
    return this.brandRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.brandRepository.delete(id);
  }
}
