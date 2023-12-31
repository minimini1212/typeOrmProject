import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConcertModule } from './concert/concert.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concert } from './concert/entities/concert.entity';
import { ReservationModule } from './reservation/reservation.module';
import { Reservation } from './reservation/entities/reservation.entity';
import { Schedule } from './concert/entities/schedule.entity';

const typeOrmModuleOptions: TypeOrmModuleAsyncOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    // autoLoadEntities: true,
    entities: [Concert, User, Reservation, Schedule],
    synchronize: configService.get('DB_SYNC'),
    logging: true,
  }),
  // imports: [ConfigModule], 얘가 생략되도 되는 이유는 밑에 imports 부분에 configmodule을 전역으로 설정해서..
  inject: [ConfigService],
};

@Module({
  imports: [
    UserModule,
    AuthModule,
    // configmodule을 전역으로 사용가능하게 하겠다. isglobal
    ConfigModule.forRoot({ isGlobal: true }),
    ConcertModule,
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    ReservationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
