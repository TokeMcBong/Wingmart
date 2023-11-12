import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from '@app/mat-components/mat-components.module';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Product } from '@app/product/product';
import { Vendor } from '@app/vendor/vendor';
import { CommonModule } from '@angular/common';
import { ValidateInteger } from '@app/validators/integer.validator';
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatComponentsModule],
  templateUrl: './product-detail.component.html',
  styles: [],
})
export class ProductDetailComponent implements OnInit {
  // setter
  @Input() selectedProduct: Product = {
    id: '',
    vendorid: 0,
    name: '',
    costprice: 0.0,
    msrp: 0,
    rop: 0,
    eoq: 0,
    qoh: 0,
    qoo: 0,
    qrcode: '',
    qrcodetxt: '',
  };
  @Input() vendors: Vendor[] | null = null;
  @Input() products: Product[] | null = null;
  @Output() cancelled = new EventEmitter();
  @Output() saved = new EventEmitter();
  @Output() deleted = new EventEmitter();
  productForm: FormGroup;
  vendorid: FormControl;
  id: FormControl;
  name: FormControl;
  costprice: FormControl;
  msrp: FormControl;
  rop: FormControl;
  eoq: FormControl;
  qoh: FormControl;
  qoo: FormControl;
  qrcode: FormControl;
  qrcodetxt: FormControl;
  constructor(private builder: FormBuilder) {
    this.vendorid = new FormControl(
      '',
      Validators.compose([Validators.required])
    );
    this.id = new FormControl('');
    this.name = new FormControl('', Validators.compose([Validators.required]));
    this.costprice = new FormControl(
      '',
      Validators.compose([Validators.required])
    );
    this.msrp = new FormControl('', Validators.compose([Validators.required]));
    this.rop = new FormControl(
      '',
      Validators.compose([Validators.required, ValidateInteger])
    );
    this.eoq = new FormControl(
      '',
      Validators.compose([Validators.required, ValidateInteger])
    );
    this.rop = new FormControl(
      '',
      Validators.compose([Validators.required, ValidateInteger])
    );
    this.qoh = new FormControl(
      '',
      Validators.compose([Validators.required, ValidateInteger])
    );
    this.qoo = new FormControl(
      '',
      Validators.compose([Validators.required, ValidateInteger])
    );
    this.qrcode = new FormControl('');
    this.qrcodetxt = new FormControl('');
    this.productForm = this.builder.group({
      vendorid: this.vendorid,
      id: this.id,
      name: this.name,
      costprice: this.costprice,
      msrp: this.msrp,
      rop: this.rop,
      eoq: this.eoq,
      qoh: this.qoh,
      qoo: this.qoo,
      qrcode: this.qrcode,
      qrcodetxt: this.qrcodetxt,
    });
  } // constructor
  ngOnInit(): void {
    // patchValue doesn't care if all values are present
    this.productForm.patchValue({
      vendorid: this.selectedProduct.vendorid,
      id: this.selectedProduct.id,
      name: this.selectedProduct.name,
      costprice: this.selectedProduct.costprice,
      msrp: this.selectedProduct.msrp,
      rop: this.selectedProduct.rop,
      eoq: this.selectedProduct.eoq,
      qoh: this.selectedProduct.qoh,
      qoo: this.selectedProduct.qoo,
      qrcode: this.selectedProduct.qrcode,
      qrcodetxt: this.selectedProduct.qrcodetxt,
    });
    this.id = new FormControl(
      '',
      Validators.compose([
        this.uniqueCodeValidator.bind(this),
        Validators.required,
      ])
    );
  } // ngOnInit
  updateSelectedProduct(): void {
    this.selectedProduct.vendorid = this.productForm.value.vendorid;
    this.selectedProduct.id = this.productForm.value.id;
    this.selectedProduct.name = this.productForm.value.name;
    this.selectedProduct.costprice = this.productForm.value.costprice;
    this.selectedProduct.msrp = this.productForm.value.msrp;
    this.selectedProduct.rop = this.productForm.value.rop;
    this.selectedProduct.eoq = this.productForm.value.eoq;
    this.selectedProduct.qoh = this.productForm.value.qoh;
    this.selectedProduct.qoo = this.productForm.value.qoo;
    this.selectedProduct.qrcode = ''; //this.productForm.value.qrcode;
    this.selectedProduct.qrcodetxt = ''; //this.productForm.value.qrcodetxt;
    this.saved.emit(this.selectedProduct);
  } // updateSelectedProduct
  uniqueCodeValidator(
    control: AbstractControl
  ): { idExists: boolean; required: boolean } | null {
    /**
     * uniqueCodeValidator - needed access to products property so not
     * with the rest of the validators
     */
    if (this.products && this.products?.length > 0) {
      if (
        this.products.find(
          (p) => p.id === control.value && !this.selectedProduct.id
        ) !== undefined
      ) {
        return { idExists: true, required: true };
      }
    }
    return null; // if we make it here there are no product codes
  } // uniqueCodeValidator
} // ProductDetailComponent
