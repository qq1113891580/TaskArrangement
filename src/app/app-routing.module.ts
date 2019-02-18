import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { LogInComponent } from './log-in/log-in.component';

const routes: Routes = [
  { path: '', redirectTo: 'TaskList', pathMatch: 'full' },
  { path: 'LogIn', component: LogInComponent },
  { path: 'TaskList', component: TaskListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
