import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from './type.entity';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(Type)
    private typeRepository: Repository<Type>,
  ) {}

  async findAll(): Promise<Type[]> {
    return this.typeRepository.find();
  }

  async findOne(id: number): Promise<Type> {
    return this.typeRepository.findOne({ where: { id } });
  }

  async create(type: Partial<Type>): Promise<Type> {
    const newtype = this.typeRepository.create(type);
    return this.typeRepository.save(newtype);
  }

  async update(id: number, type: Partial<Type>): Promise<Type> {
    await this.typeRepository.update(id, type);
    return this.typeRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.typeRepository.delete(id);
  }
}
