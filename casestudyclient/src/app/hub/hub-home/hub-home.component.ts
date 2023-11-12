import { Component, OnInit } from '@angular/core';
import { Hub } from '../hub';
import { HubService } from '@app/hub/hub.service';
@Component({
  templateUrl: 'hub-home.component.html',
})
export class HubHomeComponent implements OnInit {
  msg: string;
  hub: Hub;
  hubs: Hub[] = [];
  hideEditForm: boolean;
  todo: string;
  constructor(public hubService: HubService) {
    this.hub = {
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
  select(hub: Hub): void {
    this.todo = 'update';
    this.hub = hub;
    this.msg = `${hub.name} selected`;
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
  update(hub: Hub): void {
    this.hubService.update(hub).subscribe({
      // Create observer object
      next: (emp: Hub) => {
        this.msg = `Hub ${emp.id} updated!`;
      },
      error: (err: Error) => (this.msg = `Update failed! - ${err.message}`),
      complete: () => (this.hideEditForm = !this.hideEditForm),
    });
  } // update
  /**
   * getAll - retrieve everything
   */
  getAll(passedMsg: string = ''): void {
    this.hubService.getAll().subscribe({
      // Create observer object
      next: (emps: Hub[]) => {
        this.hubs = emps;
      },
      error: (err: Error) => (this.msg = `Couldn't get hubs - ${err.message}`),
      complete: () =>
        passedMsg ? (this.msg = passedMsg) : (this.msg = `Hubs loaded!`),
    });
  } // getAll
  /**
   * save - determine whether we're doing and add or an update
   */
  save(hub: Hub): void {
    hub.id ? this.update(hub) : this.add(hub);
  } // save
  /**
   * add - send hub to service, receive new hub back
   */
  add(hub: Hub): void {
    hub.id = 0;
    this.hubService.create(hub).subscribe({
      // Create observer object
      next: (emp: Hub) => {
        this.getAll(`Hub ${emp.id} added!`);
      },
      error: (err: Error) => (this.msg = `Hub not added! - ${err.message}`),
      complete: () => (this.hideEditForm = !this.hideEditForm), // this calls unsubscribe
    });
  } // add
  /**
   * delete - send hub id to service for deletion
   */
  delete(hub: Hub): void {
    this.hubService.delete(hub.id).subscribe({
      // Create observer object
      next: (numOfHubsDeleted: number) => {
        let msg: string = '';
        numOfHubsDeleted === 1
          ? (msg = `Hub ${hub.name} deleted!`)
          : (msg = `Hub ${hub.name} not deleted!`);
        this.getAll(msg);
      },
      error: (err: Error) => (this.msg = `Delete failed! - ${err.message}`),
      complete: () => (this.hideEditForm = !this.hideEditForm),
    });
  } // delete
  /**
   * newHub - create new hub instance
   */
  newHub(): void {
    this.hub = {
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
    this.msg = 'New Hub';
  } // newHub
} // HubHomeComponent
