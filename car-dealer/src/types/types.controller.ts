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
import { TypesService } from './types.service';
import { Type } from './type.entity';

@Controller('types')
export class TypesController {
  constructor(private readonly typeService: TypesService) {}

  //get all types
  @Get()
  async findAll(): Promise<Type[]> {
    return this.typeService.findAll();
  }

  //get type by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Type> {
    const type = await this.typeService.findOne(id);
    if (!type) {
      throw new NotFoundException('no existe!');
    } else {
      return type;
    }
  }

  //create type
  @Post()
  async create(@Body() type: Type): Promise<Type> {
    return this.typeService.create(type);
  }

  //update type
  @Put(':id')
  async update(@Param('id') id: number, @Body() type: Type): Promise<any> {
    return this.typeService.update(id, type);
  }

  //delete type
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if no existe
    const type = await this.typeService.findOne(id);
    if (!type) {
      throw new NotFoundException('no existe!');
    }
    return this.typeService.delete(id);
  }
}
