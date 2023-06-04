import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { AppComponent } from './app.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CalendarScrollComponent } from './calendar/calendar-view/calendar-scroll.component'
import { SkipInterceptorService } from './core/skip-interceptor.service'
import { LoginComponent } from './core/login/login.component';
import { AppRoutingModule } from './app.routing.module';

import { MatPaginatorModule } from '@angular/material/paginator';
import { HeaderComponent } from './core/header/header.component';
import { LoginHeaderComponent } from './core/login/loginheader/login-header.component';








@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    LoginHeaderComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MaterialModule,
    CommonModule
  ],
  providers: [CalendarScrollComponent, SkipInterceptorService, HeaderComponent, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
