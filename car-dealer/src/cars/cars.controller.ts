import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './car.entity';

@Controller('cars')
export class CarsController {
  constructor(private readonly carService: CarsService) {}

  //get all cars
  @Get()
  async findAll(): Promise<Car[]> {
    return this.carService.findAll();
  }

  //get car by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Car> {
    const car = await this.carService.findOne(id);
    if (!car) {
      throw new NotFoundException('car does not exist!');
    } else {
      return car;
    }
  }

  //create car
  @Post()
  async create(@Body() car: Car): Promise<Car> {
    return this.carService.create(car);
  }

  //update car
  @Put(':id')
  async update(@Param('id') id: number, @Body() car: Car): Promise<any> {
    return this.carService.update(id, car);
  }

  //delete car
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if car does not exist
    const car = await this.carService.findOne(id);
    if (!car) {
      throw new NotFoundException('car does not exist!');
    }
    return this.carService.delete(id);
  }
}
