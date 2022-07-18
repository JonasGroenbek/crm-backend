import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@Exclude()
export class SignUpDTO {
  @ApiProperty({ required: true })
  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(52)
  email: string;

  @ApiProperty({ required: true })
  @Expose()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  password: string;
}
