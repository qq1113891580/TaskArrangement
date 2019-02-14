import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { MenuComponent } from './menu/menu.component';
import { TaskListComponent } from './task-list/task-list.component';
import { Service } from 'src/services/service';
import { API_URL } from 'src/public/host-address';
import { AuthInterceptor } from 'src/public/http-interceptor';
import { RequestCache, RequestCacheWithMap } from 'src/public/request-cache';
import { ApiUrlManagement } from 'src/public/api-url-management';
registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, MenuComponent, TaskListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
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
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
