import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SystemService } from '../../services/system.service';
import { dayBook, SystemModel } from './../../row-generator/row-generator-interfaces';
import { HeaderComponent } from '../../../core/header/header.component';
import { HttpHeaders } from '@angular/common/http';

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

  constructor(private systemService: SystemService) { }

  submitForm() {
    const startDate = this.range.controls.start.value;
    const endDate = this.range.controls.end.value;
    const type = this.selectedType;
    const comment = this.comment;
    const member = this.member;
    const systemModel: SystemModel = {
      member: 'ze0123',
      startDate: startDate,
      endDate: endDate,
      approved: 0,
      type: 0,
      comment: 'comment',
      dateOfChange: new Date(),
    };

    this.systemService.submitData(systemModel).subscribe(response => {
      // handle response as needed
      console.log(response);
    }, error => {
      // handle error as needed
      console.error(error);
    });
  }



  ngOnInit(): void {
  }

  closeCard() { }
}
