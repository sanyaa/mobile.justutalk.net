(function (global) {


    var CheckoutViewModel,
        app = global.app = global.app || {};


    CheckoutViewModel = kendo.data.ObservableObject.extend({
        products : [],
        selected_product : {
            amount:'',
            product_id:'',
            sku:'',
            title:'',
            currency:'GBP',
            commerce_price_formatted:''
        },

        checkout :{
            topup   :{
                //default_amount    :'$5',
                onChange          :function(e) {
                    var that = this;

                    var amount = e.sender.dataItem(e.item).commerce_price.amount;
                    var currency_code = e.sender.dataItem(e.item).commerce_price.currency_code;

                    this.set("selected_product", {
                        amount                      :e.sender.dataItem(e.item).commerce_price.amount,
                        product_id                  :e.sender.dataItem(e.item).product_id,
                        sku                         :e.sender.dataItem(e.item).sku,
                        title                       :e.sender.dataItem(e.item).title,
                        currency                    :e.sender.dataItem(e.item).commerce_price.currency_code,
                        commerce_price_formatted    :e.sender.dataItem(e.item).commerce_price_formatted,
                    });



                    /*
                    that.set("checkout.order.order_total",amount);
                    that.set("checkout.order.currency",currency_code);
                    */


                    /*
                        app.checkoutService.viewModel.set("checkout.order.order_total",amount);
                        app.checkoutService.viewModel.set("checkout.order.currency_code",currency_code);
                    */

                }
            },
            billing :{
                profile_id      :0,
                first_name      :'',
                last_name       :'',
                address1        :'',
                address2        :'',
                postcode        :'',
                county          :'',
                country         :'GB',
                city            :'',

                //None Essential
                telephone       :'',
                email           :''
            },
            payment :{
                card_number     :'111111',
                card_holder     :'lam san',
                exp_year        :'15',
                exp_month       :'09',
                csc             :'222'
            },
            transaction:{
                transaction_id  : 0
            },
            line_item:{
                line_item_id    : 0
            },
            order:{
                order_id        : 0,
                line_item_id    : 0,
                profile_id      : 0,
                status          : 'cart',
                order_total     : 0,
                currency        : 'GBP'

               //these values are available elsewhere
               /*
                user_id         : 0,
                profile_id      : 0,
                product_id      : 0,
                line_item_id    : 0,
                currency        : ''
                */
            }
        },

        checkEnter: function (e) {
            var that = this;
            if (e.keyCode == 13) {
                $(e.target).blur();
                var navto_fn = $(e.currentTarget).data("navto-fn");
                that[navto_fn]();
            }
        },
        checkoutBilling: function (){
            var that = this;

            var line_item;


            /**
             * Ensures order and line item info exists and processed before continuing billing             *
             */
            var order = that.initCheckout();
            order.then(function(order_id){
                //alert(order_id);
                //if everything went smoothly, create/update lineitem
                if(order_id){

                    var line_item_id = app.checkoutService.viewModel.get("checkout.line_item.line_item_id");
                    if(line_item_id){
                        line_item = app.lineItemService.viewModel.update();
                        line_item.then(function(data){
                            //console.log(data);
                            if(data.line_item_id){
                                app.application.navigate('#views/user/checkout-billing.html?step=1');
                            }

                        });
                    }else{
                        line_item = app.lineItemService.viewModel.create();
                        line_item.then(function(data){

                            if(data.line_item_id){
                                app.application.navigate('#views/user/checkout-billing.html?step=1');
                            }

                        });
                    }
                }

            });

        },

        checkoutPayment: function (){

            that = this;

            /**
             * Gather and process billing info then proceed to payment page
             */

            var profile_id = app.checkoutService.viewModel.get("checkout.billing.profile_id");

            if(profile_id){
                var p = app.profileService.viewModel.update();
                p.then(function(data){
                    if(data.profile_id){
                        app.application.navigate('#views/user/checkout-payment.html?step=2');
                    }
                });
            }else{
                var p = app.profileService.viewModel.create();
                p.then(function(data){
                    if(data.profile_id){
                        app.application.navigate('#views/user/checkout-payment.html?step=2');
                    }
                });
            }

            //app.application.navigate('#views/user/checkout-payment.html?step=2');
        },

        checkoutComplete: function (){

            that = this;

            /**
             * Update order from cart to pending status
             * add current billing profile and line item to order
             */


            var checkout = that.get("checkout");
            var order_status = checkout.order.status;

            /*var profile_id = checkout.billing.profile_id;
            var line_item_id = checkout.line_item.line_item_id;*/

            if(order_status == 'cart'){

                app.checkoutService.viewModel.set("checkout.order.status","pending");
                var order = app.orderService.viewModel.update(true);

                order.then(function(data){
                        return data;
                    })
                    .then(function(data){

                        /**
                         * Send card info to payment gateway then proceed to checkout complete page
                         * connects to custom sevice resource
                         */
                        var payment = app.paymentService.viewModel.process_payment();

                        payment.then(function(data){

                            var transaction = app.paymentService.viewModel.process_transaction();
                            transaction.then(function(){

                                /*var checkout_complete = app.paymentService.viewModel.checkout_complete();*/

                            })
                        })

                    });

            }

            //console.log(that.checkout);
            app.application.navigate('#views/user/checkout-complete.html?step=3');

        },

        homePage: function (){
            that = this;
            //console.log(that.checkout);
            app.application.navigate('#views/home.html');
        },

        /**
         * Ensures order/exists for user before continuing checkout
         */
        initCheckout: function(){

            var order_id  = app.checkoutService.viewModel.get("checkout.order.order_id");
            if(!order_id){

                var p = app.orderService.viewModel.get();
                return p.then(function(data){

                        if(data.order_id){

                            //return(data);
                            return data.order_id;

                        }else{

                            //order/cart doesn't exist so create one
                            var p2 = app.orderService.viewModel.create();
                            p2.then(function(data){
                                //return(data);
                                return data.order_id;
                            });
                        }
                    })

            }else{

                /**
                 * create custom jquery promise
                 */
                var dfd = $.Deferred();
                dfd.resolve(order_id);
                return dfd.promise();
            }

        },


        //Product Management
        getProduct: function(product_id){

            that=this;
            schema = {

            };

            var params = {
                page        : 0,
                parameters  : {
                    product_id    : product_id
                },
                fields      : "product_id,sku,status,type,title,commerce_price_formatted,commerce_price",
                pagesize    : 0,
                sort        : "",
                direction   : ""
            };

            var options = {
                callback:that.getProductCallBack
            };

            var p = app.services.get('product', params, schema, options);
            
            
            

            //
            p.then(function(data){
                app.checkoutService.viewModel.set('products',data );
                var selected_product = data[0];
                
                console.log(selected_product);

                var sp = app.checkoutService.viewModel;

                sp.set("selected_product", {
                    amount                      :selected_product.commerce_price.amount,
                    product_id                  :selected_product.product_id,
                    sku                         :selected_product.sku,
                    title                       :selected_product.title,
                    currency                    :selected_product.commerce_price.currency_code,
                    commerce_price_formatted    :selected_product.commerce_price_formatted,
                });

            });

            return p;


        },
        getProductCallBack:function(data){


            app.checkoutService.viewModel.set('products',data );
            var selected_product = data[0];

            var sp = app.checkoutService.viewModel;

            sp.set("selected_product", {
                amount                      :selected_product.commerce_price.amount,
                product_id                  :selected_product.product_id,
                sku                         :selected_product.sku,
                title                       :selected_product.title,
                currency                    :selected_product.commerce_price.currency_code,
                commerce_price_formatted    :selected_product.commerce_price_formatted,
            });
        },





        createLineItem  :function(){

        },
        editLineItem    :function(){

        },

        createProfile  :function(){

        },
        editProfile  :function(){

        },


        getOrder: function(){

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
        createOrder: function(){
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
        updateOrder: function (){

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






        //Checkout
        //line item
        kGetCheckout: function(){

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

        }

    });

    app.checkoutService = {
        viewModel: new CheckoutViewModel()
    };
})(window);
