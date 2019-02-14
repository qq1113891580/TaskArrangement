// API Url统一管理数组
export const ApiUrlManagement = {
  // 请求头
  api: 'https://localhost:44321',
  // api: 'http://192.168.50.230:58888',

  /** 获取任务列表 */
  GetAllotTasks: '/api/AllotTask/GetAllotTasks',
  /** 添加 */
  CreateAllotTask: '/api/AllotTask/CreateAllotTask',
  /** 编辑 */
  UpdateAllotTask: '/api/AllotTask/UpdateAllotTask',
  /** 删除 */
  DeleteAllotTask: '/api/AllotTask/DeleteAllotTask',
  GetAllotTaskById: '/api/AllotTask/GetAllotTaskById'
};
