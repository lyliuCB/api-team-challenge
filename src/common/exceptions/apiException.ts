import { HttpException } from '@nestjs/common';

function apiException(error: HttpException) {
  return errorHandling(error);
}

function errorHandling(error: HttpException) {
  return {
    errors: {
      code: 500,
      message: error.message || 'error found',
      type: error.name,
    },
  };
}

export default apiException;
