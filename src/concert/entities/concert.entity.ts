import { IsNumber, IsString } from 'class-validator';
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
  concert_name: string;

  @IsString()
  @Column('varchar', { length: 20, nullable: false })
  concert_time: string;

  @IsString()
  @Column('varchar', { length: 20, nullable: false })
  concert_place: string;

  @IsNumber()
  @Column({ nullable: false })
  concert_price: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
