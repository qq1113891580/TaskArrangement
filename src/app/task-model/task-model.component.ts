import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from 'src/services/service';
export interface DialogData {
  /** 执行的操作 */
  o: any;
  /** 数据 */
  d: any;
}

@Component({
  selector: 'app-task-model',
  templateUrl: './task-model.component.html',
  styleUrls: ['./task-model.component.scss']
})
export class TaskModelComponent implements OnInit {
  myForm: FormGroup;
  /** 控制模态框启动关闭 */
  isVisible = true;

  constructor(
    // 接收启动页传过来的数据
    @Inject(MAT_DIALOG_DATA) public mydata: DialogData,
    public dialogRef: MatDialogRef<TaskModelComponent>,
    private fb: FormBuilder,
    private service: Service
  ) {}

  ngOnInit() {
    this.initialFrom();
    console.log(this.mydata);
  }

  /** 模态框确定 */
  handleOk(): void {
    console.log('确定!');
    this.submitForm();
  }

  /** 模态框关闭 */
  handleCancel(): void {
    this.isVisible = false;
    // 关闭对话框，并传递通知消息
    this.dialogRef.close(false);
  }

  /** 表单初始化 */
  initialFrom() {
    if (this.mydata.o === '添加') {
      this.myForm = this.fb.group({
        // 登记时间
        RegisterTime: [null, [Validators.required]],
        // 工作类型 0,1,2,3,4,5
        TaskCategory: [0, [Validators.required]],
        // 所属模块
        Module: [null, [Validators.required]],
        // 描述
        Description: [null, [Validators.required]],
        // 状态 0,1,2
        TaskStatus: [1, [Validators.required]],
        // 处理人名字
        DisposerNames: [null, [Validators.required]],
        // 预计完成时间
        EstimatedTime: [null, [Validators.required]],
        // 实际完成时间
        ActualTime: [null, [Validators.required]],
        // 测试人员名字
        TesterNames: [null, [Validators.required]],
        // 备注
        Remark: [null, [Validators.required]]
      });
    } else if (this.mydata.o === '编辑') {
      this.myForm = this.fb.group({
        // 登记时间
        RegisterTime: [this.mydata.d.RegisterTime, [Validators.required]],
        // 工作类型 0,1,2,3,4,5
        TaskCategory: [this.mydata.d.TaskCategory, [Validators.required]],
        // 所属模块
        Module: [this.mydata.d.Module, [Validators.required]],
        // 描述
        Description: [this.mydata.d.Description, [Validators.required]],
        // 状态 0,1,2
        TaskStatus: [this.mydata.d.TaskStatus, [Validators.required]],
        // 处理人名字
        DisposerNames: [this.mydata.d.DisposerNames, [Validators.required]],
        // 预计完成时间
        EstimatedTime: [this.mydata.d.EstimatedTime, [Validators.required]],
        // 实际完成时间
        ActualTime: [this.mydata.d.ActualTime, [Validators.required]],
        // 测试人员名字
        TesterNames: [this.mydata.d.TesterNames, [Validators.required]],
        // 备注
        Remark: [this.mydata.d.Remark, [Validators.required]],
        // Id
        Id: [this.mydata.d.Id, [Validators.required]]
      });
    }
  }

  /** 提交表单 */
  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.myForm.controls) {
      this.myForm.controls[i].markAsDirty();
      this.myForm.controls[i].updateValueAndValidity();
    }
    if (this.myForm.valid) {
      // 格式化时间
      this.myForm.value.RegisterTime = this.ges(this.myForm.value.RegisterTime);
      this.myForm.value.EstimatedTime = this.ges(
        this.myForm.value.EstimatedTime
      );
      this.myForm.value.ActualTime = this.ges(this.myForm.value.ActualTime);

      if (this.mydata.o === '添加') {
        this.service.CreateAllotTask(this.myForm.value).subscribe(r => {
          this.isVisible = false;
          this.dialogRef.close(true);
        });
      } else if (this.mydata.o === '编辑') {
        this.service.UpdateAllotTask(this.myForm.value).subscribe(r => {
          this.isVisible = false;
          this.dialogRef.close(true);
        });
      }
    }
  }

  /** 格式化时间 */
  ges(t: string) {
    const d = new Date(t);
    const youWant =
      d.getFullYear() +
      '-' +
      (d.getMonth() + 1) +
      '-' +
      d.getDate() +
      ' ' +
      d.getHours() +
      ':' +
      d.getMinutes() +
      ':' +
      d.getSeconds();
    return youWant;
  }
}
