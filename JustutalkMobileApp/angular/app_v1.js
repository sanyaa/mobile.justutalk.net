JustutalkMobile.app = (function (angular, global) {
	'use strict';


	var App;    
    
    function getApplication() {
            return App;
    }
    
   
    // My simple app.
    App = angular.module('myDrupalApp', ['angular-drupal','myApp.Node'])
       .run(['drupal', function(drupal) {
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
        .controller('nodeCtrl', ['drupal', '$scope','$rootScope', function(drupal,$scope,$rootScope) {
                
              $scope.create_node=function(){
                  alert('node');
              },
              $rootScope.text = 'Hey';
            
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
    
    var injector = angular.injector(['ng', App.name]);            
    var $drupal = injector.get('drupal'); 
      
     
    function login(username,password){
        
        $drupal
            .user_login(username, password)
            .then(function(data) {
               if (data.user.uid) {
                    alert('Hello ' + data.user.name + '!');
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
              } else { 
                  alert('Please login.');  
              }
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
        var path = (params) ? "mobile-article/params" : "mobile-article";             
        
        $drupal
            .views_json(path)
            .then(function(rows) {
          		angular
                    .forEach(rows, function(row, i) {
                        console.log(row.title);
                    });
        	});
    }
    
    function token(){
        $drupal
            .token()
            .then(function(token) {
            	alert(token);
        	});
    }
    
    
    function setText(txt){
        
        var injector = angular.injector(['ng', App.name]);            
    	var $rootScope = injector.get('$rootScope');   
        $rootScope.$apply(function(){
           $rootScope.text = txt;
           console.log($rootScope.text);  
        });        
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

    return {
        
        getApplication: getApplication,          
        setText:setText,
        token:token,          
        connect:connect,
        register:register,
        login:login,
        getViews:getViews,
        logout:logout,
        controller:App.controller
    }    
     
    
    
})(angular,window);

