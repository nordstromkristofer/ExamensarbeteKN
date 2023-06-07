import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SystemService } from '../../services/system.service';
import { dayBook, SystemModel } from './../../row-generator/row-generator-interfaces';
import { HeaderComponent } from '../../../core/header/header.component';
import { HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';


@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(null, Validators.required),
    end: new FormControl(null, Validators.required),
  });

  id: number;
  selectedType: number;
  comment: string;
  member: string;

  constructor(private systemService: SystemService, private datePipe: DatePipe, private location: Location) { }

  submitForm() {
    const startDate = this.datePipe.transform(this.range.controls.start.value, 'yyyy-MM-ddT00:00:00');
    const endDate = this.datePipe.transform(this.range.controls.end.value, 'yyyy-MM-ddT00:00:00');
    const type = this.selectedType;
    const comment = this.comment;
    const member = this.member;

    const dateOfChange = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss');


    const systemModel: SystemModel = {
      member: 'zn0895',
      startDate: startDate,
      endDate: endDate,
      approved: 0,
      type: 0,
      comment: 'comment',
      dateOfChange: dateOfChange,
    };

    this.systemService.submitData(systemModel).subscribe(response => {
      // handle response as needed
      console.log('response:', response);
      this.reloadPage(); // Reload the page
    }, error => {
      // handle error as needed
      console.error(error);
    });
  }

  reloadPage() {
    window.location.reload();
  }



  ngOnInit(): void {
  }

  closeCard() { }
}
