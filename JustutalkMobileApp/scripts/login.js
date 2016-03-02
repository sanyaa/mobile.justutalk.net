(function (global) {
    
    
    var LoginViewModel,
    app = global.app = global.app || {};
   

    //So, you should define the model as:
   /* var model_node = kendo.data.Model.define({
        id: "nid",
        fields: {
            nid: { type: 'number' },
            type: { type: 'string', validation: {required:true}  },
            title: { type: 'string', validation: {required:true} },
            body: {}
            //to_phone: { type: 'string', validation: {required:true} },
            //contact_phones: {nullable: true, validation: {required:true}}

        }
    });*/
    

    LoginViewModel = kendo.data.ObservableObject.extend({
        isLoggedIn  : false,
        username    : "admin",
        password    : "H4der222",
        loginError  : "",
        token       : "",
        //node_data   : new model_node(),


        user        : {
            username    : "admin",
            password    : "H4der222",
            user_id     : 0,
            email       : '',
            currency    : 'USD',
            tarrif      : 6,
            first_name  : '',
            last_name   : '',
            phone       : '',
            client_id   : '',
            token       : "",
            country_iso : 'GB'
        },


        clearForm: function () {
            var that = this;

            that.set("username", "");
            that.set("password", "");
        },

        checkEnter: function (e) {
            var that = this;

            if (e.keyCode == 13) {
                $(e.target).blur();
                that.onLogin();
            }
        },

        //Custom stuff
        //--------------------------

        onLogin: function(){
                     
            
            var that = this;
            if(that.get("isLoggedIn")){
                
                navigator.notification.alert("you're already logged in");                
                return false;                
                
            }            
            
            
            username = that.get("username").trim(),
            password = that.get("password").trim();
           
            if (username === "" || password === "") {

                navigator.notification.alert("Both fields are required!",
                    function () { }, "Login failed", 'OK');

                return;
            } 
            
            
            app.application.pane.loader.show();
            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "http://excitenet.co.uk/users-json/user/login.json",
                        data: { username: username, password: password},
                        dataType: "json" ,
                        type: "POST"
                    }
                },
                schema: {

                    data: function(result) {
                         return [
                            {user:result.user},
                            {token:result.token},
                            {"user_id":result.user.uid}
                        ];
                    }
                }
                /*,
                error: function(e){
                                        
                    //console.log(e);
                    alert(e.statusText);                                      
                    
                    app.application.pane.loader.hide();
                    that.set('token','');                    
                    that.set('isLoggedIn',false);                    
                    
                    that.set("loginError", e.statusText);
                }
                */
            });
            
            dataSource
                .fetch()
                .then(function(){

                    var data = dataSource.data();
                    var _token  =    data[1].token;
                    var _uid    =    data[2].user_id;

                    app.application.pane.loader.hide();

                    //console.log(data);

                    that.set("isLoggedIn", true);
                    that.set('token', _token);
                    that.set("loginError", "");

                    that.set("user.username", data[0].user.name);
                    that.set("user.password", data[0].user.password);
                    that.set("user.user_id", _uid);
                    that.set("user.email", data[0].user.mail);
                    that.set("user.currency", "USD");
                    that.set("user.tariff", "6");
                    that.set("user.first_name", "");
                    that.set("user.last_name", "");
                    that.set("user.phone", "");
                    that.set("user.client_id", "");
                    that.set("user.country_iso", "GB");
                    that.set("user.token", _token);

                    //console.log(that.user);

                    app.application.navigate("#views/dashboard.html");
                
                },function(reason) {                    
                    
                    //console.log(reason);
                    
                    app.application.pane.loader.hide();
                    that.set('token','');                    
                    that.set('isLoggedIn',false);
                    
                    alert('Failed: ' + reason.statusText);
                    that.set("loginError", reason.statusText);
                    
                });
        },
        
        onLogout: function (){
            
            
            var that = this;
            
            
            if(!that.get("isLoggedIn")){
                
                navigator.notification.alert("you're already logged out");                
                return false;                
                
            }
            
            app.application.pane.loader.show();

            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "http://excitenet.co.uk/users-json/user/logout.json",
                        beforeSend: function(xhr){
                            var token = that.get("token").trim();
                            xhr.setRequestHeader('X-CSRF-Token', token);
                        },
                        dataType: "json" ,
                        //crossDomain: true,
                        type: "POST"

                    }
                },
                schema: {
                    
                    data: function(result) {
                        // the data which the data source will be bound to is in the values field
                        
                        return [result];
                    }
                }
            });
            dataSource.fetch(function(){
                app.application.pane.loader.hide();
                var data = dataSource.data();
                
                //console.log(data[0]);
                var logout = data[0];
               
                if (logout) {
                    //alert('Logged out!');
                    
                    that.clearForm();
                    that.set('token',''); 
                    that.set("isLoggedIn", false);
                    //app.application.pane.loader.hide(); 
                    app.application.navigate("#views/home.html");
                    
                }else{
                    //app.application.pane.loader.hide(); 
                    alert('Cannot log out!');
                    
                } /**/
            });
        },

        
        
        
        
        
        
        
        //--------------------------------------------------------------------------
        




        _onLogin: function () {

            var that = this,
            username = that.get("username").trim(),
            password = that.get("password").trim();

            if (username === "" || password === "") {

                navigator.notification.alert("Both fields are required!",
                    function () { }, "Login failed", 'OK');

                return;
            }

            app.application.pane.loader.show();
            $drupal
                .user_login(username, password)
                .then(function(data) {
                    if (data.user.uid) {

                        that.set("isLoggedIn", true);
                        that.set('token', data.token);
                        that.set("loginError", "");
                        app.application.pane.loader.hide();
                        app.application.navigate("#views/dashboard.html");
                    }else{
                        app.application.pane.loader.hide();
                        alert('sorry!');
                    }
                }, function(reason) {

                        app.application.pane.loader.hide();
                        that.set('token','');
                        that.set('isLoggedIn',false);

                        //alert('Failed: ' + reason.data[0]);
                        that.set("loginError", reason.data[0]);
                });

        },

        _onLogout: function () {
            var that = this;
            app.application.pane.loader.show();
            $drupal
                .user_logout()
                .then(function(data) {
                    if (!data.user.uid) {
                        //alert('Logged out!');

                        that.clearForm();
                        that.set('token','');
                        that.set("isLoggedIn", false);
                        app.application.pane.loader.hide();
                        app.application.navigate("#views/home.html");

                    }else{
                        app.application.pane.loader.hide();
                        alert('Cannot log out!');

                    }
                });
        },




        kToken: function () {
            var that = this;
            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "http://excitenet.co.uk/users-json/user/token",
                        dataType: "json",
                        //crossDomain: true,
                        type: "POST"

                    }
                },
                schema: {

                    /*
                     * Note: The returned json from transport read must be an array or
                     * you can assign the data property of schema an array property returned in the json (eg return [result.body]).
                     * json here from drupal contains a data propert that is conflicting with data object in the template
                     * the solution is to use the trick below: return [{"result":[result]}];
                     */
                    data: function(result) {
                        // the data which the data source will be bound to is in the values field
                        //console.log(result);
                        return [result];
                    }
                }
            });
            dataSource
                .fetch()
                .then(function(){
                    var data = dataSource.data();
                    var tkn = data[0].token;
                    that.set('token',tkn);

                    alert(tkn);
                    //console.log(tkn);


                });
        },

        kCreateNode1: function(){
            var that = this;
            var token = that.get("token").trim();

            /*
            that.set('node_data.nid',-1);
            that.set('node_data.type',"article");
            that.set('node_data.title',"testing 1234");
            that.set('node_data.body',{"value": "<p>test</p>\n", "format": "filtered_html"});
            var params = {
                'type':'article',
                'title':'Page submitted via iphone',
                'body[value]':'<p>test</p>',
                'body[format]':'filtered_html.'
            };
            */

            var requestData= {
                "type":"article",
                "title":"Page submitted via iphone",
                "body": {
                    "value": "<p>test</p>\n",
                    "format": "filtered_html"
                }
            };

            var dataSource = new kendo.data.DataSource({
                batch: true,
                transport: {
                    create: {
                        url: "http://excitenet.co.uk/users-json/node",
                        dataType: "json", //"jsonp" is required for cross-domain requests; use "json" for same-domain requests
                        type: "POST",
                        //contentType: "application/json; charset=utf-8",
                        //data: requestData,
                        beforeSend: function(xhr){
                            //console.log(xhr);
                            xhr.setRequestHeader('X-CSRF-Token', token);
                            // xhr.setRequestHeader('Content-Type','application/json');

                        }
                    },
                    parameterMap: function(data, type) {
                        if (type == "create") {
                            // send the created data items as the "models" service parameter encoded in JSON
                            return { models: kendo.stringify(data.models) };
                        }
                    }
                },
                schema: {
                    model: {
                        id: "nid",
                        fields: {
                            nid: {editable: false, nullable: true},
                            type: {type: "string"},
                            title: {type: "string"},
                            body: {}
                        }
                    }
                },
                error: function(e){
                    //console.log(e);
                    alert('error occured');
                    //this.cancelChanges();
                }
            });
            //dataSource.bind("sync", dataSource_sync);
            dataSource.add(requestData);
            dataSource.sync();
        },

        kConnect: function(token){

            var that = this;
            var token = that.get("token").trim();

            //alert(token);

            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "http://excitenet.co.uk/?q=users-json/system/connect.json",
                        beforeSend: function(xhr){
                            xhr.setRequestHeader('X-CSRF-Token', token);
                        },
                        dataType: "json",
                        type: "POST"
                    }
                },
                schema: {

                    /*
                     * Note: The returned json from transport read must be an array or
                     * you can assign the data property of schema an array property returned in the json (eg return [result.body]).
                     * json here from drupal contains a data propert that is conflicting with data object in the template
                     * the solution is to use the trick below: return [{"result":[result]}];
                     */
                    data: function(result) {
                        // the data which the data source will be bound to is in the values field
                        //console.log(data.body);
                        return [
                            {user:result.user},
                            {"user_id":result.user.uid}
                        ];
                    }
                }
            });

            //dataSource.fetch();
            dataSource.fetch(function(){

                var data = dataSource.data();
                console.log(data);

            });
        },


        //Node
        kGetNode: function(){

            schema = {

                model: {
                    id: "nid"
                },
                data: function(result) {

                    //the data which the data source will be bound to is in the values field
                    //console.log(data.body);
                    return [result];
                }
            };


            var params = {
                page        : 0,
                parameters  : {
                    nid : 1421,
                    type : 'article'
                },
                fields      : "nid,title,type",
                pagesize    : 0
            };

            app.services.get('node',params, schema);



            //*************************************************

            /*
            var vals2='';

            var vals1 = Object.keys(params).map(function (key) {
                if(key !== 'parameters' && params[key] !== 0){
                    return key + "=" + params[key];
                }else{

                    if(key == 'parameters'){
                        vals2 = Object.keys(params.parameters).map(function (key) {
                            return "parameters[" + key + "]=" + params.parameters[key];
                        })
                    }

                }
            });
            vals1 = vals1.join('&').replace('&&','&')
            console.log(vals2 + vals1);
            */

        },
        kCreateNode: function(){
            var requestData= {
                "type":"article",
                "title":"Page submitted via iphone 06-11-05",
                "body": {
                    "value": "<p>test</p>\n",
                    "format": "filtered_html"
                }
            };
            schema = {

                model: {
                    id: "nid"
                },
                data: function(result) {
                    // the data which the data source will be bound to is in the values field
                    //console.log(data.body);
                    return [result];
                }
            }
            app.services.create('node',requestData, schema);


        },
        kUpdateNode: function (){

            var requestData= {
                title:"50 Wonderful Pallet Furnishings Ideas --- "/*,
                "body":
                {
                   und:[{
                       "value": "<p>test44 77777</p>\n",
                       "format": "filtered_html"
                   }]
                }*/
            };

            schema = {

                model: {
                    id: "nid"/*,
                    fields: {
                        nid: {editable: false, nullable: true},
                        //type: {type: "string"},
                        title: {type: "string"}
                        //body: {}
                    }*/
                },
                data: function(result) {
                    // the data which the data source will be bound to is in the values field
                    //console.log(data.body);
                    return [result];
                }
            }
            app.services.update('entity_node',1421,requestData, schema);

        },
        kDeleteNode: function (){

            schema = {

                model: {
                    id: "nid"
                },
                data: function(result) {
                    // the data which the data source will be bound to is in the values field
                    //console.log(data.body);
                    return [result];
                }
            }
            app.services.remove('node',1424, schema);

        },


    });

    app.loginService = {
        viewModel: new LoginViewModel()
    };
})(window);