import { ConflictException, Injectable } from '@nestjs/common';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
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
    const { name, time, place, price, seat } = createConcertDto;

    const foundConcert = await this.concertRepository.findOne({
      where: { name },
    });

    if (!_.isNil(foundConcert)) {
      throw new ConflictException('이미 존재하는 공연 이름입니다.');
    }

    const createConcert = await this.concertRepository.save({
      name,
      time,
      place,
      price,
      seat,
    });

    return createConcert;
  }

  async findAll() {
    return await this.concertRepository.find();
  }

  async findOne(id: number) {
    return await this.concertRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateConcertDto: UpdateConcertDto) {
    return `This action updates a #${id} concert`;
  }

  remove(id: number) {
    return `This action removes a #${id} concert`;
  }
}
