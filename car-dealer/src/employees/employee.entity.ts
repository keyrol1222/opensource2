import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Employee {
  @PrimaryGeneratedColumn({ name: 'idEmployee' })
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  dni: string;

  @Column()
  workTime: string;

  @Column()
  percentage: number;

  @Column()
  startDate: string;

  @Column()
  state: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
