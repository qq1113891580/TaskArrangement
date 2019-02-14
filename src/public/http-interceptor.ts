import { Observable } from 'rxjs';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpClient
} from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { API_URL } from './host-address';
import { tap } from 'rxjs/operators';

/**
 * 授权拦截器
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * http请求数
   */
  private requestCount = 0;
  /**
   *
   */
  constructor(@Inject(API_URL) private apiUrl, public http: HttpClient) {}
  /**
   * 序列化请求参数
   * @param obj 请求参数
   */
  param(obj) {
    // tslint:disable-next-line:one-variable-per-declaration
    let query = '',
      name,
      value,
      fullSubName,
      subName,
      subValue,
      innerObj,
      i;
    for (name in obj) {
      if (obj.hasOwnProperty(name)) {
        value = obj[name];

        if (value instanceof Array) {
          for (i = 0; i < value.length; ++i) {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += this.param(innerObj) + '&';
          }
        } else if (value instanceof Object) {
          for (subName in value) {
            if (value.hasOwnProperty(subName)) {
              subValue = value[subName];
              fullSubName = name + '[' + subName + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += this.param(innerObj) + '&';
            }
          }
        } else if (value !== undefined && value !== null) {
          query +=
            encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }
      }
    }
    return query.length ? query.substr(0, query.length - 1) : query;
  }

  /**
   * 减去请求次数或者关闭loading
   */
  private deductRequestCount() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      // this.commonhelper.dismissLoading();
    }
  }
  /** log */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // const authHeader = 'bearer ' + this.userInfo.GetToken();
    const authHeader = 'bearer ';
    // 用 FormData 传参给后台
    // const authReq = req.url.startsWith('~')
    //   ? req.clone({
    //       url: this.apiUrl + req.url.slice(1)
    //     })
    //   : req.clone({
    //       headers: req.headers
    //         .set('Authorization', authHeader)
    //         .set('Content-Type', 'application/x-www-form-urlencoded'),
    //       url: this.apiUrl + req.url,
    //       body: this.param(req.body)
    //     });

    // 用 RequestPayload 传参给后台
    const authReq = req.clone({
      headers: req.headers
        .set('Authorization', authHeader)
        .set('Content-Type', 'application/json'),
      url: this.apiUrl + req.url,
      body: req.body
    });
    // 避免连续多个loading闪屏
    if (this.requestCount <= 0) {
      // this.commonhelper.presentLoading();
    }
    this.requestCount++;
    return next.handle(authReq).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            this.deductRequestCount();
          }
        },
        error => {
          this.deductRequestCount();
        }
      )
    );
  }
}
