(function (global) {
        var validator,
            crudServiceBaseUrl = "http://demos.kendoui.com/service",
            app = global.app = global.app || {};




        var crudViewModel = kendo.data.ObservableObject.extend({

            dataSource: new kendo.data.DataSource({
                transport: {
                    read:  {
                        url: crudServiceBaseUrl + "/Products",
                        dataType: "jsonp"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/Products/Update",
                        dataType: "jsonp"
                    },
                    destroy: {
                        url: crudServiceBaseUrl + "/Products/Destroy",
                        dataType: "jsonp"
                    },
                    create: {
                        url: crudServiceBaseUrl + "/Products/Create",
                        dataType: "jsonp"
                    },
                    parameterMap: function(options, operation) {
                        if (operation !== "read" && options.models) {
                            return {models: kendo.stringify(options.models)};
                        }
                    }
                },
                batch: true,
                pageSize: 20,
                schema: {
                    model: {
                        id: "ProductID",
                        fields: {
                            ProductID: { editable: false, nullable: true },
                            ProductName: { type: "string" },
                            UnitPrice: { type: "number" },
                            Discontinued: { type: "boolean" },
                            UnitsInStock: { type: "number" }
                        }
                    }
                }
            }),
            addProduct: function() {
                var newProduct = this.dataSource.add(); //adds a new data item to the DataSource
                this.set("selectedProduct", newProduct); //sets the selected product
                app.application.navigate("#editor"); //navigates to editor view
            },
            selectedProduct: {},
            saveProduct: function() {
                //if(validator.validate()) { //validates the input
                    this.dataSource.sync(); //synchronizes changes through the transport
                    app.application.navigate("#views/tmp/crud.html"); //navigates to main view
               // }
            },
            cancelChanges: function() {
                this.dataSource.cancelChanges(); //cancels the changes made to the DataSource after the last sync
                app.application.navigate("#main"); //navigates to main view
            },
            editProduct: function(e) {
                var that = this;
                var product = app.crudService.viewModel.dataSource.get(e.context); //gets the ActionSheet context
                app.application.navigate("#editor?ProductID=" + product.ProductID); //navigates to editor view and add query string parameter
            },
            destroyProduct: function(e) {
                var product = app.crudService.viewModel.dataSource.get(e.context); //gets the ActionSheet context
                app.crudService.viewModel.dataSource.remove(product); //removes the product from the DataSource
                app.crudService.viewModel.dataSource.sync(); //synchronizes changes through the transport
            },
            showDetails: function(e) {
                var product =  app.crudService.viewModel.dataSource.get(e.context); //gets the ActionSheet context
                app.application.navigate("#details?ProductID=" + product.ProductID); //navigates to details view
            }

        });

        app.crudService = {

            viewModel: new crudViewModel()
        };
    }
)(window);