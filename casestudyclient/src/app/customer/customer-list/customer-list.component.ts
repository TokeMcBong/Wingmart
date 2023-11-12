import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from '../customer';
@Component({
  selector: 'app-customer-list',
  template: `
    <mat-list-item
      *ngFor="let customer of customers"
      layout="row"
      class="pad-xs mat-title"
      (click)="selected.emit(customer)"
    >
      {{ customer.id }} - {{ customer.name }},{{ customer.phone }},
      {{ customer.email }}
    </mat-list-item>
  `,
})
export class CustomerListComponent {
  @Input() customers?: Customer[];
  @Output() selected = new EventEmitter();
} // CustomerListComponent
