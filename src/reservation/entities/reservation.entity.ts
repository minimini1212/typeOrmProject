import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Schedule } from 'src/concert/entities/schedule.entity';

@Entity({ name: 'reservations' })
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne((Type) => User, (user) => user.reservations)
  @JoinColumn()
  user: User;

  @ManyToOne((Type) => Schedule, (schedule) => schedule.reservations)
  @JoinColumn()
  schedule: Schedule;
}