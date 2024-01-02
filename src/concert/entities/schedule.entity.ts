import { IsDateString, IsNumber, IsString } from 'class-validator';
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

  // schedule테이블로 관리
  @IsNumber()
  @Column({ nullable: false })
  seat: number;

  @IsNumber()
  @Column({ nullable: false })
  availableSeat: number;

  @ManyToOne((type) => Concert, (concert) => concert.schedules)
  concert: Concert;

  @OneToMany((type) => Reservation, (reservation) => reservation.schedule)
  reservations: Reservation[];
}
