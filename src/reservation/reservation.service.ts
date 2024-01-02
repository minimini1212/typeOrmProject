import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { Schedule } from 'src/concert/entities/schedule.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}


   // 예매하기
   async create(createReservationDto: CreateReservationDto, user) {
     const userId = user.id
     const { scheduleId } = createReservationDto;
     const concert = await this.findSeat(scheduleId)
     // 그 공연날짜의 전체 좌석 수 가져오기
     const seat = concert.availableSeat
     console.log(seat)
  
    if (seat < 1) {
      throw new ForbiddenException('좌석이 없어서 예매가 불가능합니다.')
    }
 
    const remainingSeat = seat -1


    await this.scheduleRepository.update(
      {id: scheduleId},
      {availableSeat: remainingSeat}
    )

 
    return await this.reservationRepository.save({
      user: userId,
      scheduleId,
    })
     
   }



  //예매 확인하기
  async findOne(userId) {
    return await this.reservationRepository.find({
      where: {
        user: userId,
      },
    })
  }


  // 해당 공연의 좌석수를 가져오기 위한 함수
  async findSeat(scheduleId){
    return await this.scheduleRepository.findOne({
      where: {
        id: scheduleId,
      }
    })
  }
}
