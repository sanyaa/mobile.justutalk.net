'use strict';

angular.module('myApp.drupal', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/drupal', {
        templateUrl: 'drupal/drupal.html',
        controller: 'DrupalCtrl'
      });
    }])

    .controller('DrupalCtrl', ['drupal','$scope', function(drupal,$scope) {
        //console.log('drupal controller');

       $scope.connect2 = function(){

               drupal.connect2().then(function(data) {
                    if (data.user.uid) {
                        alert('Hello ' + data.user.name + '!');
                    }
                    else {
                        alert('Please login.');
                    }
                });


                var data = drupal.connect2();


                if (data.user.uid) {
                    alert('Hello ' + data.user.name + '!');
                }
                else {
                    alert('Please login.');
                }
       };

    }]);





    /*
    ----------------------------------------------------------------------------
    // My simple app.
    angular.module('myApp', ['angular-drupal']).run(['drupal', function(drupal) {

        drupal.node_load(123).then(function(node) {
            alert(node.title);
        });

    }]);
    */

    // The angular-drupal configuration settings for my simple app.
    angular.module('angular-drupal').config(function($provide) {

        $provide.value('drupalSettings', {
            sitePath: 'http://excitenet.co.uk',
            endpoint: 'users-json'
        });

    });