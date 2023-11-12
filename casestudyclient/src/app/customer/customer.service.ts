import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '@app/customer/customer';
import { GenericHttpService } from '@app/generic-http.service';
@Injectable({
  providedIn: 'root',
})
export class CustomerService extends GenericHttpService<Customer> {
  constructor(httpClient: HttpClient) {
    super(httpClient, `customers`);
  } // constructor
} // CustomerService
