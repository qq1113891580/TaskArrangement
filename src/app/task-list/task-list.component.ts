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
  animal: string;
  name: string;
  GAT: GetAllotTasksModel = {
    search: '',
    pageIndex: 1,
    pageSize: 100
  };

  constructor(public service: Service, public dialog: MatDialog) {
    this.service.GetAllotTasks(this.GAT).subscribe(v => {});
  }

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskModelComponent, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });
    // 关闭对话框之后处理消息。此方法返回一个可观察对象，通过订阅这个可观察对
    // 象来处理对话框返回的通知消息。
    dialogRef.afterClosed().subscribe(result => {
      console.log('模态框已关闭');
      this.animal = result;
    });
  }
}
