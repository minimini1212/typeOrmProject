import { IsArray, IsDate, IsDateString, IsNotEmpty, IsNumber, IsString, IsStrongPassword } from 'class-validator';

export class CreateConcertDto {
  @IsNotEmpty({ message: '입력란을 확인하세요' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: '입력란을 확인하세요' })
  @IsDateString({}, { each: true })
  dateTimes: Date[];

  @IsNotEmpty({ message: '입력란을 확인하세요' })
  @IsString()
  place: string;

  @IsNotEmpty({ message: '입력란을 확인하세요' })
  @IsNumber()
  price: number;

  @IsNotEmpty({ message: '입력란을 확인하세요' })
  @IsNumber()
  seat: number;

  @IsNotEmpty({ message: '입력란을 확인하세요' })
  @IsString()
  category: string

  @IsNotEmpty({ message: '입력란을 확인하세요' })
  @IsString()
  introduction: string

  @IsNotEmpty({ message: '입력란을 확인하세요' })
  @IsString()
  image: string

}