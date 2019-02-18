import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { MenuComponent } from './menu/menu.component';
import { TaskListComponent } from './task-list/task-list.component';
import { Service } from 'src/services/service';
import { API_URL } from 'src/public/host-address';
import { AuthInterceptor } from 'src/public/http-interceptor';
import { RequestCache, RequestCacheWithMap } from 'src/public/request-cache';
import { ApiUrlManagement } from 'src/public/api-url-management';
import { TaskModelComponent } from './task-model/task-model.component';
import { MatDialogModule } from '@angular/material';
import { LogInComponent } from './log-in/log-in.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    TaskListComponent,
    TaskModelComponent,
    LogInComponent
  ],
  entryComponents: [TaskModelComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    Service,
    ErrorHandler,
    {
      provide: API_URL,
      useValue: ApiUrlManagement.api
    },
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }
    ],
    { provide: RequestCache, useClass: RequestCacheWithMap },
    { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
