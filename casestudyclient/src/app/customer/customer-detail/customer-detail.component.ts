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
import { Customer } from '../customer';
import { type } from 'cypress/types/jquery';
@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
})
export class CustomerDetailComponent implements OnInit {
  @Input() selectedCustomer: Customer = {
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
  @Input() customers: Customer[] | null = null;
  @Output() cancelled = new EventEmitter();
  @Output() deleted = new EventEmitter();
  @Output() saved = new EventEmitter();
  customerForm: FormGroup;
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
    this.customerForm = new FormGroup({
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
    this.customerForm.patchValue({
      name: this.selectedCustomer.name,
      address: this.selectedCustomer.address1,
      phone: this.selectedCustomer.phone,
      city: this.selectedCustomer.city,
      email: this.selectedCustomer.email,
      province: this.selectedCustomer.province,
      postalcode: this.selectedCustomer.postalcode,
      type: this.selectedCustomer.type,
    });
  } // ngOnInit
  updateSelectedCustomer(): void {
    this.selectedCustomer.name = this.customerForm.value.name;
    this.selectedCustomer.address1 = this.customerForm.value.address;
    this.selectedCustomer.city = this.customerForm.value.city;
    this.selectedCustomer.phone = this.customerForm.value.phone;
    this.selectedCustomer.email = this.customerForm.value.email;
    this.selectedCustomer.province = this.customerForm.value.province;
    this.selectedCustomer.postalcode = this.customerForm.value.postalcode;
    this.selectedCustomer.type = this.customerForm.value.type;
    this.saved.emit(this.selectedCustomer);
  }
} // CustomerDetailComponent
