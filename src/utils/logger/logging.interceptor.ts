import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    //
    const className = context.getClass().name;
    const handler = context.getHandler().name;
    //
    console.log(`Req | [${className}.${handler}]`);
    //
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            `Res | [${className}.${handler}] | +${Date.now() - now}ms`,
          ),
        ),
      );
  }
}
