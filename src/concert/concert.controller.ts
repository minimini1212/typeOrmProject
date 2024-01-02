import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { ConcertService } from './concert.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/user/types/userRole.type';

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Post()
  @UseGuards(AuthGuard())
  async createConcert(@Body() createConcertDto: CreateConcertDto, @Req() req) {
    const user = req.user;

    if (user.role !== Role.Admin) {
      throw new UnauthorizedException('관리자만 공연 등록이 가능합니다.');
    }

    return await this.concertService.create(createConcertDto, user);
  }

  @Get()
  async findAllConcert() {
    return await this.concertService.findAll();
  }

  @Get('keyword')
  async findOneConcertBykeyword(@Query('keyword') keyword: string) {
    console.log(keyword);
    return await this.concertService.findKeyword(keyword);
  }

  @Get(':id')
  async findOneConcert(@Param('id') id: number) {
    return await this.concertService.findOne(id);
  }
}
