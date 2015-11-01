(function (angular, global) {
    'use strict';
    var app = global.app = global.app || {};

    var App;

    var _token = '';


    // My simple app.
    App = angular.module('myDrupalApp', ['angular-drupal','myApp.Node',"kendo.directives"])
        .run(['drupal','$rootScope', function(drupal,$rootScope) {

            $rootScope.text = 'Hey';
            /*
             drupal.node_load(64).then(function(node) {
             alert(node.title);
             });


             drupal.user_login('admin', 'H4der222')
             .then(function(data) {
             if (data.user.uid) {
             alert('Hello ' + data.user.name + '!');
             }else{
             alert('sorry!');
             }
             });
             */

        }])
        .config(function($controllerProvider, $compileProvider, $filterProvider, $provide){

            // Save old component registration methods (optional).myDrupalApp
            /*angular.module('myDrupalApp')._controller = angular.module('myDrupalApp').controller;
             angular.module('myDrupalApp')._service = angular.module('myDrupalApp').service;
             angular.module('myDrupalApp')._factory = angular.module('myDrupalApp').factory;
             angular.module('myDrupalApp')._directive = angular.module('myDrupalApp').directive;

             // Provider-based component registration.
             angular.module('myDrupalApp').controller = $controllerProvider.register;
             angular.module('myDrupalApp').service = $provide.service;
             angular.module('myDrupalApp').factory = $provide.factory;
             angular.module('myDrupalApp').directive = $compileProvider.directive;
             angular.module('myDrupalApp').filter = $filterProvider.register;


             App.loadController = $controllerProvider.register;*/


        })
        .controller('nodeCtrl', ['drupal', '$scope','$rootScope', function(drupal,$scope,$rootScope) {

            $scope.create_node=function(){
                alert('node');
            },
                $rootScope.text 	= 'Hey 0';
            $rootScope.text1 	= 'Hey 1';
            $scope.text2 		= 'Hey 2';

            /*
             drupal.node_load(64).then(function(node) {
             alert(node.title);
             });
             */
        }]);



    App.factory('hello',function(drupal){
        return {
            title:'hello injector',
            getNode: function(){
                drupal.node_load(64).then(function(node) {
                    alert(node.title);
                });
            }
        };

    });



    // The angular-drupal configuration settings for my simple app.
    angular.module('angular-drupal')
        .config(function($provide) {

            $provide.value('drupalSettings', {
                sitePath: 'http://excitenet.co.uk',
                endpoint: 'users-json'
            });

        });


    angular.module('myApp.Node', [])
        .controller('nodeCtr', ['drupal', '$scope',function(drupal,$scope) {

            $scope.create_node=function(){
                alert('node');
            };
            drupal.node_load(64).then(function(node) {
                alert(node.title);
            });
        }]);



    //Function
    //----------------------------------------------------

    function getApp() {
        return App;
    }


    var injector = angular.injector(['ng', App.name]);
    var $drupal = injector.get('drupal');
    //var $scope = injector.get('$scope');

    function login(username,password){

        $drupal
            .user_login(username, password)
            .then(function(data) {
                if (data.user.uid) {
                    alert('Hello ' + data.user.name + '!');
                    /*$drupal.token().then(function(token) {
                        alert('token ' + token);
                        _token=data.token;
                    });*/

                }else{
                    alert('sorry!');
                }
            });
    }

    function logout(){

        $drupal
            .user_logout()
            .then(function(data) {
                if (!data.user.uid) {
                    alert('Logged out!');
                }else{
                    alert(data.user.uid);
                }
            });
    }

    function connect(){

        $drupal
            .connect()
            .then(function(data) {
                if (data.user.uid) {
                    alert('Hello ' + data.user.name + '!');
                    console.log();
                } else {
                    alert('Please login.');
                }
            });
    }

    function token(){
        $drupal
            .token()
            .then(function(token) {
                alert(token);
                app.drupal._token=token;
            });
    }

    function register(account){

        /*
         //account json format
         var account = {
         name: 'bob',
         mail: 'bob@example.com',
         pass: 'secret'
         };
         */
        $drupal
            .user_register(account)
            .then(function(data) {
                alert('Registered user # ' + data.uid);
            });
    }



    //Views
    //----------------------------------

    /*
     If you install the Views JSON module, which is available as a sub module of the
     Views Datasource module (https://www.drupal.org/project/views_datasource), you
     can easily set up a View page display to return JSON to your app:
     */

    function getViews(params){

        //var path = 'articles'; // The Drupal path to the Views JSON page display.
        var path = (params) ? "mobile-article/" + params  : "mobile-article";

        $drupal
            .views_json(path)
            .then(function(rows) {
                angular
                    .forEach(rows, function(row, i) {
                        console.log(row.title);
                    });
            });
    }

    function getHello(params){

        //var path = 'articles'; // The Drupal path to the Views JSON page display.
        var path = (params) ? "hello_world/" + params : "hello_world";

        $drupal
            .views_json(path)
            .then(function(rows) {
                angular
                    .forEach(rows, function(row, i) {
                        console.log(row.title);
                    });
            });
    }


    //access controller function through rootscope
    function setText(txt){

        //var injector = angular.injector(['ng', App.name]);
        var $rootScope = injector.get('$rootScope');
        $rootScope.$apply(function(){
            $rootScope.text = txt;
            console.log($rootScope.text);
        });
    }

    function _getToken(){
        return _token;
    }

    //getViews(64);
    //------------------

    /*

     greeter.invoke(function(hello){
     alert(hello.title);
     });

     angular.injector(["App"]).invoke(function(hello){
     alert(hello.title);
     })

     var someFunction = function($http,) {
     alert('hi u all injs');
     };

     injector.invoke(someFunction);

     //var injector = angular.injector(['ng', 'myModule']);

     */

    //------------------


    //console.log(App.controller.nodeCtrl);

    app.drupal = {
        getApp: getApp,
        setText:setText,
        token:token,
        connect:connect,
        register:register,
        login:login,
        getViews:getViews,
        getHello:getHello,
        logout:logout,
        $drupal:$drupal
    };



    /*return {

     getApplication: getApplication,
     setText:setText,
     token:token,
     connect:connect,
     register:register,
     login:login,
     getViews:getViews,
     logout:logout,
     controller:App.controller
     }    */



})(angular,window);

