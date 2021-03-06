import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from 'src/services/service';
import { NzMessageService } from 'ng-zorro-antd';
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
    private service: Service,
    private message: NzMessageService
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
        RegisterTime: [null],
        // 工作类型 0,1,2,3,4,5
        TaskCategory: [null],
        // 所属模块
        Module: [null],
        // 问题描述
        Description: [null, [Validators.required]],
        // 状态 0,1,2
        TaskStatus: [null],
        // 处理人名字
        DisposerNames: [null],
        // 预计完成时间
        EstimatedTime: [null],
        // 实际完成时间
        ActualTime: [null],
        // 测试人员名字
        TesterNames: [null],
        // 备注
        Remark: [null]
      });
    } else if (this.mydata.o === '编辑') {
      this.myForm = this.fb.group({
        // 登记时间
        RegisterTime: [this.mydata.d.RegisterTime],
        // 工作类型 0,1,2,3,4,5 因为html单选组件需要的是string类型的所以需要转换
        TaskCategory: [this.mydata.d.TaskCategory + ''],
        // 所属模块
        Module: [this.mydata.d.Module],
        // 问题描述
        Description: [this.mydata.d.Description, [Validators.required]],
        // 状态 0,1,2 因为html单选组件需要的是string类型的所以需要转换
        TaskStatus: [this.mydata.d.TaskStatus + ''],
        // 处理人名字
        DisposerNames: [this.mydata.d.DisposerNames],
        // 预计完成时间
        EstimatedTime: [this.mydata.d.EstimatedTime],
        // 实际完成时间
        ActualTime: [this.mydata.d.ActualTime],
        // 测试人员名字
        TesterNames: [this.mydata.d.TesterNames],
        // 备注
        Remark: [this.mydata.d.Remark],
        // Id
        Id: [this.mydata.d.Id]
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
      console.log(this.myForm.value);
      if (this.mydata.o === '添加') {
        this.service.CreateAllotTask(this.myForm.value).subscribe(r => {
          if (r.Status) {
            this.isVisible = false;
            this.dialogRef.close(true);
            // success error warning
            this.message.create('success', '添加成功');
          } else {
            this.message.create('error', '添加失败');
          }
        });
      } else if (this.mydata.o === '编辑') {
        this.service.UpdateAllotTask(this.myForm.value).subscribe(r => {
          if (r.Status) {
            this.isVisible = false;
            this.dialogRef.close(true);
            // success error warning
            this.message.create('success', '编辑成功');
          } else {
            this.message.create('error', '编辑失败');
          }
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
