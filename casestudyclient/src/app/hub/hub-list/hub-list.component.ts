import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Hub } from '../hub';
@Component({
  selector: 'app-hub-list',
  template: `
    <mat-list-item
      *ngFor="let hub of hubs"
      layout="row"
      class="pad-xs mat-title"
      (click)="selected.emit(hub)"
    >
      {{ hub.id }} - {{ hub.name }},{{ hub.phone }}, {{ hub.email }}
    </mat-list-item>
  `,
})
export class HubListComponent {
  @Input() hubs?: Hub[];
  @Output() selected = new EventEmitter();
} // HubListComponent
