import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from '../mat-components/mat-components.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerHomeComponent,
    CustomerDetailComponent,
  ],
  imports: [CommonModule, MatComponentsModule, ReactiveFormsModule],
})
export class CustomerModule {}
