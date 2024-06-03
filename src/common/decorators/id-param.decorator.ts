import {
  HttpStatus,
  NotAcceptableException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

export function IdParam() {
  return Param(
    'id',
    new ParseUUIDPipe({
      errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      exceptionFactory: () => {
        throw new NotAcceptableException('ID format should be uuid');
      },
    }),
  );
}
