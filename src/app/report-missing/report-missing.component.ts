import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-report-missing',
  templateUrl: './report-missing.component.html',
  styleUrls: ['./report-missing.component.css']
})
export class ReportMissingComponent implements OnInit {


  step: string = 'start';
  reportForm : FormGroup;
  newDate = new Date();
  before3: boolean
  isToday: boolean

  constructor(private fb : FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.reportForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  yes(){
    let time = new Date().getHours();
    if (time < 15){
      this.before3 = true;
    } 
    this.isToday = true
    this.step = 'before7AM'
  }

  submit(){
    this.step = 'end';
  }

}
