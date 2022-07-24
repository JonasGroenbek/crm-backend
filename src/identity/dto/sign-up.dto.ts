import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@Exclude()
export class SignUpDto {
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
