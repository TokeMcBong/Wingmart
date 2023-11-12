import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '@app/customer/customer.service';
@Component({
  templateUrl: 'customer-home.component.html',
})
export class CustomerHomeComponent implements OnInit {
  msg: string;
  customer: Customer;
  customers: Customer[] = [];
  hideEditForm: boolean;
  todo: string;
  constructor(public customerService: CustomerService) {
    this.customer = {
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
    this.msg = '';
    this.hideEditForm = true;
    this.todo = '';
  } // constructor
  ngOnInit(): void {
    this.getAll();
  } // ngOnInit
  select(customer: Customer): void {
    this.todo = 'update';
    this.customer = customer;
    this.msg = `${customer.name} selected`;
    this.hideEditForm = !this.hideEditForm;
  } // select
  /**
   * cancelled - event handler for cancel button
   */
  cancel(msg?: string): void {
    msg ? (this.msg = 'Operation cancelled') : null;
    this.hideEditForm = !this.hideEditForm;
  } // cancel
  /**
   * update - send changed update to service
   */
  update(customer: Customer): void {
    this.customerService.update(customer).subscribe({
      // Create observer object
      next: (emp: Customer) => {
        this.msg = `Customer ${emp.id} updated!`;
      },
      error: (err: Error) => (this.msg = `Update failed! - ${err.message}`),
      complete: () => (this.hideEditForm = !this.hideEditForm),
    });
  } // update
  /**
   * getAll - retrieve everything
   */
  getAll(passedMsg: string = ''): void {
    this.customerService.getAll().subscribe({
      // Create observer object
      next: (emps: Customer[]) => {
        this.customers = emps;
      },
      error: (err: Error) =>
        (this.msg = `Couldn't get customers - ${err.message}`),
      complete: () =>
        passedMsg ? (this.msg = passedMsg) : (this.msg = `Customers loaded!`),
    });
  } // getAll
  /**
   * save - determine whether we're doing and add or an update
   */
  save(customer: Customer): void {
    customer.id ? this.update(customer) : this.add(customer);
  } // save
  /**
   * add - send customer to service, receive new customer back
   */
  add(customer: Customer): void {
    customer.id = 0;
    this.customerService.create(customer).subscribe({
      // Create observer object
      next: (emp: Customer) => {
        this.getAll(`Customer ${emp.id} added!`);
      },
      error: (err: Error) =>
        (this.msg = `Customer not added! - ${err.message}`),
      complete: () => (this.hideEditForm = !this.hideEditForm), // this calls unsubscribe
    });
  } // add
  /**
   * delete - send customer id to service for deletion
   */
  delete(customer: Customer): void {
    this.customerService.delete(customer.id).subscribe({
      // Create observer object
      next: (numOfCustomersDeleted: number) => {
        let msg: string = '';
        numOfCustomersDeleted === 1
          ? (msg = `Customer ${customer.name} deleted!`)
          : (msg = `Customer ${customer.name} not deleted!`);
        this.getAll(msg);
      },
      error: (err: Error) => (this.msg = `Delete failed! - ${err.message}`),
      complete: () => (this.hideEditForm = !this.hideEditForm),
    });
  } // delete
  /**
   * newCustomer - create new customer instance
   */
  newCustomer(): void {
    this.customer = {
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
    this.hideEditForm = !this.hideEditForm;
    this.msg = 'New Customer';
  } // newCustomer
} // CustomerHomeComponent
