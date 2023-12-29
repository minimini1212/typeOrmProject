import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  @Column('varchar', { nullable: false })
  email: string;

  @IsString()
  @Column('varchar', { length: 10, nullable: false })
  name: string;

  @IsString()
  @Column('varchar', { length: 10, nullable: false })
  role: string;

  @IsStrongPassword()
  @Column('varchar', { select: false, nullable: false })
  password: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}