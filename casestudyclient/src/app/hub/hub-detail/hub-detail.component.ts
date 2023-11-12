import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ValidatePhone } from '@app/validators/phone.validator';
import { ValidateEmail } from '@app/validators/email.validator';
import { ValidatePostalcode } from '@app/validators/postalcode.validator';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Hub } from '../hub';
import { type } from 'cypress/types/jquery';
@Component({
  selector: 'app-hub-detail',
  templateUrl: './hub-detail.component.html',
})
export class HubDetailComponent implements OnInit {
  @Input() selectedHub: Hub = {
    id: 0,
    name: '',
    address1: '',
    city: '',
    phone: '',
    email: '',
    province: '',
    postalcode: '',
    type: '',
  };
  @Input() hubs: Hub[] | null = null;
  @Output() cancelled = new EventEmitter();
  @Output() deleted = new EventEmitter();
  @Output() saved = new EventEmitter();
  hubForm: FormGroup;
  name: FormControl;
  address: FormControl;
  city: FormControl;
  phone: FormControl;
  email: FormControl;
  province: FormControl;
  postalcode: FormControl;
  type: FormControl;

  constructor(private builder: FormBuilder) {
    this.name = new FormControl('', Validators.compose([Validators.required]));
    this.address = new FormControl(
      '',
      Validators.compose([Validators.required])
    );
    this.city = new FormControl('', Validators.compose([Validators.required]));
    this.phone = new FormControl(
      '',
      Validators.compose([Validators.required, ValidatePhone])
    );
    this.email = new FormControl(
      '',
      Validators.compose([Validators.required, ValidateEmail])
    );
    this.province = new FormControl(
      '',
      Validators.compose([Validators.required])
    );
    this.postalcode = new FormControl(
      '',
      Validators.compose([Validators.required, ValidatePostalcode])
    );
    this.type = new FormControl('', Validators.compose([Validators.required]));
    this.hubForm = new FormGroup({
      name: this.name,
      address: this.address,
      phone: this.phone,
      city: this.city,
      email: this.email,
      province: this.province,
      postalcode: this.postalcode,
      type: this.type,
    });
  } // constructor
  ngOnInit(): void {
    // patchValue doesn’t care if all values present
    this.hubForm.patchValue({
      name: this.selectedHub.name,
      address: this.selectedHub.address1,
      phone: this.selectedHub.phone,
      city: this.selectedHub.city,
      email: this.selectedHub.email,
      province: this.selectedHub.province,
      postalcode: this.selectedHub.postalcode,
      type: this.selectedHub.type,
    });
  } // ngOnInit
  updateSelectedHub(): void {
    this.selectedHub.name = this.hubForm.value.name;
    this.selectedHub.address1 = this.hubForm.value.address;
    this.selectedHub.city = this.hubForm.value.city;
    this.selectedHub.phone = this.hubForm.value.phone;
    this.selectedHub.email = this.hubForm.value.email;
    this.selectedHub.province = this.hubForm.value.province;
    this.selectedHub.postalcode = this.hubForm.value.postalcode;
    this.selectedHub.type = this.hubForm.value.type;
    this.saved.emit(this.selectedHub);
  }
} // HubDetailComponent
