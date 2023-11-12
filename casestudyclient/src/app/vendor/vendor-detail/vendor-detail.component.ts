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
import { Vendor } from '../vendor';
import { type } from 'cypress/types/jquery';
@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
})
export class VendorDetailComponent implements OnInit {
  @Input() selectedVendor: Vendor = {
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
  @Input() vendors: Vendor[] | null = null;
  @Output() cancelled = new EventEmitter();
  @Output() deleted = new EventEmitter();
  @Output() saved = new EventEmitter();
  vendorForm: FormGroup;
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
    this.vendorForm = new FormGroup({
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
    this.vendorForm.patchValue({
      name: this.selectedVendor.name,
      address: this.selectedVendor.address1,
      phone: this.selectedVendor.phone,
      city: this.selectedVendor.city,
      email: this.selectedVendor.email,
      province: this.selectedVendor.province,
      postalcode: this.selectedVendor.postalcode,
      type: this.selectedVendor.type,
    });
  } // ngOnInit
  updateSelectedVendor(): void {
    this.selectedVendor.name = this.vendorForm.value.name;
    this.selectedVendor.address1 = this.vendorForm.value.address;
    this.selectedVendor.city = this.vendorForm.value.city;
    this.selectedVendor.phone = this.vendorForm.value.phone;
    this.selectedVendor.email = this.vendorForm.value.email;
    this.selectedVendor.province = this.vendorForm.value.province;
    this.selectedVendor.postalcode = this.vendorForm.value.postalcode;
    this.selectedVendor.type = this.vendorForm.value.type;
    this.saved.emit(this.selectedVendor);
  }
} // VendorDetailComponent
