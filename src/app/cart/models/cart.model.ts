
//TODO: to add in API the 'totalQuantity' into payload
export interface Order {
  'id':  number;
  'itemList': ItemList[];
  'orderNumber': string;
  'orderToken': number;
  'payment': number;
  'paymentId': number;
  'paymentPaid': number;
  'paymentPlaced': number;
  'totalAmount': number;
  'totalQuantity': number;
  'userId': number;
}

export interface ItemList {
  "id": number;
  "productId": number;
  "quantity": number;
  "orderNumber": string;
  "product": Product;
}

export interface Product {
  "id":number;
  "name":string;
  "description":string;
  "slug":string;
  "price": number;
  "productInfo": ProductInfo;
}

export interface ProductInfo {
  "id":number;
  "imageList": [{
    "_id": number;
    "largeUrl": string;
    }];
  }

export interface CheckoutInfo {
  payment_method_id: string;
  amount: number;
}

export interface PaymentMethods {
  "payments": PaymentDescription[];
}

export interface PaymentDescription {
  "_id": number; 
  "paymentType": string;
}
