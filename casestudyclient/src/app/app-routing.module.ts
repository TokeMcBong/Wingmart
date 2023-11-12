import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VendorHomeComponent } from './vendor/vendor-home/vendor-home.component';
import { CustomerHomeComponent } from './customer/customer-home/customer-home.component';
import { HubHomeComponent } from './hub/hub-home/hub-home.component';
import { ProductHomeComponent } from '@app/product/product-home/product-home.component';
import { GeneratorComponent } from '@app/purchaseorder/generator/generator.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Wingmart - Home' },
  {
    path: 'vendors',
    component: VendorHomeComponent,
    title: 'Wingmart - Vendors',
  },
  {
    path: 'customers',
    component: CustomerHomeComponent,
    title: 'Wingmart - Customers',
  },
  {
    path: 'hubs',
    component: HubHomeComponent,
    title: 'Wingmart - Hubs',
  },

  { path: '', component: HomeComponent, title: 'Wingmart - Home' },
  {
    path: 'products',
    component: ProductHomeComponent,
    title: 'Wingmart - Products',
  },
  { path: 'generator', component: GeneratorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
