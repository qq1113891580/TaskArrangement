import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-task-model',
  templateUrl: './task-model.component.html',
  styleUrls: ['./task-model.component.scss']
})
export class TaskModelComponent implements OnInit {
  @Inject(MAT_DIALOG_DATA)
  public data: DialogData;
  isVisible = true;

  constructor(public dialogRef: MatDialogRef<TaskModelComponent>) {}

  ngOnInit() {}

  handleOk(): void {
    console.log('确定!');
    this.isVisible = false;
    // 关闭对话框，并传递通知消息
    this.dialogRef.close('通知消息');
  }

  handleCancel(): void {
    console.log('取消!');
    this.isVisible = false;
    // 关闭对话框，并传递通知消息
    this.dialogRef.close('通知消息');
  }
}
