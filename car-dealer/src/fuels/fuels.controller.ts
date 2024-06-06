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
import { FuelsService } from './fuels.service';
import { Fuel } from './fuel.entity';

@Controller('fuels')
export class FuelsController {
  constructor(private readonly fuelService: FuelsService) {}

  //get all fuels
  @Get()
  async findAll(): Promise<Fuel[]> {
    return this.fuelService.findAll();
  }

  //get fuel by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Fuel> {
    const fuel = await this.fuelService.findOne(id);
    if (!fuel) {
      throw new NotFoundException('no existe!');
    } else {
      return fuel;
    }
  }

  //create fuel
  @Post()
  async create(@Body() fuel: Fuel): Promise<Fuel> {
    return this.fuelService.create(fuel);
  }

  //update fuel
  @Put(':id')
  async update(@Param('id') id: number, @Body() fuel: Fuel): Promise<any> {
    return this.fuelService.update(id, fuel);
  }

  //delete fuel
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if fuel does not exist
    const fuel = await this.fuelService.findOne(id);
    if (!fuel) {
      throw new NotFoundException('no existe!');
    }
    return this.fuelService.delete(id);
  }
}
