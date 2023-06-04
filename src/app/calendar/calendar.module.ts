import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common'
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { CalendarComponent } from './calendar.component';
import { DateFormatPipe } from './date-format.pipe';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';

import { CalendarScrollComponent } from './calendar-view/calendar-scroll.component'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from '../material.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RowGeneratorComponent } from './row-generator/row-generator.component';
import { LeaveRequestComponent } from './calendar-view/leave-request/leave-request.component';
import { EmployeeFilterPipe } from './calendar-view/filter-pipe';
import { AbsentListComponent } from './calendar-view/absent-list/absent-list.component';



const routes: Routes = [
  { path: '', component: RowGeneratorComponent },

];

@NgModule({
  declarations: [
    CalendarComponent,
    RowGeneratorComponent,
    DateFormatPipe,
    CalendarViewComponent,
    LeaveRequestComponent,
    AbsentListComponent,
    EmployeeFilterPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatCardModule,
    MaterialModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DatePipe],
  bootstrap: [CalendarComponent]
})
export class CalendarModule { }
