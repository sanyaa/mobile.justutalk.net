(function (global) {
    
    var app = global.app = global.app || {};

    var _create = function(resource,post_data, schema,options){

        var token = app.loginService.viewModel.token.trim();
        var service_endpoint = app.config.service_endpoint; //'http://excitenet.co.uk/users-json/';
        var url = service_endpoint + resource;

        if(typeof schema === "undefined"){
            schema = {}
        }
        if(!schema.hasOwnProperty('data')){
            schema.data= function(result) {
                return objToArray(result);
            }
        }


        var dataSource = new kendo.data.DataSource({
            transport: {
                /**/
                read: {
                    url: url,
                    //cache: true,
                    //contentType: "application/json",
                    beforeSend: function(xhr){
                        //var token = that.get("token").trim();
                        xhr.setRequestHeader('X-CSRF-Token', token);
                    },
                    dataType: "json",
                    type: "POST",
                    data: post_data
                },
                /*
                parameterMap: function(data, type) {
                    if (type == "create") {
                        // send the created data items as the "models" service parameter encoded in JSON
                        return { models: kendo.stringify(data.models) };
                    }
                }*/
            },

            schema:schema,
            batch: true,
            requestStart: function(){
                app.application.pane.loader.show();
            },
            requestEnd: function(){
                app.application.pane.loader.hide();
            }

        });

        dataSource
            .fetch()
            .then(function(){
                var data = dataSource.data();

                if((options) && typeof(options.callback) === "function"){
                    if(!typeof(options.next_callback) === "function"){
                        options.next_callback = null;
                    }
                    options.callback(data,options.next_callback);
                }
                return data;
            },
            function(e){
                //var msg = JSON.parse(e.responseText).form_errors.title;
                //console.log(msg);
                //alert(msg);
            }
        );
    }

    var create = function(resource,post_data, schema,options){

        var token = app.loginService.viewModel.token.trim();
        var service_endpoint = app.config.service_endpoint; //'http://excitenet.co.uk/users-json/';
        var url = service_endpoint + resource;

        if(typeof schema === "undefined"){
            schema = {}
        }
        if(!schema.hasOwnProperty('data')){
            schema.data= function(result) {
                return objToArray(result);
            }
        }


        var dataSource = new kendo.data.DataSource({
            transport: {
                /**/
                read: {
                    url: url,
                    //cache: true,
                    //contentType: "application/json",
                    beforeSend: function(xhr){
                        //var token = that.get("token").trim();
                        xhr.setRequestHeader('X-CSRF-Token', token);
                    },
                    dataType: "json",
                    type: "POST",
                    data: post_data
                },
                /*
                 parameterMap: function(data, type) {
                 if (type == "create") {
                 // send the created data items as the "models" service parameter encoded in JSON
                 return { models: kendo.stringify(data.models) };
                 }
                 }*/
            },

            schema:schema,
            batch: true,
            requestStart: function(){
                app.application.pane.loader.show();
            },
            requestEnd: function(){
                app.application.pane.loader.hide();
            }

        });

        return dataSource
            .fetch()
            .then(function(){
                    var data = dataSource.data();

                    /**
                     * run a given callback if provided
                     * todo: change all to promises
                     */
                    if((options) && typeof(options.callback) === "function"){
                        if(!typeof(options.next_callback) === "function"){
                            options.next_callback = null;
                        }
                        options.callback(data,options.next_callback);
                    }

                    return data;
                },
                function(e){
                    alert('error');
                    //var msg = JSON.parse(e.responseText).form_errors.title;
                    console.log(e);
                    //alert(msg);
                }
            );
    }

    var _update= function(resource, id, post_data, schema,options){

        if((options) && options.id !== "" && typeof options.id != "undefined"){
            var id = options.id;
        }


        var token = app.loginService.viewModel.token.trim();
        var service_endpoint = app.config.service_endpoint; //'http://excitenet.co.uk/users-json/';
        var url = service_endpoint + resource + '/' + encodeURIComponent(id) + ".json";

        var p = jQuery.ajax({
            url: url, //"http://excitenet.co.uk/users-json/node/" ,
            type: 'put',
            data: post_data,
            dataType: 'json',
            beforeSend: function(xhr){
                xhr.setRequestHeader('X-CSRF-Token', token);
                xhr.setRequestHeader('Accept','application/json');
                app.application.pane.loader.show();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert('page_node_update_submit - failed to update node');
                console.log(JSON.stringify(XMLHttpRequest));
                console.log(JSON.stringify(textStatus));
                console.log(JSON.stringify(errorThrown));
            },
            success: function (data) {

                //alert( "success" );
                //console.log(data);

                if((options) && typeof(options.callback) === "function"){
                    options.callback(data);
                }
                return data;

            },
            complete: function (data) {
                app.application.pane.loader.hide();
                //console.log(data);
                //alert( "complete" );

            }
        });

        return p.then(function(data){

            return data;

        });


        /*
        return dataSource
            .fetch()
            .then(function(){
                    var data = dataSource.data();

                    if((options) && typeof(options.callback) === "function"){
                        if(!typeof(options.next_callback) === "function"){
                            options.next_callback = null;
                        }
                        options.callback(data,options.next_callback);
                    }

                    return data;
                },
                function(e){
                    //var msg = JSON.parse(e.responseText).form_errors.title;
                    //console.log(e);
                    alert(msg);
                }
            );
            */



    }

    var update= function(resource, id, post_data, schema,options){

        if((options) && options.id !== "" && typeof options.id != "undefined"){
            var id = options.id;
        }


        var token = app.loginService.viewModel.token.trim();
        var service_endpoint = app.config.service_endpoint; //'http://excitenet.co.uk/users-json/';
        var url = service_endpoint + resource + '/' + encodeURIComponent(id) + ".json";



         if(schema == ''){
             schema = {
                 data: function(result) {
                    return result;
                 }
             }
         }


         //console.log("update: ");
         //console.log(post_data);

         var dataSource = new kendo.data.DataSource({
             transport: {

                 read: {
                     url: url, //"http://excitenet.co.uk/users-json/node/" ,
                     //type: 'put',
                     data: post_data,
                     dataType: 'json',
                     type: "PUT",
                     //cache: true,
                     beforeSend: function(xhr){
                         //xhr.setRequestHeader('X-Content-Type','application/json');
                         xhr.setRequestHeader('X-CSRF-Token', token);
                         //xhr.setRequestHeader('Accept','application/json');
                     }

                 },
                 parameterMap: function(data, type) {
                     if (type == "update") {
                         // send the created data items as the "models" service parameter encoded in JSON
                         //return  kendo.stringify(data.models) ;
                     }
                 }
             },
             schema:schema,
             //batch: true,
             requestStart: function(){
                app.application.pane.loader.show();
             },
             requestEnd: function(){
                app.application.pane.loader.hide();
             }

         });

         return dataSource
            .fetch()
            .then(function(){
                    var data = dataSource.data();

                    /**
                     * run a given callback if provided
                     * todo: change all to promises
                     */
                    /*if((options) && typeof(options.callback) === "function"){
                        if(!typeof(options.next_callback) === "function"){
                            options.next_callback = null;
                        }
                        options.callback(data,options.next_callback);
                    }*/

                    //console.log("update: ");
                    //console.log(data);


                    return data;
                },
                function(e){
                    //var msg = JSON.parse(e.responseText).form_errors.title;
                    //console.log(e);
                    alert(msg);
                }
            );

    }

    var remove = function(resource, id, schema, options){

        if((options) && options.id !== ""){
            var id = options.id;
        }

        var token = app.loginService.viewModel.token.trim();
        var service_endpoint = app.config.service_endpoint; //'http://excitenet.co.uk/users-json/';
        var url = service_endpoint + resource + '/' + id;

        if(typeof schema === "undefined"){
            schema = {}
        }
        if(!schema.hasOwnProperty('data')){
            schema.data= function(result) {
                return result;
            }
        }

        var dataSource = new kendo.data.DataSource({
            transport: {
                /**/
                read: {
                    url: url,
                    //cache: true,
                    beforeSend: function(xhr){
                        //var token = that.get("token").trim();
                        xhr.setRequestHeader('X-CSRF-Token', token);
                        xhr.setRequestHeader('Accept','application/json');
                    },
                    dataType: "json",
                    type: "DELETE"
                }
                /*
                 parameterMap: function(data, type) {
                 if (type == "create") {
                 // send the created data items as the "models" service parameter encoded in JSON
                 return { models: kendo.stringify(data.models) };
                 }
                 }*/
            },

            schema:schema,
            batch: true,
            requestStart: function(){
                app.application.pane.loader.show();
            },
            requestEnd: function(){
                app.application.pane.loader.hide();
            }

        });

        dataSource
            .fetch()
            .then(function(){
                var data = dataSource.data();
                console.log(data);

                if((options) && typeof(options.callback) === "function"){
                    options.callback(data);
                }
                return data;
            },
            function(e){
                var msg = JSON.parse(e.responseText).form_errors.title;
                console.log(msg);
                alert(msg);
            });
    }
    
    var _get = function(resource,params, schema,options){

        var url_options='', parameters;

        Object.keys(params).forEach(function (key) {
            if(key !== 'parameters' && params[key] !== 0 && params[key] !== ""){

                var val = params[key];
                url_options+= key + "=" + params[key] + '&';

            }else{

                if(key == 'parameters'){
                    Object.keys(params.parameters).map(function (key) {
                        if(params.parameters[key] !== 0 && params.parameters[key] !== ""){
                            url_options+= "parameters[" + key + "]=" + params.parameters[key] + '&';
                        }

                    })
                }

            }

        });

        url_options = url_options.split('&');
        var poped = url_options.pop();
        url_options = url_options.join('&');


        var token = app.loginService.viewModel.token.trim();
        var service_endpoint = app.config.service_endpoint; //'http://excitenet.co.uk/users-json/';
        var url = service_endpoint + resource + "?" + url_options;


        if(typeof schema === "undefined"){
            schema = {}
        }

        if(!schema.hasOwnProperty('data')){
            schema.data= function(result) {
                return objToArray(result);
            }
        }
        //console.log(schema);
        
        var dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: url,
                    beforeSend: function(xhr){
                        xhr.setRequestHeader('X-CSRF-Token', token);
                    },                        
                    dataType: "json",                        
                    type: "GET"
                }
            },            
            schema:schema,
            batch: true,
            requestStart: function(){
                app.application.pane.loader.show();
            },
            requestEnd: function(){
                app.application.pane.loader.hide();
            }
            
            /*
            batch: true,
            pageSize: 20,
            requestStart:
            requestEnd:
            */
            
        });

        //dataSource.bind("error", dataSource_error);
        //dataSource.fetch();

        dataSource
            .fetch()
            .then(function(){

                var data = dataSource.data();

                if((options) && typeof(options.callback) === "function"){
                    if(!typeof(options.next_callback) === "function"){
                        options.next_callback = null;
                    }
                    options.callback(data,options.next_callback,options.dfd);
                }
                return data;

            },function(e){
                //var msg = JSON.parse(e.responseText).form_errors.title;
                console.log(e);

            });

        //return p;
    }

    var get = function(resource,params, schema,options){

        var url_options='', parameters;

        Object.keys(params).forEach(function (key) {
            if(key !== 'parameters' && params[key] !== 0 && params[key] !== ""){

                var val = params[key];
                url_options+= key + "=" + params[key] + '&';

            }else{

                if(key == 'parameters'){
                    Object.keys(params.parameters).map(function (key) {
                        if(params.parameters[key] !== 0 && params.parameters[key] !== ""){
                            url_options+= "parameters[" + key + "]=" + params.parameters[key] + '&';
                        }

                    })
                }

            }

        });

        url_options = url_options.split('&');
        var poped = url_options.pop();
        url_options = url_options.join('&');


        var token = app.loginService.viewModel.token.trim();
        var service_endpoint = app.config.service_endpoint; //'http://excitenet.co.uk/users-json/';
        var url = service_endpoint + resource + "?" + url_options;
        


        if(typeof schema === "undefined"){
            schema = {}
        }

        if(!schema.hasOwnProperty('data')){
            schema.data= function(result) {
                return objToArray(result);
            }
        }
        //console.log(schema);

        var dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: url,
                    beforeSend: function(xhr){
                        xhr.setRequestHeader('X-CSRF-Token', token);
                    },
                    dataType: "json",
                    type: "GET"
                }
            },
            schema:schema,
            batch: true,
            requestStart: function(){
                app.application.pane.loader.show();
            },
            requestEnd: function(){
                app.application.pane.loader.hide();
            }

            /*
             batch: true,
             pageSize: 20,
             requestStart:
             requestEnd:
             */

        });

        //dataSource.bind("error", dataSource_error);
        //dataSource.fetch();

        return dataSource
            .fetch()
            .then(function(){

                var data = dataSource.data();
                //console.log('data 1');
                //console.log(data);

                return data;

            },function(e){
                //var msg = JSON.parse(e.responseText).form_errors.title;
                console.log(e);

            });
    }

    var kget = function(resource,params, schema,options){

        var url_options='', parameters;

        Object.keys(params).forEach(function (key) {
            if(key !== 'parameters' && params[key] !== 0 && params[key] !== ""){

                var val = params[key];
                url_options+= key + "=" + params[key] + '&';

            }else{

                if(key == 'parameters'){
                    Object.keys(params.parameters).map(function (key) {
                        if(params.parameters[key] !== 0 && params.parameters[key] !== ""){
                            url_options+= "parameters[" + key + "]=" + params.parameters[key] + '&';
                        }

                    })
                }

            }

        });

        url_options = url_options.split('&');
        var poped = url_options.pop();
        url_options = url_options.join('&');


        var token = app.loginService.viewModel.token.trim();
        var service_endpoint = app.config.service_endpoint; //'http://excitenet.co.uk/users-json/';
        var url = service_endpoint + resource + "?" + url_options;


        if(typeof schema === "undefined"){
            schema = {}
        }

        if(!schema.hasOwnProperty('data')){
            schema.data= function(result) {
                return objToArray(result);
            }
        }
        //console.log(schema);

        var dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: url,
                    beforeSend: function(xhr){
                        xhr.setRequestHeader('X-CSRF-Token', token);
                    },
                    dataType: "json",
                    type: "GET"
                }
            },
            schema:schema,
            batch: true,
            requestStart: function(){
                app.application.pane.loader.show();
            },
            requestEnd: function(){
                app.application.pane.loader.hide();
            }

            /*
             batch: true,
             pageSize: 20,
             requestStart:
             requestEnd:
             */

        });

        //dataSource.bind("error", dataSource_error);
        //dataSource.fetch();

        return dataSource
            .fetch()
            .then(function(){

                var data = dataSource.data();
                console.log('data 1');
                console.log(data);

                return data;

            },function(e){
                //var msg = JSON.parse(e.responseText).form_errors.title;
                console.log(e);

            });
    }
    /**
     * Utils
     * ==================================================
     */

    objToArray  = function(response){

        var vals = [];

        if(Array.isArray(response)){
            return response;
        }

        Object.keys(response).forEach(function(v,i,a){
            vals.push(response[v]);
        });

        return vals;
    }


    // services functions
    app.services = {
        //service_endpoint : 'http://excitenet.co.uk/users-json/',
        create  : create,
        update  : update,
        _update  : _update,
        remove  : remove,
        get  : get,
        //getOne  : getOne,
        objToArray : objToArray
    }
    
    
})(window);
