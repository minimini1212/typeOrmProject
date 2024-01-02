import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Schedule } from 'src/concert/entities/schedule.entity';
import { ConcertModule } from 'src/concert/concert.module';

@Module({
  imports:[
    AuthModule,
    TypeOrmModule.forFeature([Schedule]),
    TypeOrmModule.forFeature([Reservation])
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
