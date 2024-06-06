import { Brand } from 'src/brands/brand.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
@Entity()
export class Model {
  @PrimaryGeneratedColumn({ name: 'idModel' })
  id: number;

  @Column()
  desc: string;

  @Column()
  state: string;

  @ManyToOne(() => Brand, { eager: true })
  @JoinColumn({ name: 'idBrand' })
  brand: Brand;
}
