import { PurchaseOrderItem } from './purchaseorder-item';
export interface PurchaseOrder {
  id: number;
  vendorid: number;
  amount: number;
  items: PurchaseOrderItem[];
}
