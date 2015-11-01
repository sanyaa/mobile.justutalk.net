(function (global) {
    
        var validator,
        crudServiceBaseUrl = "http://excitenet.co.uk/users-json",
        app = global.app = global.app || {};

        var crudViewModel = kendo.data.ObservableObject.extend({
           
            selectedProduct: {},  
            dataSource: new kendo.data.DataSource({                
               
                transport: {
                    read:  {
                        url: crudServiceBaseUrl + "/test.json",
                        dataType: "json"
                    },
                    update: {                        
                        url: function(e){
                            
                            /**
                            *Note:
                            *------------------
                            */
                            //id passed purely for the benefit of drupal services. kendo crud posts id with rest
                            // of data.
                            var id =app.crudService.viewModel.get("selectedProduct.tid"); 
                            return crudServiceBaseUrl + "/test/" + id;
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
                            return crudServiceBaseUrl + "/test/" + id;
                        },
                        beforeSend: function(xhr){
                            var token = app.loginService.viewModel.token; 
                            xhr.setRequestHeader('X-CSRF-Token', token);                            

                        },
                        dataType: "json",
                        type: "DELETE"
                    },
                    create: {
                        url: crudServiceBaseUrl + "/test.json",                         
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
                pageSize: 20,
                schema: {
                    model: {
                        id: "tid",
                        fields: {
                            tid: { editable: false, nullable: true },
                            name: { type: "string" },
                            status: { type: "number" },
                            email: { type: "string" }                            
                        }
                    },
                    data: function (result) {
                       //console.log(result);
                       //obj = angular.fromJson(result);                       
                        
                      return result;
                    }
                },
                requestStart: function(e) {
                    
                    /*
                    var myCondition = true;
                    if (myCondition) {
                        e.preventDefault();
                    }
                    */                   
                    
                    
                    //check the "response" argument to skip the local operations
                    if (e.type === "read" && e.response) {
                        //console.log("Current request is 'read'.");
                    }
                    
                    //kendo.ui.progress($("#progress"), true);
                },
                requestEnd: function(e) {
                    
                    var response = e.response;
                    var type = e.type;
                    
                    //console.log(type); // displays "read"
                    //console.log(response.length); // displays "77"                    
                    //kendo.ui.progress($("#progress"), false);
                }
            }),
            addProduct: function() {
                var newProduct = this.dataSource.add(); //adds a new data item to the DataSource
                this.set("selectedProduct", newProduct); //sets the selected product
                app.application.navigate("#editor"); //navigates to editor view
            },
            
            saveProduct: function() {
                if(app.crudService.validator.validate()) { //validates the input
                    this.dataSource.sync(); //synchronizes changes through the transport
                    app.application.navigate("#views/tmp/crud.html"); //navigates to main view
                }
            },
            cancelChanges: function() {
                this.dataSource.cancelChanges(); //cancels the changes made to the DataSource after the last sync
                app.application.navigate("#main"); //navigates to main view
            },
            editProduct: function(e) {
                var that = this;
                var product = app.crudService.viewModel.dataSource.get(e.context); //gets the ActionSheet context
                app.application.navigate("#editor?tid=" + product.tid); //navigates to editor view and add query string parameter
            },
            destroyProduct: function(e) {
                var product = app.crudService.viewModel.dataSource.get(e.context); //gets the ActionSheet context
                app.crudService.viewModel.dataSource.remove(product); //removes the product from the DataSource
                app.crudService.viewModel.dataSource.sync(); //synchronizes changes through the transport
            },
            showDetails: function(e) {
                var product =  app.crudService.viewModel.dataSource.get(e.context); //gets the ActionSheet context
                app.application.navigate("#details?tid=" + product.tid); //navigates to details view
            }
            
           
        });

        app.crudService = {

            viewModel: new crudViewModel()
        };
    }
)(window);