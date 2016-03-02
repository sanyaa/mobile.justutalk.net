(function (global) {


    var OrderViewModel,
        app = global.app = global.app || {};



    OrderViewModel = kendo.data.ObservableObject.extend({

        //Order
        //line item
        kGetOrder: function(){

            schema = {
                model: {
                    id: "order_id"
                },
                data: function(result) {

                    return [result];
                }
            };

            var params = {
                page        : 0,
                parameters  : {
                    order_id    : 14
                },
                fields      : "order_id,status,type",
                pagesize    : 0,
                sort        : "",
                direction   : ""
            };

            app.services.get('entity_commerce_order',params, schema);

        },
        kCreateOrder: function(){
            var requestData= {
                "mail": "admin@excitenet.co.uk",
                "status": "pending",
                "data": {
                    "payment_method": "commerce_payment_example|commerce_payment_commerce_payment_example",
                    "commerce_payment_example": {
                        "credit_card": {
                            "valid_types": [],
                            "number": "4111--------1111",
                            "exp_month": "11",
                            "exp_year": "2015"
                        }
                    },
                    "commerce_payment_order_paid_in_full_invoked": true
                },
                "type": "commerce_order",
                "uid": "1",
                "commerce_line_items": {
                    "und": [
                        {
                            "line_item_id": "103"
                        }
                    ]
                },
                "commerce_customer_billing": {
                    "und": [
                        {
                            "profile_id": "7"
                        }
                    ]
                }
            };




            var requestData=   {
                "type": "commerce_order",
                "commerce_line_items": [
                    {
                        "line_item_id": "102"
                    }
                ],
                "commerce_customer_billing": {
                    "profile_id": "7"
                },
                "status": "pending",
                "state": "pending",
                "uid": "1",
                "mail": "admin@excitenet1.co.uk",
                "mail_username": "admin1"
            };

            schema = {

                model: {
                    id: "order_id"
                },
                data: function(result) {
                    // the data which the data source will be bound to is in the values field
                    //console.log(data.body);
                    return [result];
                }
            }
            app.services.create('entity_commerce_order',requestData, schema);


        },
        kUpdateOrder: function (){

            var requestData= {
                "mail": "admin@excitenet1.co.uk",
                "commerce_line_items": [
                    {
                        "line_item_id": "102",
                    }
                ],
                "status": "pending"
            };
            schema = {

                model: {
                    id: "order_id"
                },
                data: function(result) {
                    // the data which the data source will be bound to is in the values field
                    //console.log(data.body);
                    return [result];
                }
            }

            app.services.update('order',14,requestData, schema);

        },


        //line item
        kGetLineItem: function(){

            schema = {
                model: {
                    id: "line_item_id"
                },
                data: function(result) {

                    return [result];
                }
            };

            var params = {
                page        : 0,
                parameters  : {
                    line_item_id    : 7
                },
                fields      : "line_item_id,status,type",
                pagesize    : 0,
                sort        : "",
                direction   : ""
            };

            app.services.get('entity_commerce_line_item',params, schema);

        },
        kCreateLineItem: function(){
            var requestData= {
                "type": "product",
                "line_item_label": "test-prod1",
                "order_id":18,
                "quantity": "1.00",
                "commerce_product":"3"
            };
            schema = {

                model: {
                    id: "line_item_id"
                },
                data: function(result) {
                    // the data which the data source will be bound to is in the values field
                    //console.log(data.body);
                    return [result];
                }
            }
            app.services.create('line-item',requestData, schema);


        },
        kUpdateLineItem: function (){
            var requestData= {
                "line_item_label": "test-prod-888888",
                "quantity": "5.00",
                order_id: 18
            };

            schema = {
                model: {
                    id: "line_item_id",
                    fields: {
                        nid: {editable: false, nullable: true},
                        type: {type: "string"},
                        line_item_label: {type: "string"}
                        //body: {}
                    }
                },
                data: function(result) {
                    // the data which the data source will be bound to is in the values field
                    //console.log(data.body);
                    return [result];
                }
            }

            app.services.update('entity_commerce_line_item',102,requestData, schema);

        },

        //CustomerProfile
        kCreateCustomerProfile: function(){
            var requestData= {

                "status": "1",
                "data": false,
                "type": "billing",
                "uid": "1",
                "commerce_customer_address": {
                    "und": [
                        {
                            "country": "GB",
                            "administrative_area": "Please select",
                            "sub_administrative_area": null,
                            "locality": "test town",
                            "dependent_locality": "",
                            "postal_code": "b30 2jx",
                            "thoroughfare": "addr2",
                            "premise": "adrr22",
                            "sub_premise": null,
                            "organisation_name": null,
                            "name_line": "Lamin san",
                            "first_name": "Lamin",
                            "last_name": "san",
                            "data": null
                        }
                    ]
                }
            };
            schema = {

                model: {
                    id: "profile_id"
                },
                data: function(result) {
                    // the data which the data source will be bound to is in the values field
                    //console.log(data.body);
                    return [result];
                }
            }
            app.services.create('entity_commerce_customer_profile',requestData, schema);


        },
        kUpdateCustomerProfile: function (){

            var requestData= {
                "status": "0",
                "data": false,
                "type": "billing",
            };

            schema = {

                model: {
                    id: "profile_id"
                },
                data: function(result) {
                    // the data which the data source will be bound to is in the values field
                    //console.log(data.body);
                    return [result];
                }
            }
            app.services.update('entity_commerce_customer_profile',3,requestData, schema);

        },
        kGetCustomerProfile: function(){

            schema = {

                model: {
                    id: "profile_id"
                },
                data: function(result) {

                    return [result];
                }
            };


            var params = {
                page        : 0,
                parameters  : {
                    profile_id : 7,
                    type : 'billing'
                },
                fields      : "profile_id,status,type",
                pagesize    : 0,
                sort        : "",
                direction   : ""
            };

            app.services.get('entity_commerce_customer_profile',params, schema);



        },

        //PaymentTransaction
        kGetPaymentTransaction: function(){

            schema = {

                model: {
                    id: "transaction_id"
                },
                data: function(result) {

                    return [result];
                }
            };

            var params = {
                page        : 0,
                parameters  : {
                    transaction_id    : 2
                },
                fields      : "transaction_id,status,type",
                pagesize    : 0,
                sort        : "",
                direction   : ""
            };

            app.services.get('entity_commerce_payment_transaction',params, schema);

        },
        kCreatePaymentTransaction: function(){
            var requestData= {

                "remote_id": "",
                "message": "Number: @number<br/>Expiration: @month/@year",
                "message_variables": {
                    "@number": "4111--------1111",
                    "@month": "05",
                    "@year": "2015"
                },
                "amount": "1200",
                "currency_code": "USD",
                "status": "success",
                "remote_status": "",
                "data": false,
                "uid": "1",
                "order_id": "17",
                "payment_method": "commerce_payment_example",
                "instance_id": "commerce_payment_example|commerce_payment_commerce_payment_example",
                "payload": []
            };
            schema = {

                model: {
                    id: "transaction_id"
                },
                data: function(result) {
                    // the data which the data source will be bound to is in the values field
                    //console.log(data.body);
                    return [result];
                }
            }
            app.services.create('entity_commerce_payment_transaction',requestData, schema);


        },
        kUpdatePaymentTransaction: function (){

            var requestData= {
                "message": "Number: @number<br/>Expiration: @month/@year",
                "message_variables": {
                    "@number": "4111--------1111",
                    "@month": "05",
                    "@year": "2015"
                },
                "amount": "1200",
            };

            schema = {

                model: {
                    id: "transaction_id"
                },
                data: function(result) {
                    // the data which the data source will be bound to is in the values field
                    //console.log(data.body);
                    return [result];
                }
            }
            app.services.update('entity_commerce_payment_transaction',3,requestData, schema);

        },


    });

    app.orderService = {
        viewModel: new OrderViewModel()
    };
})(window);
