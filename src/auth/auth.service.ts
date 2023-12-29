import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/sign-in.dto';
import _ from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { hashSync, compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // 로그인
  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.userRepository.findOne({
      where: {
        email,
        deleteAt: null,
      },
      select: {
        email: true,
        name: true,
        role: true,
        password: true,
      },
    });

    if (_.isNil(user)) {
      throw new NotFoundException('존재하지 않는 유저입니다.');
    }

    const match = compareSync(password, user.password);

    if (!match) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    const payload = { id: user.id };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }

  // 회원가입
  async signUp(signUpDto: SignUpDto) {
    const { email, name, role, password, rePassword } = signUpDto;
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!_.isNil(user)) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    if (password !== rePassword) {
      throw new UnauthorizedException('비밀번호를 확인해주세요');
    }

    const salt = 12;
    const hashPassword = hashSync(password, salt);

    const createdUser = await this.userRepository.save({
      email,
      name,
      role,
      password: hashPassword,
    });

    return createdUser;
  }
}
