import { Component, OnInit } from '@angular/core';
import {IpApiService} from '../../api/ip-api';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PersonInfo} from '../../model/person-info.model';

@Component({
  selector: 'app-person-data',
  templateUrl: './person-data.component.html',
  styleUrls: ['./person-data.component.scss']
})
export class PersonDataComponent implements OnInit {

  formGroup: FormGroup;

  personInfo: PersonInfo | undefined;

  constructor(private ipApiService: IpApiService) {

    this.formGroup = new FormGroup({
      'ip': new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {

  }

  submit() {
    const ipControl = this.formGroup.controls['ip']

    if (ipControl.valid) {
      this.ipApiService.getPersonInfo(ipControl.value).subscribe((data) => {
        this.personInfo = data;
      })
    }
  }

  get ipFormControl() {
    return this.formGroup.controls['ip'];
  }
}
