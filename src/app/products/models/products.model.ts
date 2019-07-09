/***
* Products
*/
export interface Products {
  'name':         string;
  'description':  string;
  'slug':         string;
  'error':       string;
  'price': number;
  'productInfo': ProductInfo;
  'id': number;
}

export interface ProductInfo {
  'imageList': ImageList;
  'id': number;
}

export interface ImageList {
  '_id':      number,
  'largeUrl': string
}

export interface ProductSlug {
  'slug':    string;
}

export interface errorState {
  status: string;
  message: string;
}

export interface ProductDetails {
  'name':         string;
  'description':  string;
  'slug':         string;
  'price':        number;
  'productInfo':  ProductInfo;
  'id'?:           number;
  'defaultMaxQuantity': number;
}

export const initStateOfProductDetails = {
  'name':               undefined,
  'description':        undefined,
  'slug':               undefined,
  'price':              undefined,
  'productInfo':        undefined,
  'id':                 undefined,
  'defaultMaxQuantity': undefined
};

export interface UserDetails {
  'id':          number;
  'userName':    string;
  'orderNumber': string;
  'mobile':      number;
  'token':       string;
}

export interface removeProductId {
  'id':          number;
}

export interface error_message {
  'error_message': string;
}

export interface Order {
  'id':  number;
  'itemList': number;
  'orderNumber': string;
  'orderToken': number;
  'payment': number;
  'paymentId': number;
  'paymentPaid': number;
  'paymentPlaced': number;
  'totalAmount': number;
  'userId': number;
}


// {
// // id  оформления заказа
//    id: number,
//    total_price: number,
//    orderNumber : string
//    orderToken : string,
//    order_items: [{
//        // id - номер добавления в корзину из п2
//        id: number,
//        quantity: number
//        price: string,
//        total: string,
//        // implemented:
//        productInfo: {
//           // id товаров - мы это уже имплементировали ранее
//           id: number,
//           price : string,
//           name: string,
//           description: string,
//           slug: string,
//           imageList: [{
//             id: number,
//             largeUrl: string
//           }]
//       }
//   }]
