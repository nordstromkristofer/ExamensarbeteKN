import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SystemService } from '../../services/system.service';
import { dayBook } from './../../row-generator/row-generator-interfaces';
import * as dayjs from 'dayjs';
import { HeaderComponent } from '../../../core/header/header.component';
import { AbsentRequest } from '../../services/service-interfaces';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/user-service';
import { User } from '../../services/service-interfaces';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-absent-list',
  templateUrl: './absent-list.component.html',
  styleUrls: ['./absent-list.component.css']
})
export class AbsentListComponent implements OnInit {

  allRequests: AbsentRequest[] = [];
  displayedColumns: string[] = ['member', 'type', 'startDate', 'endDate', 'comment', 'approve', 'delete'];
  dataSource: MatTableDataSource<AbsentRequest>;
  pageSizeOptions: number[] = [-1, 5, 10, 25, 100, 250];
  pageLength: number;
  pageSize: number;

  users: User[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private systemService: SystemService,
    private userService: UserService,
    private paginatorIntl: MatPaginatorIntl
  ) {
    this.dataSource = new MatTableDataSource<AbsentRequest>(this.allRequests);
    this.paginatorIntl.itemsPerPageLabel = 'Resultat per sida';
  }

  ngOnInit(): void {
    this.systemService.getRequests().subscribe((data) => {
      this.allRequests = data;
      this.dataSource.data = this.allRequests;
      this.pageLength = this.allRequests.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.userService.getUsers().subscribe((data) => {
        this.users = data;
      });
    });
  }

  getUserName(member: string): string {
    const user = this.users?.find(user => user.employeeId === member);
    return user ? user.userName : member;
  }

  selectedTeam: string = '0';
  filterTeam(selectedTeam): void {
    this.userService.getUsersByTeam(selectedTeam).subscribe((data) => {
      this.users = data;
    });
  }

  getRequestType(type: number): string {
    switch (type) {
      case 1:
        return "Semester";
      case 2:
        return "Flexledigt";
      case 3:
        return "Föräldraledigt";
      case 4:
        return "Tjänstledigt";
      case 5:
        return "Permission";
      case 6:
        return "Långtidssjukskriven";
      case 7:
        return "Utbildning";
      case 8:
        return "Halvdag";
      case 9:
        return "Sjukdom";
      case 10:
        return "Kunduppdrag";
      case 11:
        return "VAB";
      case 12:
        return "Uttag övertid";
      default:
        return "";
    }
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize === -1 ? this.dataSource.data.length : event.pageSize;
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.paginator.page.emit(event);
  }

  approveRequest(request: AbsentRequest): void {
    const approved = request.approved === 0 ? 1 : 0;
    this.systemService.approveRequest(request.id, approved).subscribe(() => {
      // Update the request in the dataSource
      const index = this.allRequests.findIndex(r => r.id === request.id);
      if (index !== -1) {
        this.allRequests[index].approved = approved;
        this.dataSource.data = this.allRequests;
      }
    });
  }

  deleteRequest(request: AbsentRequest): void {
    this.systemService.deleteRequest(request.id).subscribe(() => {
      // Remove the request from the dataSource
      this.allRequests = this.allRequests.filter(r => r.id !== request.id);
      this.dataSource.data = this.allRequests;
    });
  }
}
