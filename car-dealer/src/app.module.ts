import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypesModule } from './types/types.module';
import { BrandsModule } from './brands/brands.module';
import { ModelsModule } from './models/models.module';
import { FuelsModule } from './fuels/fuels.module';
import { CarsModule } from './cars/cars.module';
import { EmployeesModule } from './employees/employees.module';
import { RentsModule } from './rents/rents.module';
import { InspectionsModule } from './inspections/inspections.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypesModule,
    BrandsModule,
    ModelsModule,
    FuelsModule,
    CarsModule,
    EmployeesModule,
    RentsModule,
    InspectionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
