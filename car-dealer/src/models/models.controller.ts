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
import { ModelsService } from './models.service';
import { Model } from './model.entity';

@Controller('models')
export class ModelsController {
  constructor(private readonly modelService: ModelsService) {}

  //get all models
  @Get()
  async findAll(): Promise<Model[]> {
    return this.modelService.findAll();
  }

  //get model by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Model> {
    const model = await this.modelService.findOne(id);
    if (!model) {
      throw new NotFoundException('no existe!');
    } else {
      return model;
    }
  }

  //create model
  @Post()
  async create(@Body() model: Model): Promise<Model> {
    return this.modelService.create(model);
  }

  //update model
  @Put(':id')
  async update(@Param('id') id: number, @Body() model: Model): Promise<any> {
    return this.modelService.update(id, model);
  }

  //delete model
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if no existe
    const model = await this.modelService.findOne(id);
    if (!model) {
      throw new NotFoundException('no existe!');
    }
    return this.modelService.delete(id);
  }
}
