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

  /**
   * 添加任务
   */
  CreateAllotTask(
    CreateAllotTask: CreateAllotTaskModel
  ): Observable<ApiResult<{}>> {
    return this.http.post(ApiUrlManagement.CreateAllotTask, CreateAllotTask);
  }

  /**
   * 编辑任务
   */
  UpdateAllotTask(
    UpdateAllotTask: UpdateAllotTaskModel
  ): Observable<ApiResult<{}>> {
    return this.http.post(ApiUrlManagement.UpdateAllotTask, UpdateAllotTask);
  }

  /**
   * 删除任务
   */
  DeleteAllotTask(
    DeleteAllotTask: DeleteAllotTaskModel
  ): Observable<ApiResult<{}>> {
    return this.http.post(ApiUrlManagement.DeleteAllotTask, DeleteAllotTask);
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
 * 添加任务
 */
export interface CreateAllotTaskModel {
  // 登记时间
  RegisterTime?: string;
  // 工作类型
  TaskCategory?: string;
  // 所属模块
  Module?: string;
  // 描述
  Description?: string;
  // 状态
  TaskStatus?: string;
  // 处理人名字
  DisposerNames?: string;
  // 预计完成时间
  EstimatedTime?: string;
  // 实际完成时间
  ActualTime?: string;
  // 测试人员名字
  TesterNames?: string;
  // 备注
  Remark?: string;
}

/**
 * 编辑任务
 */
export interface UpdateAllotTaskModel extends CreateAllotTaskModel {
  Id?: string;
}

/**
 * 删除任务
 */
export interface DeleteAllotTaskModel {
  allotTaskId?: string;
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
