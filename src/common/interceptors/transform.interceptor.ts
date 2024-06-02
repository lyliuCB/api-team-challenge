import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResOp } from '../../common/model/response.model';

/**
 * 统一处理接口请求与响应结果，如果不需要则添加 @Bypass 装饰器
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data) {
          return new ResOp(HttpStatus.OK, data ?? null);
        } else {
          throw new NotFoundException('Not Found.');
        }
      }),
      catchError(async (err) => {
        throw err;
      }),
    );
  }
}
