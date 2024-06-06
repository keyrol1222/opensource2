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
import { RentsService } from './rents.service';
import { Rent } from './rent.entity';

@Controller('rents')
export class RentsController {
  constructor(private readonly rentService: RentsService) {}

  //get all rents
  @Get()
  async findAll(): Promise<Rent[]> {
    return this.rentService.findAll();
  }

  //get rent by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Rent> {
    const rent = await this.rentService.findOne(id);
    if (!rent) {
      throw new NotFoundException('no existe!');
    } else {
      return rent;
    }
  }

  //create rent
  @Post()
  async create(@Body() rent: Rent): Promise<Rent> {
    return this.rentService.create(rent);
  }

  //update rent
  @Put(':id')
  async update(@Param('id') id: number, @Body() rent: Rent): Promise<any> {
    return this.rentService.update(id, rent);
  }

  //delete rent
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if no existe
    const rent = await this.rentService.findOne(id);
    if (!rent) {
      throw new NotFoundException('no existe!');
    }
    return this.rentService.delete(id);
  }
}
