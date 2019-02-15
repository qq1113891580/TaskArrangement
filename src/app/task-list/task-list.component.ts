import { Component, OnInit } from '@angular/core';
import { Service, GetAllotTasksModel } from 'src/services/service';
import { MatDialog } from '@angular/material/dialog';
import { TaskModelComponent } from '../task-model/task-model.component';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  mylist = [];
  /** 搜索内容 */
  search = '';
  /** 总条数 */
  TotalCount = 0;
  /** 列表加载loading */
  listloading = true;
  /** 请求任务列表接口所需的数据 */
  GAT: GetAllotTasksModel = {
    // search: '',
    pageIndex: 0,
    pageSize: 10
  };
  /** 列表绑定页数，因为后台传回来的页数是从0开始的 */
  pageIndex = 1;

  constructor(
    public service: Service,
    public dialog: MatDialog,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.GetAllotTasks();
  }

  /** 搜索 */
  listsearch(search: string) {
    this.GAT.search = search;
    this.pageIndex = 1;
    console.log(this.GAT.search);
    this.GetAllotTasks();
  }

  /** 获取任务列表 */
  GetAllotTasks() {
    this.listloading = true;
    this.GAT.pageIndex = this.pageIndex;
    --this.GAT.pageIndex;
    this.service.GetAllotTasks(this.GAT).subscribe(r => {
      if (r.Status) {
        this.mylist = r.Info.Data;
        this.TotalCount = r.Info.TotalCount;
        this.listloading = false;
      }
    });
  }

  /** 开启模态框 */
  openDialog(operation: string, data: any): void {
    const dialogRef = this.dialog.open(TaskModelComponent, {
      data: { o: operation, d: data }
    });
    // 关闭对话框之后处理消息。此方法返回一个可观察对象，通过订阅这个可观察对
    // 象来处理对话框返回的通知消息。
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.GetAllotTasks();
      }
    });
  }

  /** 删除 */
  delete(Id: string) {
    this.service.DeleteAllotTask({ allotTaskId: Id }).subscribe(r => {
      if (r.Status) {
        // 当前页数据删完返回上一页
        if (this.mylist.length === 1) {
          this.pageIndex--;
        }
        this.GetAllotTasks();
      } else {
        this.message.create('error', '删除失败');
      }
    });
  }
}
