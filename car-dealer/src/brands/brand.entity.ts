import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Brand {
  @PrimaryGeneratedColumn({ name: 'idBrand' })
  id: number;

  @Column({ name: 'desc' })
  desc: string;

  @Column({ name: 'state' })
  state: string;
}
