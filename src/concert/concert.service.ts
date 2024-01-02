import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateConcertDto } from './dto/create-concert.dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Concert } from './entities/concert.entity';
import _ from 'lodash';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private readonly concertRepository: Repository<Concert>,
  ) {}

  // 공연 생성하기
  async create(createConcertDto: CreateConcertDto, user) {
    const {
      name,
      dateTimes,
      place,
      image,
      price,
      seats,
      availableSeats,
      category,
      introduction,
    } = createConcertDto;

    const userId = user.id;

    const foundConcert = await this.concertRepository.findOne({
      where: { name },
    });

    if (!_.isNil(foundConcert)) {
      throw new ConflictException('이미 존재하는 공연 이름입니다.');
    }

    // [{dateTime: 시간1}, {dateTime: 시간2}, ...] -=> mkDateTime
    const mkDateTime = dateTimes.map((dateTime) => {
      return { dateTime };
    });

    // 좌석수는 배열로 등록
    const mkSeat = seats.map((seat) => {
      return { seat };
    });

    // datetime과 seat 합쳐서 만들기
    const dateTimeAndSeat = mkDateTime.map((datetime, index) => ({
      ...datetime,
      ...mkSeat[index],
    }));

    // 이용가능 좌석 만들기
    const mkAvailableSeat = availableSeats.map((availableSeat) => {
      return { availableSeat };
    });

    const schedules = dateTimeAndSeat.map((datetimeSeat, index) => ({
      ...datetimeSeat,
      ...mkAvailableSeat[index],
    }));

    const createConcert = await this.concertRepository.save({
      name,
      place,
      price,
      schedules,
      user: userId,
      image,
      category,
      introduction,
    });

    return createConcert;
  }

  // 공연 목록 조회
  async findAll() {
    const concerts = await this.concertRepository.find();
    if (concerts.length < 1) {
      throw new NotFoundException('조회할 공연 목록이 없습니다.');
    }

    return concerts;
  }

  // 공연 상세 조회
  async findOne(id: number) {
    const concert = await this.concertRepository.findOne({
      where: { id },
      relations: {
        schedules: true,
      },
    });

    if (!concert) {
      throw new NotFoundException('조회할 공연 목록이 없습니다.');
    }

    const message = concert.schedules.map((schedule) => {
      if (schedule.availableSeat > 0) {
        return `${schedule.id}번 공연의 예매가 가능합니다.`;
      }

      return `${schedule.id}번 공연의 예매가 불가능합니다.`;
    });

    return { concert, message };
  }

  // 공연 keyword 조회
  async findKeyword(keyword: string) {
    const concert = await this.concertRepository.find({
      where: {
        name: Like(`%${keyword}%`),
      },
    });

    if (!concert.length) {
      throw new NotFoundException('조회할 공연 목록이 없습니다.');
    }

    return concert;
  }
}
