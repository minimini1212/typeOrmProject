import { IsNotEmpty, IsNumber, isNotEmpty } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsNumber()
  scheduleId: number;
}
