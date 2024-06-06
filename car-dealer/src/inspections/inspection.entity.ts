import { Car } from 'src/cars/car.entity';
import { Employee } from 'src/employees/employee.entity';
import { Rent } from 'src/rents/rent.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
@Entity()
export class Inspection {
  @PrimaryGeneratedColumn({ name: 'idInspection' })
  id: number;

  @ManyToOne(() => Car, { eager: true })
  @JoinColumn({ name: 'idCar' })
  @Column()
  car: number;

  @ManyToOne(() => Rent, { eager: true })
  @JoinColumn({ name: 'idRent' })
  @Column()
  rent: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'idUser' })
  @Column()
  user: number;

  @ManyToOne(() => Employee, { eager: true })
  @JoinColumn({ name: 'idEmployee' })
  @Column()
  employee: number;

  @Column({ name: 'haveScratch' })
  haveScratch: boolean;

  @Column({ name: 'haveSubstitute' })
  haveSubstitute: boolean;

  @Column({ name: 'haveCat' })
  haveCat: boolean;

  @Column({ name: 'haveBrokenGlass' })
  haveBrokenGlass: boolean;

  @Column({ name: 'gasAmount' })
  gasAmount: string;

  @Column({ name: 'wheelState' })
  wheelState: number;

  @Column({ name: 'date' })
  date: string;

  @Column({ name: 'etc' })
  etc: string;

  @Column({ name: 'state' })
  state: string;
}
