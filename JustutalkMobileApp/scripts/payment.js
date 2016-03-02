(function (global) {


    var PaymentViewModel,
        app = global.app = global.app || {};



    PaymentViewModel = kendo.data.ObservableObject.extend({


        empty_cart: function(){

            var resource = 'jusutalk-mobile-payments/empty_cart';

            schema = {
                model: {
                    //id: "order_id"
                },
                data: function(result) {
                    return [result];
                }
            };

            var requestData=   {

            };

            var options = {
                //callback:app.orderService.viewModel.createCallBack
            };

            var p = app.services.create(resource,requestData, schema, options);
            return p.then(function(data){

                //console.log(data);
                console.log(data);


                if(data && data.length){
                    return data;

                /*
                    console.log('order 1')

                 var order = {
                 order_id        : data[0].order_id,
                 status          : data[0].status,
                 profile_id      : data[0].commerce_customer_billing,
                 line_item_id    : data[0].commerce_line_items[0],
                 order_total     : data[0].commerce_order_total.amount
                 };
                 app.checkoutService.viewModel.set("checkout.order",order);
                  */
                 }
                 //console.log(order);
                 //return app.checkoutService.viewModel.get("checkout.order");
            });

            //return p;

        },
        checkout_complete: function(){

            var resource = 'jusutalk-mobile-payments/checkout_complete';
            var order_id = app.checkoutService.viewModel.get("checkout.order.order_id");

            schema = {
                model: {
                    //id: "order_id"
                },
                data: function(result) {
                    return [result];
                }
            };

            var requestData=   {
                order_id:order_id
            };

            var options = {
                //callback:app.orderService.viewModel.createCallBack
            };

            var p = app.services.create(resource,requestData, schema, options);
            return p.then(function(data){

                //console.log(data);
                console.log(data);

                if(data && data.length){
                    return data;

                    /*
                     console.log('order 1')

                     var order = {
                     order_id        : data[0].order_id,
                     status          : data[0].status,
                     profile_id      : data[0].commerce_customer_billing,
                     line_item_id    : data[0].commerce_line_items[0],
                     order_total     : data[0].commerce_order_total.amount
                     };
                     app.checkoutService.viewModel.set("checkout.order",order);
                     */
                }
                //console.log(order);
                //return app.checkoutService.viewModel.get("checkout.order");
            });

            //return p;

        },
        process_payment: function(){

            var resource = 'jusutalk-mobile-payments/process_payment';

            var card_number = app.checkoutService.viewModel.get("checkout.payment.card_number");
            var card_holder = app.checkoutService.viewModel.get("checkout.payment.card_holder");
            var exp_year = app.checkoutService.viewModel.get("checkout.payment.exp_year");
            var exp_month = app.checkoutService.viewModel.get("checkout.payment.exp_month");
            var csc = app.checkoutService.viewModel.get("checkout.payment.csc");

            var line_item_id = app.checkoutService.viewModel.get("checkout.line_item.line_item_id");
            var product_id = app.checkoutService.viewModel.get("selected_product.product_id");
            var order_id  = app.checkoutService.viewModel.get("checkout.order.order_id");

            schema = {
                model: {
                    //id: "order_id"
                },
                data: function(result) {
                    return [result];
                }
            };

            var requestData=   {
                card_number     :card_number,
                card_holder     :card_holder,
                exp_year        :exp_year,
                exp_month       :exp_month,
                csc             :csc,
                line_item_id    :line_item_id,
                product_id      :product_id,
                order_id        :order_id
            };

            var options = {
                //callback:app.orderService.viewModel.createCallBack
            };

            var p = app.services.create(resource,requestData, schema, options);
            return p.then(function(data){

                //console.log(data);
                console.log(data);


                if(data && data.length){
                    return data;

                    /*
                    console.log('order 1')

                    var order = {
                        order_id        : data[0].order_id,
                        status          : data[0].status,
                        profile_id      : data[0].commerce_customer_billing,
                        line_item_id    : data[0].commerce_line_items[0],
                        order_total     : data[0].commerce_order_total.amount
                    };
                    app.checkoutService.viewModel.set("checkout.order",order);
                 */
                }
                //console.log(order);
                //return app.checkoutService.viewModel.get("checkout.order");
            });

            //return p;

        },
        process_transaction: function(){

            //new order must  be cart, that can later be updated
            var resource = 'jusutalk-mobile-payments/process_transaction';

            var order_id  = app.checkoutService.viewModel.get("checkout.order.order_id");
            var order_total  = app.checkoutService.viewModel.get("checkout.order.order_total");
            var currency  = app.checkoutService.viewModel.get("checkout.order.currency");


            schema = {
                model: {
                    id: "transaction_id"
                },
                data: function(result) {
                    return [result];
                }
            };

            var requestData=   {
                //"uid": "1",
                "order_id": order_id,
                "payment_method": "commerce_payment_example",
                "status": "success",
                "remote_status": "",
                "amount": order_total,
                "currency_code": currency,
                "message": "Number: 4111--------1111<br/>Expiration: 05/2015",
            };

            var options = {
                //callback:app.orderService.viewModel.createCallBack
            };

            var p = app.services.create(resource,requestData, schema, options);
            return p.then(function(data){

                console.log(data);


                 if(data && data.length){

                     return data;

                     /*
                         console.log('order 1')

                         var order = {
                             order_id        : data[0].order_id,
                             status          : data[0].status,
                             payment_method  : data[0].payment_method,
                             amount          : data[0].amount,
                             currency_code   : data[0].currency_code,
                             message         : data[0].message,

                         };
                         app.checkoutService.viewModel.set("checkout.order",order);
                     */
                 }
                 //console.log(order);
                 //return app.checkoutService.viewModel.get("checkout.order");
            });

            //return p;

        }


    });

    app.paymentService = {
        viewModel: new PaymentViewModel()
    };
})(window);
