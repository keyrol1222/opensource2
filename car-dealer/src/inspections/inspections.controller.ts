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
import { InspectionsService } from './inspections.service';
import { Inspection } from './inspection.entity';

@Controller('inspections')
export class InspectionsController {
  constructor(private readonly inspectionService: InspectionsService) {}

  //get all inspections
  @Get()
  async findAll(): Promise<Inspection[]> {
    return this.inspectionService.findAll();
  }

  //get inspection by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Inspection> {
    const inspection = await this.inspectionService.findOne(id);
    if (!inspection) {
      throw new NotFoundException('no existe!');
    } else {
      return inspection;
    }
  }

  //create inspection
  @Post()
  async create(@Body() inspection: Inspection): Promise<Inspection> {
    return this.inspectionService.create(inspection);
  }

  //update inspection
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() inspection: Inspection,
  ): Promise<any> {
    return this.inspectionService.update(id, inspection);
  }

  //delete inspection
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if inspection does not exist
    const inspection = await this.inspectionService.findOne(id);
    if (!inspection) {
      throw new NotFoundException('no existe!');
    }
    return this.inspectionService.delete(id);
  }
}
