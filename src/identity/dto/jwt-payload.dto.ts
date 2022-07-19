import { HttpStatus } from '@nestjs/common';
import { IsInt, IsPositive, validateSync } from 'class-validator';
import { ResponseException } from 'src/exceptions/response-exception';

export class JWTPayloadDTO {
  @IsInt()
  @IsPositive()
  sub: number; // Subject - userId

  constructor(userId: number) {
    this.sub = userId;
    this.validate();
  }

  protected validate() {
    console.log('validating');
    const errors = validateSync(this);
    if (errors.length > 0) {
      throw new ResponseException(
        'Could not process request, please try again ',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
