import { Car } from 'src/cars/car.entity';
import { Employee } from 'src/employees/employee.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
@Entity()
export class Rent {
  @PrimaryGeneratedColumn({ name: 'idRent' })
  id: number;

  @Column({ name: 'rentDate' })
  rentDate: string;

  @Column({ name: 'returnDate' })
  returnDate: string;

  @Column({ name: 'amount' })
  amount: number;

  @Column({ name: 'days' })
  days: number;

  @Column({ name: 'comment' })
  comment: string;

  @Column({ name: 'state' })
  state: number;

  @ManyToOne(() => Employee, { eager: true })
  @JoinColumn({ name: 'idEmployee' })
  @Column()
  employee: number;

  @ManyToOne(() => Car, { eager: true })
  @JoinColumn({ name: 'idCar' })
  @Column()
  car: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'idUser' })
  @Column()
  user: number;
}
