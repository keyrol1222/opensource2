import { Brand } from 'src/brands/brand.entity';
import { Fuel } from 'src/fuels/fuel.entity';
import { Model } from 'src/models/model.entity';
import { Type } from 'src/types/type.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
@Entity()
export class Car {
  @PrimaryGeneratedColumn({ name: 'idCar' })
  id: number;

  @Column({ name: 'desc' })
  desc: string;

  @Column()
  chasis: string;

  @Column()
  motor: string;

  @Column()
  plate: string;

  @ManyToOne(() => Type, { eager: true })
  @JoinColumn({ name: 'idType' })
  @Column()
  type: string;

  @ManyToOne(() => Brand, { eager: true })
  @JoinColumn({ name: 'idBrand' })
  @Column()
  brand: string;

  @ManyToOne(() => Model, { eager: true })
  @JoinColumn({ name: 'idModel' })
  @Column()
  model: string;

  @ManyToOne(() => Fuel, { eager: true })
  @JoinColumn({ name: 'idFuel' })
  @Column()
  fuel: string;

  @Column()
  state: string;
}
