import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResourceCollection<T> {
  data: T;
}

@Injectable()
export class ResourceCollectionInterceptor<T>
  implements NestInterceptor<T, ResourceCollection<T>> {
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResourceCollection<T>> {
    return next.handle().pipe(
      map(data => ({
        meta: {
          total_count: data.length,
          page_no: 1,
          page_size: 10,
          filtered_count: data.length,
        },
        data,
      })),
    );
  }
}
