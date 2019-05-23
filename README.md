
- [API](#api)
  - [Register](#register-user)
  - [Login](#login)
  - [Get all products](#get-all-products)
  - [Get a product details](#get-a-product-details)
  - [Create new product](#create-new-product)
  - [Obtain orderNumber](#obtain-orderNumber)
  - [Add item to the order](#add-item-to-the-order)
  - [Get all products in order](#get-all-products-in-order)
  - [Get all payment methods](#get-all-payment-methods)
  - [Checkout products in shopping cart](#checkout-products-in-shopping-cart)
- [ANGULAR CLI DOCUMENTATION](#angular-cli-documentation)

API
===

Register user
-------------
```bash
curl -X POST \
 http://localhost:8080/rest/register \
 -H 'Content-Type: application/json' \
  -d '{
        "password": "123456",
        "userName": "user123",
        "confirmPassword": "123456",
        "email": "user123@gmail.com",
        "mobile": "1234567890"
      }'
```

### Response Body:
```json
    {
      "id":1105,
      "userName":"user123",
      "password":"$2a$10$ZcmJmdATBrZ86wELX8Li2e5Oe4LesBwHYoAR5vOv7E16ygJ7nK4tO",
      "token":null,
      "mobile":1234567890
    }
```

### *Changes comming:* 
#### *remove `"password"` from response payload*

Login
-----
```bash
curl -X POST \
  http://localhost:8080/rest/login/ \
  -H 'Content-Type: application/json' \
  -d '{
        "password": "123456",
        "userName": "test@gmail.com"  
    }'
```

### Response Body:
```json
    {
      "id":219,
      "userName":"test@gmail.com",
      "password":"",
      "token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsInJvbGVzIjoidXNlciIsImlhdCI6MTUyODMzMDQ3MCwiZXhwIjoxNTI4MzMxMDcwfQ._YiRnTOPL0IqqrtsSgKWYqKloe8wTtkMsFEVVSYJg-k",
      "mobile":2045651432
    }
```

Get all products
----------------
```bash
curl -X GET \
    http://localhost:8080/rest/api/product/all \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer ${token}' \
```
 *Where `${token}` is JWT token - e.g.: `"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsInJvbGVzIjoidXNlciIsImlhdCI6MTUyODMzMDQ3MCwiZXhwIjoxNTI4MzMxMDcwfQ._YiRnTOPL0IqqrtsSgKWYqKloe8wTtkMsFEVVSYJg-k"`*

### Response Body:
```json
    {
      "products": 
        [
          {
            "name":"Pen",
            "description":"Ink pen", 
            "slug":"ink-pen",
            "price": 99.99,
            "productInfo": {
                "imageList": [
                {
                  "_id":7,
                  "largeUrl":"/image/ink-pen.jpg"
                }
                ],
                "id":6
              },
            "id":5
            }
          ]
      }
```

Get a product details
-------------------
```bash
 curl -X GET \
    http://localhost:8080/rest/api/product/slug/${path.slug} \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer ${token}' \
```
*Where:*

| #   | Key            | Value                  |
| --- |:---------------| :----------------------|
| 1   | `${path.slug}` |  `slug property of a product (from a product properties)` |
| 2   | `${token}`     | `"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsInJvbGVzIjoidXNlciIsImlhdCI6MTUyODMzMDQ3MCwiZXhwIjoxNTI4MzMxMDcwfQ._YiRnTOPL0IqqrtsSgKWYqKloe8wTtkMsFEVVSYJg-k"` |

### Response Body:
```json
    {
      "name":"magic pen",
      "description":"wooden magic pen",
      "slug":"magic-pen",
      "price": 9.99,
      "productInfo": {
        "imageList":[
          {
            "_id":7,
            "largeUrl":"/image/magic_pen.jpeg"
            }
          ],
          "id":6
        },
        "id":5
      }
```

Create new product
------------------
```bash
 curl -X POST \
    http://localhost:8080/rest/api/product/add \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer ${token}' \
    -d '{
          "name": "magic pen", 
          "description": "wooden magic pen", 
          "price": "9.99", 
          "slug": "magic-pen",
          "image": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEA4OEBAPDw4PDQ8PDg4ODg8NDQ8"
      }'
```
*Where:
* `${token}` is JWT token - e.g.: `"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsInJvbGVzIjoidXNlciIsImlhdCI6MTUyODMzMDQ3MCwiZXhwIjoxNTI4MzMxMDcwfQ._YiRnTOPL0IqqrtsSgKWYqKloe8wTtkMsFEVVSYJg-k"`

### Response Body:
```
{
    "name": "javascript book",
    "description": "java tutorial",
    "slug": "javascript-tutorial-book",
    "price": 59.99,
    "productInfo": null,
    "id": 1248
}
```

Obtain orderNumber
------------------
```bash
  curl -X POST \
    http://localhost:8080/rest/api/order/add \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer ${token}' \
    -d '{
      "userId": 219
    }'
```
Where 
* `${token}` is JWT token - e.g. `"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsInJvbGVzIjoidXNlciIsImlhdCI6MTUyODMzMDQ3MCwiZXhwIjoxNTI4MzMxMDcwfQ._YiRnTOPL0IqqrtsSgKWYqKloe8wTtkMsFEVVSYJg-k"`

### Response body:
```json
    {
        "orderNumber": "5f3bcb1ed8a4b82e0be817cbe96e329e",
        "orderToken": null,
        "userId": 219,
        "totalAmount": null,
        "paymentId": null,
        "paymentPlaced": null,
        "paymentPaid": null,
        "itemList": null,
        "payment": null,
        "id": 221
    }
```

### *Note:*
 * `"orderToken"` is not implemeted for now and it is hardcoded to `null`

Add item to the <order></order>
---------------------
```bash
   curl -X POST \
   http://localhost:8080/rest/api/item/add/${orderNumber} \
   -H 'Content-Type: application/json' \
   -H 'Authorization: Bearer ${token}' \
   -d '{ 
          "quantity" : 1,
          "productId": 5
        }'
```

| #   | Key              | Value                  |
| --- |:-----------------| :----------------------|
| 1   | `${orderNumber}` |  is `order number` from Obtain orderNumber API      |
| 2   | `${token}`       | `"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsInJvbGVzIjoidXNlciIsImlhdCI6MTUyODMzMDQ3MCwiZXhwIjoxNTI4MzMxMDcwfQ._YiRnTOPL0IqqrtsSgKWYqKloe8wTtkMsFEVVSYJg-k"` |


###  Response body:
```json
    {
      "productId":5,
      "quantity": 2,
      "orderNumber":"394badd99a070028f3cacda802f4a06f",
      "product": {
          "name":"A book",
          "description":"Igor",
          "slug":"quantume",
          "price":199.99,
          "productInfo": {
            "imageList":[
              {
                "_id":7,
                "largeUrl":"quantume_book.jpeg"
              }
            ],
            "id":6
          },
          "id":5
        },
        "id":331
      }
```

Get all products in order
-------------------------
```bash
    curl -X GET \
    http://localhost:8080/rest/api/order/number/${orderNumber} \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer ${token}' \
```
*Where `${token}` is JWT token - e.g. `"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsInJvbGVzIjoidXNlciIsImlhdCI6MTUyODMzMDQ3MCwiZXhwIjoxNTI4MzMxMDcwfQ._YiRnTOPL0IqqrtsSgKWYqKloe8wTtkMsFEVVSYJg-k"`*
### Response body:
```json
    {
      "orderNumber":"cd8e26b78ccd436c4144c5a85190a55b",
      "orderToken":null,
      "userId":219,
      "totalAmount":599.97,
      "paymentId":null,
      "paymentPlaced":null,
      "paymentPaid":null,
      "itemList":[
        {
          "productId":5,
          "quantity":1,
          "orderNumber":"cd8e26b78ccd436c4144c5a85190a55b",
          "product":{
            "name":"shoes",
            "description":"leather shoes",
            "slug":"leather-shoes",
            "price":79.99,
            "productInfo":{
              "imageList":[
                {
                  "_id":7,
                  "largeUrl":"/leather_shoes.jpeg"
                }
              ],
              "id":6
            },
            "id":5
          },
          "id":1108
          }
        ],
        "payment":null,
        "id":1107
      }
```

### *Changes comming:* 
* *need  create a story to add total quantity into response*


Get all payment methods
-----------------------
```bash
    curl -X GET \
    http://localhost:8080/rest/api/payment/all \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer ${token}' \
```
*Where `${token}` is JWT token - e.g. `"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsInJvbGVzIjoidXNlciIsImlhdCI6MTUyODMzMDQ3MCwiZXhwIjoxNTI4MzMxMDcwfQ._YiRnTOPL0IqqrtsSgKWYqKloe8wTtkMsFEVVSYJg-k"`*
### Response body:
```json
    {
      "payments": [
        {
          "_id":1,
          "paymentType":"cash on delivery"
        },{
          "_id":2,
          "paymentType":"debit"
        }
      ]
    }
```

Checkout products in shopping cart
----------------------------------
```bash
   curl -X POST \
   http://localhost:8080/rest/api/order/number/${orderNumber}/makePayment?order_token=${order_token} \
   -H 'Content-Type: application/json' \
   -H 'Authorization: Bearer ${token}' \
   -d '{
            "payment_method_id" : 1,
            "amount": 5.99
      }'
```

| #   | Key              | Value                  |
| --- |:-----------------| :----------------------|
| 1   | `${orderNumber}` |  is `order number` from Obtain orderNumber API      |
| 2   | `${token}`       | `"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsInJvbGVzIjoidXNlciIsImlhdCI6MTUyODMzMDQ3MCwiZXhwIjoxNTI4MzMxMDcwfQ._YiRnTOPL0IqqrtsSgKWYqKloe8wTtkMsFEVVSYJg-k"` |
| 3   | `${order_token}` | `"order_token"` is `null` since it us not implemented (on UI and API) and hardcoded on UI`|
###  Response body
```
 true
```

### *Changes comming:* 
* *need to create a story to return API proper response*


ANGULAR CLI DOCUMENTATION
-------------------------

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).