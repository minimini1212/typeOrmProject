import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty({ message: '입력란을 확인하세요' })
  @IsString()
  email: string;

  @IsNotEmpty({ message: '입력란을 확인하세요' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: '입력란을 확인하세요' })
  @IsString()
  role: string;

  @IsNotEmpty({ message: '입력란을 확인하세요' })
  @IsString()
  //@IsStrongPassword({
  //  minLength: 6,
  //  minNumbers: 1,
  //})
  password: string;

  @IsNotEmpty({ message: '입력란을 확인하세요' })
  @IsString()
  rePassword: string;
}
