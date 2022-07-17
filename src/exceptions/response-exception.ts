import { HttpException } from '@nestjs/common';

export class ResponseException extends HttpException {
  constructor(message: string, status: number) {
    super(message, status);
  }
}
