import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SystemService } from '../../services/system.service';
import { dayBook, SystemModel } from './../../row-generator/row-generator-interfaces';
import * as dayjs from 'dayjs';
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
  attachement: string;
  member: string;
  site: string;

  constructor(private systemService: SystemService) { }

  submitForm() {
    const startDate = this.range.controls.start.value;
    const endDate = this.range.controls.end.value;
    const type = this.selectedType;
    const comment = this.comment;
    const attachement = this.attachement;
    const member = this.member;
    const site = this.site;
    const systemModel: SystemModel = {
      member: 'zx0536',
      site: 'site',
      startDate,
      endDate,
      type,
      comment: 'comment',
      dateOfChange: new Date(),
      presence: 0,
      progress: 0,
      approved: 0,
      attachement: 'attachement' // <-- Corrected spelling
    };


    /*     this.systemService.postDate(systemModel).subscribe(response => {
          // handle response as needed
          console.log(response);
        }, error => {
          // handle error as needed
          console.error(error);
        }); */
  }


  ngOnInit(): void {
  }

  closeCard() { }
}
