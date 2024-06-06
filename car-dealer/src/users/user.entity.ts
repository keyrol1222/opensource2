import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'idUser' })
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  lastName: string;

  @Column()
  dni: string;

  @Column()
  cr: string;

  @Column()
  creditLimit: number;

  @Column()
  type: string;

  @Column()
  state: string;
}
