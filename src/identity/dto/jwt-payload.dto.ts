import { HttpStatus } from '@nestjs/common';
import { IsInt, IsPositive, validateSync } from 'class-validator';
import { ResponseException } from 'src/exceptions/response-exception';

export class JWTPayloadDto {
  @IsInt()
  @IsPositive()
  sub: number; // Subject - userId

  @IsInt()
  @IsPositive()
  tenantId: number; // Subject - userId

  constructor(userId: number, tenantId: number) {
    this.sub = userId;
    this.tenantId = tenantId;
    this.validate();
  }

  protected validate() {
    const errors = validateSync(this);
    if (errors.length > 0) {
      throw new ResponseException(
        'Could not process request, please try again ',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
