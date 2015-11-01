(function (global) {
    var LoginViewModel,
        app = global.app = global.app || {};




    LoginViewModel = kendo.data.ObservableObject.extend({
        isLoggedIn: false,
        username: "admin",
        password: "H4der222",
        loginError: "",
        token:"",

        onLogin: function () {
            var that = this,
            username = that.get("username").trim(),
            password = that.get("password").trim();
            
            //alert('hello');
            
            
            App = app.drupal.getApp();
            injector = angular.injector(['ng', App.name]);
            $drupal = injector.get('drupal');
            
            /*
           */
            
           
            

            if (username === "" || password === "") {

                navigator.notification.alert("Both fields are required!",
                    function () { }, "Login failed", 'OK');

                return;
            } 
            
            
            $drupal
            .user_login(username, password)
            .then(function(data) {
                
                console.log(data);
                if (data.user.uid) {
                    alert('Hello ' + data.user.name + '!'); 
                    that.set("isLoggedIn", true);
                    that.set('token',data.token);
                    that.set("loginError", "");
                }else{
                    alert('sorry!');
                }
            });
            
            return;

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
                    /*errors: function(response) {
                       //return response.error; 
                       return response; 
                    },*/
                    //model: { id: "uid" },
                    data: function(result) {
                        console.log(result.user.uid);
                        return [result];
                    }
                }/*,
                error: function(e) {
                    //console.log(e.errors);
                    //console.log(e);
                    var errMsg = e.errorThrown;
                    alert(errMsg);
                    if(errMsg == "Unauthorized"){
                       //alert(errMsg); // displays "Invalid query" 
                       that.set("loginError", "Invalid username or password" ); 
                    
                    }else if(errMsg == "Custom"){
                       //alert(errMsg); // displays "Invalid query" 
                       that.set("loginError", "Invalid username or password" ); 
                    }                   
                    
                }*/
            });
            dataSource.fetch(function(){
                
                var data = dataSource.data();
                console.log(data);
                
                //var user_id = data[1].user_id;
                /*var token = data[0].token;                
                if(user_id > 0){
                    //alert(token);
                    that.set("isLoggedIn", true);
                    that.set('token',token);
                    that.set("loginError", "");
                }*/
                
                //console.log(data[1].user_id);
            });

        },

        onLogout: function () {
            var that = this;
            
             $drupal
                .user_logout()
                .then(function(data) {
                    if (!data.user.uid) {
                        alert('Logged out!');
                        that.clearForm();
                        that.set("isLoggedIn", false);
                    }else{
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
                        console.log(result);
                        return [{"result":result}];
                    }
                }
            });
            dataSource
                .fetch()
                .then(function(){
                    var data = dataSource.data();
                    var tkn = data[0].result.token;
                    alert(tkn);
                    console.log(tkn);

                    that.set('token',tkn);

                });
        },
        kCreateNode: function(){
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
                            xhr.setRequestHeader('X-CSRF-Token', token);
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
        }


    });

    app.loginService = {
        viewModel: new LoginViewModel()
    };
})(window);