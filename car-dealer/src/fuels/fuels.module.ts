import { Module } from '@nestjs/common';
import { FuelsController } from './fuels.controller';
import { FuelsService } from './fuels.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fuel } from './fuel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fuel])],
  controllers: [FuelsController],
  providers: [FuelsService],
})
export class FuelsModule {}
