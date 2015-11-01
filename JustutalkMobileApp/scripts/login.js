(function (global) {
    
    
    var LoginViewModel,
    app = global.app = global.app || {};
   

    //So, you should define the model as:
    var model_node = kendo.data.Model.define({
        id: "nid",
        fields: {
            nid: { type: 'number' },
            type: { type: 'string', validation: {required:true}  },
            title: { type: 'string', validation: {required:true} },
            body: {}
            //to_phone: { type: 'string', validation: {required:true} },
            //contact_phones: {nullable: true, validation: {required:true}}

        }
    });

    LoginViewModel = kendo.data.ObservableObject.extend({
        isLoggedIn: false,
        username: "admin",
        password: "H4der222",
        loginError: "",
        token: "",
        
        node_data: new model_node(),
        

        onLogin: function () {
            
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

        onLogout: function () {
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

        kLogin: function(){
            var userName = 'admin';
            var password = 'H4der222';
            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "http://excitenet.co.uk/users-json/user/login.json",
                        data: { username: userName, password: password},
                        dataType: "json" ,
                        type: "POST"
                    }
                },
                schema: {

                    data: function(result) {
                        return [{"result":[result]}];
                    }
                }
            });
            dataSource.fetch(function(){
                var dataItem = dataSource.at(0);
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
                        return [{"result":result}];
                    }
                }
            });
            dataSource
                .fetch()
                .then(function(){
                    var data = dataSource.data();
                    var tkn = data[0].result.token;
                    that.set('token',tkn);
                    
                    //alert(tkn);
                    //console.log(tkn);
                    

                });
        },
        kCreateNode: function(){
            var that = this;
            token = that.get("token").trim();
            var requestData= {
                "type":"article",
                "title":"Page submitted via iphone",
                "body": {
                    "value": "<p>test</p>\n",
                    "format": "filtered_html"
                }
            };

            alert(token);
            //requestData = stringify(requestData);
            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "http://excitenet.co.uk/users-json/node.json",
                        beforeSend: function(xhr){
                            //xhr.setRequestHeader('X-CSRF-Token', token);
                            // xhr.setRequestHeader('Content-Type','application/json');

                        },
                        //data: { username: userName, password: password},
                        dataType: "json",
                        //crossDomain: true,
                        type: "POST",
                        data: requestData
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
                        return [{"result":[result]}];
                    }
                }
            });

            //dataSource.bind("error", dataSource_error);

            //dataSource.fetch();
            dataSource.fetch(function(){

                var data = dataSource.data();
                alert(data[0].result[0].nid);

            });
        },
        kCreateNode1: function(){
            var that = this;
            var token = that.get("token").trim();
           
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
                type: 'json',
                transport: {
                    create: {
                        url: "http://excitenet.co.uk/users-json/node",
                        dataType: "json", //"jsonp" is required for cross-domain requests; use "json" for same-domain requests
                        type: "POST",
                        //contentType: "application/json; charset=utf-8", 
                        //data: requestData,
                        beforeSend: function(xhr){
                            console.log(xhr);
                            //xhr.setRequestHeader('X-CSRF-Token', token);
                            // xhr.setRequestHeader('Content-Type','application/json');

                        }
                    },
                    parameterMap: function(data) {
                        //return { models: kendo.stringify(data.models) };
                    }
                    
                },
                schema: {
                    //data:'data',
                    //total: "total",
                    model: model_node
                },
                error: function(e){
                    console.log(e);
                    alert('error occured');
                    //this.cancelChanges();
                }
            });
            //dataSource.bind("sync", dataSource_sync);
            dataSource.add(requestData);
            dataSource.sync();
        },
        
        
        kConnect: function(){
            
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
                        return [{user:result.user},{"user_id":result.user.uid}];
                    }
                }
            });

            //dataSource.fetch();
            dataSource.fetch(function(){

                var data = dataSource.data();
                console.log(data);
                
                //console.log(data.length);  // displays "77"
                //console.log(data[0].result[0]);
                //console.log(data[0].result[0].roles[1]);

                //var dataItem = dataSource.at(0);
                //alert(data[1].sessid + ' - ' + data[0].result[0].roles[1]); // displays "Jane Doe"
                //var dataItemWhichDoesNotExist = dataSource.at(3);
                //console.log(dataItemWhichDoesNotExist); // displays "undefined"
            });
        },
        
        
        
        updateTest: function (){
            var that = this;
            var token = that.get("token").trim();
            alert(token);
            
            var updData= {
              "name":"Henry Zee",
              "email":"henry@mail.com",
              "status":4
            };           

            hotNumber_dataUpd = new kendo.data.DataSource({
              transport: {
                read: {
                  url: "http://excitenet.co.uk/users-json/test/7",
                  beforeSend: function(xhr){
                     xhr.setRequestHeader('X-CSRF-Token', token);
                     //xhr.setRequestHeader('Content-Type','application/json');
                     xhr.setRequestHeader('Accept','application/json');

                  },
                  data: updData,
                  dataType: "json",
                  type: "PUT"
                }
              },
              schema: {
                /*model: { id: "uid" },*/
                data: function (result) {
                  return [result];
                }
              }
            });
            hotNumber_dataUpd
                .fetch()
                .then(function(){
                  var data = hotNumber_dataUpd.data();
                  console.log(data);
                });

        }

    });

    app.loginService = {
        viewModel: new LoginViewModel()
    };
})(window);