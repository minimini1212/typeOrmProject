import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Schedule } from 'src/concert/entities/schedule.entity';
import { User } from 'src/user/entities/user.entity';
import { Concert } from 'src/concert/entities/concert.entity';

@Module({
  imports:[
    AuthModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Schedule]),
    TypeOrmModule.forFeature([Reservation]),
    TypeOrmModule.forFeature([Concert]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
