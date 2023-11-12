import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from '../mat-components/mat-components.module';
import { HubListComponent } from './hub-list/hub-list.component';
import { HubHomeComponent } from './hub-home/hub-home.component';
import { HubDetailComponent } from './hub-detail/hub-detail.component';
@NgModule({
  declarations: [HubListComponent, HubHomeComponent, HubDetailComponent],
  imports: [CommonModule, MatComponentsModule, ReactiveFormsModule],
})
export class HubModule {}
