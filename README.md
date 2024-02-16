# vzy-app

## postman 
https://documenter.getpostman.com/view/8429837/2sA2r6YQ7L

## deployed base url
https://vzy.nidbarsk.com

## stripe command to execute with customer-ID
stripe trigger payment_intent.succeeded --add payment_intent:metadata.customerId=[C0RS2wLPLdgHI_5mAXday]

Value of customerId is the customerId field returned from a successful login
