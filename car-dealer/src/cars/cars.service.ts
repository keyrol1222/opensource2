import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './car.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}

  async findAll(): Promise<Car[]> {
    return this.carRepository.find();
  }

  async findOne(id: number): Promise<Car> {
    return this.carRepository.findOne({ where: { id } });
  }

  async create(car: Partial<Car>): Promise<Car> {
    const newcar = this.carRepository.create(car);
    return this.carRepository.save(newcar);
  }

  async update(id: number, car: Partial<Car>): Promise<Car> {
    await this.carRepository.update(id, car);
    return this.carRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.carRepository.delete(id);
  }
}
