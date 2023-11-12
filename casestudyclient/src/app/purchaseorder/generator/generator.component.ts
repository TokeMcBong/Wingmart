import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatComponentsModule } from '@app/mat-components/mat-components.module';
import { PurchaseOrder } from '@app/purchaseorder/purchaseorder';
import { PurchaseOrderItem } from '@app/purchaseorder/purchaseorder-item';
import { PurchaseOrderService } from '@app/purchaseorder/purchaseorder.service';
import { Vendor } from '@app/vendor/vendor';
import { VendorService } from '@app/vendor/vendor.service';
import { Product } from '@app/product/product';
import { ProductService } from '@app/product/product.service';
import { PDFURL } from '@app/constants';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [CommonModule, MatComponentsModule, ReactiveFormsModule],
  templateUrl: './generator.component.html',
})
export class GeneratorComponent implements OnInit, OnDestroy {
  // form
  generatorForm: FormGroup;
  vendorid: FormControl;
  productid: FormControl;
  // data
  formSubscription?: Subscription;
  orderQty: number = 0;
  products: Product[] = []; // everybody's products
  vendors: Vendor[] = []; // all vendors
  vendorproducts: Product[] = []; // all products for a particular vendor
  items: PurchaseOrderItem[] = []; // product items that will be in purchaseorder
  selectedproducts: Product[] = []; // products that being displayed currently in app
  selectedProduct: Product; // the current selected product
  selectedVendor: Vendor; // the current selected vendor
  // misc
  pickedProduct: boolean;
  pickedVendor: boolean;
  generated: boolean;
  hasProducts: boolean;
  msg: string;
  total: number;
  purchaseorderno: number = 0;
  orderqty: number = 0;
  item: PurchaseOrderItem = {
    id: 0,
    poid: 0,
    productid: '0',
    qty: 0,
    price: 0.0,
  };
  constructor(
    private builder: FormBuilder,
    private vendorService: VendorService,
    private productService: ProductService,
    private purchaseorderService: PurchaseOrderService
  ) {
    this.pickedVendor = false;
    this.pickedProduct = false;
    this.generated = false;
    this.msg = '';
    this.vendorid = new FormControl('');
    this.productid = new FormControl('');
    this.generatorForm = this.builder.group({
      productid: this.productid,
      vendorid: this.vendorid,
      orderqty: this.orderqty,
    });
    this.selectedProduct = {
      id: '',
      vendorid: 0,
      name: '',
      costprice: 0,
      msrp: 0,
      rop: 0,
      eoq: 0,
      qoh: 0,
      qoo: 0,
      qrcode: '',
      qrcodetxt: '',
    };
    this.selectedVendor = {
      id: 0,
      name: '',
      address1: '',
      city: '',
      province: '',
      postalcode: '',
      phone: '',
      type: '',
      email: '',
    };
    this.hasProducts = false;
    this.total = 0.0;
  } // constructor
  ngOnInit(): void {
    this.onPickVendor(); // sets up subscription for dropdown click
    this.onPickProduct(); // sets up subscription for dropdown click
    this.onPickQuantity();
    this.msg = 'loading vendors from server...';
    this.getAllVendors();
  } // ngOnInit
  ngOnDestroy(): void {
    if (this.formSubscription !== undefined) {
      this.formSubscription.unsubscribe();
    }
  } // ngOnDestroy
  /**
   * getAllVendors - retrieve everything
   */
  getAllVendors(passedMsg: string = ''): void {
    this.vendorService.getAll().subscribe({
      // Create observer object
      next: (vendors: Vendor[]) => {
        this.vendors = vendors;
      },
      error: (err: Error) =>
        (this.msg = `Couldn't get vendors - ${err.message}`),
      complete: () =>
        passedMsg ? (this.msg = passedMsg) : (this.msg = `Vendors loaded!`),
    });
  } // getAllVendors
  /**
   * loadVendorProducts - retrieve a particular vendor's products
   */
  loadVendorProducts(): void {
    this.vendorproducts = [];
    this.productService.getSome(this.selectedVendor.id).subscribe({
      // observer object
      next: (products: Product[]) => {
        this.vendorproducts = products;
      },
      error: (err: Error) =>
        (this.msg = `product fetch failed! - ${err.message}`),
      complete: () => {},
    });
  } // loadVendorProducts
  /**
   * onPickVendor - Another way to use Observables, subscribe to the select change event
   * then load specific vendor products for subsequent selection
   */
  onPickVendor(): void {
    this.formSubscription = this.generatorForm
      .get('vendorid')
      ?.valueChanges.subscribe((val) => {
        this.selectedProduct = {
          id: '',
          vendorid: 0,
          name: '',
          costprice: 0,
          msrp: 0,
          rop: 0,
          eoq: 0,
          qoh: 0,
          qoo: 0,
          qrcode: '',
          qrcodetxt: '',
        };
        this.selectedVendor = val;
        this.loadVendorProducts();
        this.pickedProduct = false;
        this.hasProducts = false;
        this.msg = 'choose product for vendor';
        this.pickedVendor = true;
        this.generated = false;
        this.items = []; // array for the purchaseorder
        this.selectedproducts = []; // array for the details in app html
      });
  } // onPickVendor
  /**
   * onPickProduct - subscribe to the select change event then
   * update array containing items.
   */
  onPickProduct(): void {
    const productSubscription = this.generatorForm
      .get('productid')
      ?.valueChanges.subscribe((val) => {
        this.selectedProduct = val;
        this.item = {
          id: 0,
          poid: 0,
          productid: this.selectedProduct?.id,
          qty: 0,
          price: 0.0,
        };
        if (
          this.items.find((item) => item.productid === this.selectedProduct?.id)
        ) {
          // ignore entry
        } else {
          // add entry
          //this.items.push(item);
          //this.selectedproducts.push(this.selectedProduct);
          this.pickedProduct = true;
        }
        if (this.items.length > 0) {
          this.hasProducts = true;
        }
        this.total = 0.0;
        this.selectedproducts.forEach((exp) => (this.total += exp.costprice));
      });

    this.formSubscription?.add(productSubscription);
  } // onPickProduct
  onPickQuantity(): void {
    const quantitySubscription = this.generatorForm
      .get('orderqty')
      ?.valueChanges.subscribe((val) => {
        this.item.qty = val;
        if (
          this.items.find(
            (item) => item.productid === this.selectedProduct?.id
          ) &&
          this.item.qty !== 0
        ) {
          // ignore entry
          const index = this.items.indexOf(this.item, 0);
          if (index > -1) {
            this.items.splice(index, 1);
            this.items.push(this.item);
            this.pickedProduct = true;
          }
        } else if (this.item.qty === 0) {
          const index = this.items.indexOf(this.item, 0);
          if (index > -1) {
            this.items.splice(index, 1);
          }
          const secindex = this.selectedproducts.indexOf(
            this.selectedProduct,
            0
          );
          if (secindex > -1) {
            this.selectedproducts.splice(secindex, 1);
          }
        } else {
          // add entry
          this.item.qty = val;
          this.items.push(this.item);
          this.selectedproducts.push(this.selectedProduct);
          this.pickedProduct = true;
        }
        if (this.items.length > 0) {
          this.hasProducts = true;
        }
        //this.total = 0.0;
        this.selectedproducts.forEach(
          (exp) => (this.total += exp.costprice * this.item.qty)
        );
      });
    this.formSubscription?.add(quantitySubscription);
  }
  viewPdf(): void {
    window.open(`${PDFURL}${this.purchaseorderno}`, '');
  } // viewPdf
  /**
   * createPurchaseOrder - create the client side purchaseorder
   */
  createPurchaseOrder(): void {
    this.generated = false;
    const purchaseorder: PurchaseOrder = {
      id: 0,
      items: this.items,
      vendorid: this.selectedProduct.vendorid,
      amount: this.total,
    };
    this.purchaseorderService.create(purchaseorder).subscribe({
      // observer object
      next: (purchaseorder: PurchaseOrder) => {
        // server should be returning purchaseorder with new id
        purchaseorder.id > 0
          ? (this.msg = `PurchaseOrder ${purchaseorder.id} added!`)
          : (this.msg = 'PurchaseOrder not added! - server error');
        this.purchaseorderno = purchaseorder.id;
      },
      error: (err: Error) =>
        (this.msg = `PurchaseOrder not added! - ${err.message}`),
      complete: () => {
        this.hasProducts = false;
        this.pickedVendor = false;
        this.pickedProduct = false;
        this.generated = true;
      },
    });
  } // createPurchaseOrder
} // GeneratorComponent
