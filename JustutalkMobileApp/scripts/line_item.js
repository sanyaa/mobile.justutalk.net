(function (global) {


    var LineItemViewModel,
        app = global.app = global.app || {};


    LineItemViewModel = kendo.data.ObservableObject.extend({


        get     : function(){

            var resource = 'line-item';
            var line_item_id = app.checkoutService.viewModel.get("checkout.line_item.line_item_id");

            if(!line_item_id) return;

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
                    line_item_id    : line_item_id
                },
                fields      : "",
                pagesize    : 0,
                sort        : "",
                direction   : ""
            };

            var options = {
                callback:this.getCallBack
            };

            app.services.get(resource , params, schema, options);
        },
        getCallBack:function(data){

            if(data && data.length){
                var line_item= {
                    line_item_id    : data[0].line_item_id
                };

                app.checkoutService.viewModel.set("checkout.line_item",line_item);
                //console.log(app.checkoutService.viewModel.get("checkout.line_item"));
            }
        },

        create  : function(){

            var resource = 'line-item';
            //var line_item_id = app.checkoutService.viewModel.get("checkout.line_item.line_item_id");
            var product_id = app.checkoutService.viewModel.get("selected_product.product_id");
            var title = app.checkoutService.viewModel.get("selected_product.title");
            var order_id  = app.checkoutService.viewModel.get("checkout.order.order_id");

            //var sp = app.checkoutService.viewModel.get("selected_product");
            //console.log(sp);

            var requestData= {
                "type": "product",
                "line_item_label": title,
                "order_id":order_id,
                "quantity": "1.00",
                "commerce_product":product_id
            };

            schema = {
                model: {
                    id: "line_item_id"
                },
                data: function(result) {
                    return [result];
                }
            };

            var options = {
                callback:this.createCallBack
            };

            var p = app.services.create(resource, requestData, schema, options);
            return p.then(function(data){
                if(data && data.length){
                    var line_item= {
                        line_item_id    : data[0].line_item_id
                    };

                    app.checkoutService.viewModel.set("checkout.line_item",line_item);
                }

                return app.checkoutService.viewModel.get("checkout.line_item");

            });

        },
        createCallBack:function(data){
            if(data && data.length){
                var line_item= {
                    line_item_id    : data[0].line_item_id
                };

                app.checkoutService.viewModel.set("checkout.line_item",line_item);
                //console.log(app.checkoutService.viewModel.get("checkout.line_item"));
            }
        },

        update  : function(){
            var resource = 'entity_commerce_line_item';
            var line_item_id = app.checkoutService.viewModel.get("checkout.line_item.line_item_id");
            var product_id = app.checkoutService.viewModel.get("selected_product.product_id");
            var title = app.checkoutService.viewModel.get("selected_product.title");
            var order_id  = app.checkoutService.viewModel.get("checkout.order.order_id");

            var requestData= {
                "type": "product",
                "order_id":order_id,
                "quantity": "1.00",
                "commerce_product":product_id
            };
            schema = {
                model: {
                    id: "line_item_id"
                },
                data: function(result) {
                    return [result];
                }
            }

            var options = {
                //callback:this.updateCallBack
            };

            var p = app.services._update(resource,line_item_id,requestData, schema, options);
            return p.then(function(data){
                if(data && data.length){
                    var line_item= {
                        line_item_id    : data[0].line_item_id
                    };

                    app.checkoutService.viewModel.set("checkout.line_item",line_item);
                    //console.log(app.checkoutService.viewModel.get("checkout.line_item"));
                }

                return app.checkoutService.viewModel.get("checkout.line_item");

            });

        },
        updateCallBack:function(data){
            if(data && data.length){
                var line_item= {
                    line_item_id    : data.line_item_id
                };

                app.checkoutService.viewModel.set("checkout.line_item",line_item);
                //console.log(app.checkoutService.viewModel.get("checkout.line_item"));
            }
        },


        delete  : function(status){


        },


    });

    app.lineItemService = {
        viewModel: new LineItemViewModel()
    };
})(window);
