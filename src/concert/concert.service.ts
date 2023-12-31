import { ConflictException, Injectable } from '@nestjs/common';
import { CreateConcertDto } from './dto/create-concert.dto';
import { User } from 'src/user/entities/user.entity';
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
  async create(createConcertDto: CreateConcertDto) {
    const { name, dateTimes, place, price, seat, category, introduction } =
      createConcertDto;

    const foundConcert = await this.concertRepository.findOne({
      where: { name },
    });

    if (!_.isNil(foundConcert)) {
      throw new ConflictException('이미 존재하는 공연 이름입니다.');
    }

    const schedules = dateTimes.map((dateTime) => {
      return { dateTime };
    });

    // [{dateTime: 시간1}, {dateTime: 시간2}] -=> schedules

    const createConcert = await this.concertRepository.save({
      name,
      place,
      schedules,
      price,
      seat,
      category,
      introduction,
    });

    return createConcert;
  }

  // 공연 목록 조회
  async findAll() {
    return await this.concertRepository.find();
  }

  // 공연 상세 조회
  async findOne(id: number) {
    return await this.concertRepository.findOne({
      where: { id },
    });
  }

  // 공연 keyword 조회
  async findKeyword(keyword: string) {
    return await this.concertRepository.find({
      where: {
        name: Like(`%${keyword}%`),
      },
    });
  }
}
