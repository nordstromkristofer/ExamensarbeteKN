import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AbsentListComponent } from '../../calendar/calendar-view/absent-list/absent-list.component';
import { LeaveRequestComponent } from '../../calendar/calendar-view/leave-request/leave-request.component';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  onLeaveRequestClick() {
    const dialogRef = this.dialog.open(LeaveRequestComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close();
    });
  }


  absentListClick() {

    const dialogRef = this.dialog.open(AbsentListComponent, {
      width: '1000px',
      height: '1000px',
      disableClose: true
    });

    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close();
    });


  }




  logout() {
    this.authService.logout();
    location.reload();

  }



  ngOnInit(): void {

  }

}
