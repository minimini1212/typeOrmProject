import { IsDateString, IsString } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Concert } from './concert.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Entity({ name: 'schedules' })
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @IsDateString()
  //@Column({ type: 'datetime' })
  @Column()
  dateTime: Date;

  @ManyToOne((type) => Concert, (concert) => concert.schedules)
  concert: Concert;

  @OneToMany((type) => Reservation, (reservation) => reservation.schedule)
  reservations: Reservation[];
}
