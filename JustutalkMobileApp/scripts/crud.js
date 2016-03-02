(function (global) {

        var validator,
            crudServiceBaseUrl = "http://excitenet.co.uk/users-json",
            app = global.app = global.app || {};

        var crudViewModel = kendo.observable({

            selectedProduct: {},
            dsCrud: new kendo.data.DataSource({

                transport: {
                    read:  {
                        url: crudServiceBaseUrl + "/jusutalk-mobile-test.json",
                        dataType: "json"
                    },
                    update: {
                        url: function(e){

                            /**
                             *Note:
                             *------------------
                             */
                            //id passed purely for the benefit of drupal services which expects id in qstring. kendo crud posts id with rest
                            // of data.
                            var id =app.crudService.viewModel.get("selectedProduct.tid");
                            return crudServiceBaseUrl + "/jusutalk-mobile-test/" + id;
                        },
                        beforeSend: function(xhr){
                            var token = app.loginService.viewModel.token;
                            xhr.setRequestHeader('X-CSRF-Token', token);
                        },
                        dataType: "json",
                        type: "PUT"
                    },
                    destroy: {
                        url: function(e){

                            /**
                             *Note:
                             *------------------
                             */
                            //id passed purely for the benefit of drupal services. kendo crud posts id with rest
                            // of data.                            

                            var id = e.models[0].tid;
                            return crudServiceBaseUrl + "/jusutalk-mobile-test/" + id;
                        },
                        beforeSend: function(xhr){
                            var token = app.loginService.viewModel.token;
                            xhr.setRequestHeader('X-CSRF-Token', token);

                        },
                        dataType: "json",
                        type: "DELETE"
                    },
                    create: {
                        url: crudServiceBaseUrl + "/jusutalk-mobile-test.json",
                        beforeSend: function(xhr){
                            var token = app.loginService.viewModel.token;
                            xhr.setRequestHeader('X-CSRF-Token', token);
                        },
                        dataType: "json",
                        type: "POST"
                    },
                    parameterMap: function(options, operation) {

                        if (operation !== "read" && options.models) {
                            return {models: kendo.stringify(options.models)};
                        }
                        /*
                         if (operation !== "read" && options.models) {
                         return {models: kendo.stringify(options.models)};
                         }
                         */

                    }
                },
                batch: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
                pageSize: 20,
                sort: {
                    field:  "tid",
                    dir:    "desc"
                },
                schema: {
                    /*total: function() {
                        return 32;
                    },*/
                    total: "total",
                    data: "data",
                    model: {
                        id: "tid",
                        fields: {
                            tid: { editable: false, nullable: true },
                            name: { type: "string" },
                            status: { type: "number" },
                            email: { type: "string" }
                        }
                    }
                },
                requestStart: function(e) {

                    app.application.pane.loader.show();

                    //check the "response" argument to skip the local operations
                    if (e.type === "read" && e.response) {
                        //console.log("Current request is 'read'.");
                    }
                },
                requestEnd: function(e) {
                    app.application.pane.loader.hide();
                }
            }),

            addProduct: function() {
                var newProduct = this.dsCrud.add(); //adds a new data item to the DataSource
                this.set("selectedProduct", newProduct); //sets the selected product
                app.application.navigate("#editor"); //navigates to editor view
            },
            saveProduct: function() {
                if(app.crudService.validator.validate()) { //validates the input
                    app.crudService.viewModel.dsCrud.sync(); //synchronizes changes through the transport
                    app.application.navigate("#views/tmp/crud.html"); //navigates to crud-view view
                }
            },
            cancelChanges: function() {
                this.dsCrud.cancelChanges(); //cancels the changes made to the DataSource after the last sync
                app.application.navigate("#crud-view"); //navigates to crud-view view
            },
            editProduct: function(e) {

                var id = (typeof e.context != 'undefined') ? e.context : e.data.id;

                var that = this;
                var product = app.crudService.viewModel.dsCrud.get(id); //gets the ActionSheet context
                app.application.navigate("#editor?tid=" + product.tid); //navigates to editor view and add query string parameter
            },
            destroyProduct: function(e) {

                var id = (typeof e.context != 'undefined') ? e.context : e.data.id;

                var product = app.crudService.viewModel.dsCrud.get(id); //gets the ActionSheet context
                app.crudService.viewModel.dsCrud.remove(product); //removes the product from the DataSource
                app.crudService.viewModel.dsCrud.sync(); //synchronizes changes through the transport
            },
            showDetails: function(e) {
                var product =  app.crudService.viewModel.dsCrud.get(e.context); //gets the ActionSheet context
                app.application.navigate("#details?tid=" + product.tid); //navigates to details view
            }
        });

        app.crudService = {

            viewModel: crudViewModel

        };
    }
)(window);