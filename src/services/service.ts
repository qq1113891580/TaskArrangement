import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlManagement } from 'src/public/api-url-management';
import { ApiResult } from 'src/public/api-result';

@Injectable()
export class Service {
  constructor(public http: HttpClient) {}

  /**
   * 获取列表
   */
  GetAllotTasks(GetAllotTasks: GetAllotTasksModel): Observable<ApiResult<{}>> {
    return this.http.get(ApiUrlManagement.GetAllotTasks, {
      params: GetAllotTasks as {}
    });
  }
}

/**
 * 获取列表
 */
export interface GetAllotTasksModel extends PageData {
  orderBy?: string;
  search?: string;
  isDes?: string;
}

/**
 * 页码的Model
 */
export interface PageData {
  /**
   * 页数
   */
  pageIndex?: number;

  /**
   * 数量
   */
  pageSize?: number;
}
