(function (global) {


    var ContentViewModel,
        app = global.app = global.app || {};


    ContentViewModel = kendo.data.ObservableObject.extend({


        get     : function(nid){

            var resource = 'views/mobile_contents';
            //var line_item_id = app.checkoutService.viewModel.get("checkout.line_item.line_item_id");

            //if(!line_item_id) return;

            schema = {
                model: {
                    id: 'nid'
                },
                data: function(result) {
                    return [result];
                }
            };

            var params = {
                page        : 0,
                /*parameters  : {
                    line_item_id    : line_item_id
                },*/
                format_output: 1,
                nid         : nid,
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

                    /*
                    var order= {
                        order_id        : data[0].order_id,
                        status          : data[0].status,
                        profile_id      : data[0].commerce_customer_billing,
                        line_item_id    : data[0].commerce_line_items[0],
                        order_total     : data[0].commerce_order_total.amount
                    };

                    app.checkoutService.viewModel.set("checkout.order",order);
                    */


                    return data[0].nodes;
                }
            });


        },

        getMobileContent : function(nid, template_area, display_area){


            var nodes = [];
            var that = this;

            var o =that.get(nid);
            o.then(function(data){
                data.forEach(function(v,i,arr){

                    var regexp = /\r\n/gi;
                    var body = v.node.body.replace(regexp, "<br>");

                    var regexp = /\n/gi;
                    var body = body.replace(regexp, "<br>");

                    nodes.push({
                        nid: v.node.nid,
                        title: v.node.title,
                        body: body
                    });

                });


                var templateContent = $("#" + template_area).html();
                var template = kendo.template(templateContent);

                var result = kendo.render(template, nodes); //render the template
                $("#"+display_area).html(result);

            });
        },


        /***************           NOT YET IMPLEMENTED         **************/
        //======================================================================



        create  : function(){

            var resource = 'line-item';

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


        update  : function(){
            var resource = 'entity_commerce_line_item';

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


        delete  : function(status){


        },


    });

    app.contentService = {
        viewModel: new ContentViewModel()
    };
})(window);
