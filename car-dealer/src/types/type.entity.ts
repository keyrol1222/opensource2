import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Type {
  @PrimaryGeneratedColumn({ name: 'idType' })
  id: number;

  @Column()
  desc: string;

  @Column()
  state: string;
}
