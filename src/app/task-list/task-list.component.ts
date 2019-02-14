import { Component, OnInit } from '@angular/core';
import { Service, GetAllotTasksModel } from 'src/services/service';
import { MatDialog } from '@angular/material/dialog';
import { TaskModelComponent } from '../task-model/task-model.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  mylist = [];
  /** 请求任务列表接口所需的数据 */
  GAT: GetAllotTasksModel = {
    // search: '',
    pageIndex: 0,
    pageSize: 100
  };

  constructor(public service: Service, public dialog: MatDialog) {}

  ngOnInit() {
    this.GetAllotTasks();
  }

  /** 获取任务列表 */
  GetAllotTasks() {
    this.service.GetAllotTasks(this.GAT).subscribe(r => {
      if (r.Status) {
        this.mylist = r.Info.Data;
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
        this.GetAllotTasks();
      }
    });
  }
}
