import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Fuel {
  @PrimaryGeneratedColumn({ name: 'idFuel' })
  id: number;

  @Column({ name: 'desc' })
  desc: string;

  @Column({ name: 'state' })
  state: string;
}
