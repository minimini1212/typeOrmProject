import { IsDate, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'concerts',
})
export class Concert {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column('varchar', { length: 20, nullable: false })
  name: string;

  @IsDate()
  @Column('varchar', { length: 20, nullable: false })
  date: Date;

  @IsString()
  @Column('varchar', { length: 20, nullable: false })
  time: string;

  @IsString()
  @Column('varchar', { length: 20, nullable: false })
  place: string;

  @IsNumber()
  @Column({ nullable: false })
  price: number;

  @IsNumber()
  @Column({ nullable: false })
  seat: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
