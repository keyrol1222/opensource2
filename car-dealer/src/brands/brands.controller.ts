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
import { BrandsService } from './brands.service';
import { Brand } from './brand.entity';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandService: BrandsService) {}

  //get all brands
  @Get()
  async findAll(): Promise<Brand[]> {
    return this.brandService.findAll();
  }

  //get brand by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Brand> {
    const brand = await this.brandService.findOne(id);
    if (!brand) {
      throw new NotFoundException('brand does not exist!');
    } else {
      return brand;
    }
  }

  //create brand
  @Post()
  async create(@Body() brand: Brand): Promise<Brand> {
    return this.brandService.create(brand);
  }

  //update brand
  @Put(':id')
  async update(@Param('id') id: number, @Body() brand: Brand): Promise<any> {
    return this.brandService.update(id, brand);
  }

  //delete brand
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if brand does not exist
    const brand = await this.brandService.findOne(id);
    if (!brand) {
      throw new NotFoundException('brand does not exist!');
    }
    return this.brandService.delete(id);
  }
}
