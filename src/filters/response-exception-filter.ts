import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseException } from 'src/exceptions/response-exception';

@Catch(ResponseException)
export class ResponseExceptionFilter implements ExceptionFilter {
  catch(exception: ResponseException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const response = exception.getResponse();
    if (process.env.NODE_ENV === 'production') {
      res.status(status).json({
        code: status,
        message: exception.message,
        status,
        response,
      });
    } else {
      res.status(status).json({
        status,
        response,
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
        //user: request?.user,
        //data: exception.data,
        code: status,
        stack: exception.stack,
      });
    }
  }
}
