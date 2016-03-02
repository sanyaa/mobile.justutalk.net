(function (global) {


    var OrderViewModel,
        app = global.app = global.app || {};



    OrderViewModel = kendo.data.ObservableObject.extend({

        /**
        * Note:
        * 1. cart is just an order with status='cart'
        * 2. cart can only be created and retrieved via cart resource
        * 3. cart resource endpoint = http://excitenet.co.uk/excitenet/users-json/cart
        * @param status
        */

        _get  : function(next_callback){


            var dfd = $.Deferred();

            var status = app.checkoutService.viewModel.get("checkout.order.status");

            //defaults to cart type
            var status = (status) ? status : 'cart';
            var resource = 'cart';

            var order_id  =0;
            if(status !== 'cart'){
                resource = 'order';
                order_id  = app.checkoutService.viewModel.get("checkout.order.order_id");
            }

            schema = {
                model: {
                    id: "order_id"
                },
                data: function(result) {
                    var keys =  Object.keys(result);
                    if(keys.length ){

                        result[keys[0]].user_id = result[keys[0]].uid;

                        //console.log(result);
                        var result = app.services.objToArray(result);
                    }
                    //console.log(result.user_id);
                    return result;
                }
            };

            var params = {
                page        : 0,
                parameters  : {
                    order_id    : order_id
                },
                fields      : "",
                pagesize    : 0,
                sort        : "",
                direction   : ""
            };

            var options = {
                callback:this.getCallBack,
                dfd:dfd
            };
            if(typeof(next_callback) === "function"){
                options.next_callback = next_callback;
            }

            app.services.get(resource,params, schema, options);

            return dfd.promise();

        },
        get  : function(){


            //var dfd = $.Deferred();

            var status = app.checkoutService.viewModel.get("checkout.order.status");

            //defaults to cart type
            var status = (status) ? status : 'cart';
            var resource = 'cart';

            var order_id  =0;
            if(status !== 'cart'){
                resource = 'order';
                order_id  = app.checkoutService.viewModel.get("checkout.order.order_id");
            }

            schema = {
                model: {
                    id: "order_id"
                },
                data: function(result) {
                    var keys =  Object.keys(result);
                    if(keys.length ){

                        result[keys[0]].user_id = result[keys[0]].uid;

                        //console.log(result);
                        var result = app.services.objToArray(result);
                    }
                    //console.log(result.user_id);
                    return result;
                }
            };

            var params = {
                page        : 0,
                parameters  : {
                    order_id    : order_id
                },
                fields      : "",
                pagesize    : 0,
                sort        : "",
                direction   : ""
            };

            var options = {
                //callback:this.getCallBack
            };

            var p = app.services.get(resource,params, schema, options);
            return p.then(function(data){

                if(data && data.length){

                    var order= {
                        order_id        : data[0].order_id,
                        status          : data[0].status,
                        profile_id      : data[0].commerce_customer_billing,
                        line_item_id    : data[0].commerce_line_items[0],
                        order_total     : data[0].commerce_order_total.amount
                    };

                    app.checkoutService.viewModel.set("checkout.order",order);

                    if (order.line_item_id)
                        app.checkoutService.viewModel.set("checkout.line_item.line_item_id",order.line_item_id);

                    if (order.profile_id)
                        app.checkoutService.viewModel.set("checkout.billing.profile_id",order.profile_id);

                }
                //console.log(order);
                return app.checkoutService.viewModel.get("checkout.order");
            });

        },

        getCallBack:function(data,next_callback,dfd){

            console.log(dfd);

            if(data && data.length){
                var order= {
                    order_id        : data[0].order_id,
                    status          : data[0].status,
                    order_total     : data[0].commerce_order_total.amount
                };

                app.checkoutService.viewModel.set("checkout.order",order);
                dfd.resolve(order);

            }else{

                if(typeof(next_callback) === "function"){

                    console.log(next_callback);
                    alert('hello there');

                    next_callback(app.lineItemService.viewModel.create);
                }
            }
        },

        /**
         * Only cart can be created
         * @param status
         */
        _create: function(next_callback){

            //new order must  be cart, that can later be updated
            var resource = 'cart';
            
            schema = {
                model: {
                    id: "order_id"
                },
                data: function(result) {
                    return [result];
                }
            };

            var requestData=   {
                "mail": app.loginService.viewModel.get("user.email"),
                "status": "cart",
                "type": "commerce_order"
            };

            var options = {
                callback:app.orderService.viewModel.createCallBack
            };
            if(typeof(next_callback) === "function"){
                options.next_callback = next_callback;
            }

            app.services.create(resource,requestData, schema, options);
        },

        create: function(){

            //new order must  be cart, that can later be updated
            var resource = 'cart';

            schema = {
                model: {
                    id: "order_id"
                },
                data: function(result) {
                    return [result];
                }
            };

            var requestData=   {
                "mail": app.loginService.viewModel.get("user.email"),
                "status": "cart",
                "type": "commerce_order"
            };

            var options = {
                //callback:app.orderService.viewModel.createCallBack
            };

            var p = app.services.create(resource,requestData, schema, options);
            return p.then(function(data){

                //console.log(data);

                if(data && data.length){

                    //console.log('order 1')

                    var order = {
                        order_id        : data[0].order_id,
                        status          : data[0].status,
                        profile_id      : data[0].commerce_customer_billing,
                        line_item_id    : data[0].commerce_line_items[0],
                        order_total     : data[0].commerce_order_total.amount
                    };
                    app.checkoutService.viewModel.set("checkout.order",order);

                    if (order.line_item_id)
                        app.checkoutService.viewModel.set("checkout.line_item.line_item_id",order.line_item_id);

                    if (order.profile_id)
                        app.checkoutService.viewModel.set("checkout.billing.profile_id",order.profile_id);


                }
                //console.log(order);
                return app.checkoutService.viewModel.get("checkout.order");
            });

            //return p;

        },
        createCallBack:function(data,next_callback){

            var order = {
                order_id: data[0].order_id,
                status: data[0].status,
                order_total: data[0].commerce_order_total.amount
            };
            app.checkoutService.viewModel.set("checkout.order",order);

            if(typeof(next_callback) === "function"){

                console.log(next_callback);
                alert('hello there');

                next_callback.call();
            }

            //console.log(app.checkoutService.viewModel.get("checkout.order"));

        },

        /**
         * Note:                 *
         * 1. order can be retrieved, updated and deleted using the order_id.
         * 2. can't use cart resource to perform update or delete
         * 3. order resource endpoint = http://excitenet.co.uk/excitenet/users-json/order
         * @param status
         */

        update  : function(status){


            var status = app.checkoutService.viewModel.get("checkout.order.status");

            //defaults to cart type
            var status = (status) ? status : 'cart';

            //update cannot be a cart resource
            resource = 'order';
            var profile_id = app.checkoutService.viewModel.get("checkout.billing.profile_id");
            var line_item_id = app.checkoutService.viewModel.get("checkout.line_item.line_item_id");
            var order_id = app.checkoutService.viewModel.get("checkout.order.order_id");
            var email = app.loginService.viewModel.get("user.email");


            schema = {
                model: {
                    id: "order_id"
                },
                data: function(result) {

                    return [result];
                }
            };

            var requestData={
                "mail": email,
                "status": status,
                "type": "commerce_order",
                "commerce_customer_billing":profile_id,
                "commerce_line_items":[line_item_id]
            };


            var options = {
                //callback:this.updateCallBack,
                //id: order_id
            };

            var p = app.services._update(resource,order_id, requestData, schema, options);
            return p.then(function(data){

                if(!jQuery.isEmptyObject(data)){
                    var order= {
                        order_id        : data.order_id,
                        status          : data.status,
                        profile_id      : data.commerce_customer_billing,
                        line_item_id    : data.commerce_line_items[0],
                        order_total     : data.commerce_order_total.amount
                    };

                    app.checkoutService.viewModel.set("checkout.order",order);

                    if (order.line_item_id)
                        app.checkoutService.viewModel.set("checkout.line_item.line_item_id",order.line_item_id);

                    if (order.profile_id)
                        app.checkoutService.viewModel.set("checkout.billing.profile_id",order.profile_id);

                }

                //console.log('update order:' +  data.order_id + ' - ' + jQuery.isEmptyObject(data));
                //console.log(data);
                return app.checkoutService.viewModel.get("checkout.order");
            });
        },
        updateCallBack:function(data){

            console.log(data);

            var order= {
                order_id        : data.order_id,
                status          : data.status,
                order_total     : data.commerce_order_total.amount
            };

            app.checkoutService.viewModel.set("checkout.order",order);
            console.log(app.checkoutService.viewModel.get("checkout.order"));

        },

        delete  : function(status){


        },



    });

    app.orderService = {
        viewModel: new OrderViewModel()
    };
})(window);
