import { throwError } from 'rxjs';
import { ResponseException } from 'src/exceptions/response-exception';

export const errorCatcher = (error) => {
  return throwError(() => {
    //console.log for logging out the error. Do not delete
    console.log('error', error?.response);
    return new ResponseException(
      `${
        error?.response?.data?.Message || JSON.stringify(error?.response?.data)
      }`,
      error.response?.status || 500,
    );
  });
};
