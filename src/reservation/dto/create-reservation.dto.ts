import { IsNotEmpty, IsNumber, isNotEmpty } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsNumber()
  concertId: number;
}
