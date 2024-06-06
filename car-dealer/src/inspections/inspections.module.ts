import { Module } from '@nestjs/common';
import { InspectionsController } from './inspections.controller';
import { InspectionsService } from './inspections.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inspection } from './inspection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inspection])],
  controllers: [InspectionsController],
  providers: [InspectionsService],
})
export class InspectionsModule {}
