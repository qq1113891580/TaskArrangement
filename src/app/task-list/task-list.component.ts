import { Component, OnInit } from '@angular/core';
import { Service, GetAllotTasksModel } from 'src/services/service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  mylist = [];
  GAT: GetAllotTasksModel = {
    search: '',
    pageIndex: 1,
    pageSize: 100
  };

  constructor(public service: Service) {
    this.service.GetAllotTasks(this.GAT).subscribe(v => {});
  }

  ngOnInit() {}
}
