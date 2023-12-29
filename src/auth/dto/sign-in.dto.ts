import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class SignInDto {
  @IsNotEmpty({ message: '이메일을 입력하세요' })
  @IsString()
  email: string;

  @IsNotEmpty({ message: '패스워드를 입력하세요' })
  @IsString()
  //@IsStrongPassword({
  //  minLength: 6,
  //  minNumbers: 1,
  //})
  password: string;
}
