'use strict';

describe('myApp.drupal module', function() {

    beforeEach(module('myApp.drupal'));

    describe('drupal controller', function(){

        it('should ....', inject(function($controller) {
            //spec body
            var drupalCtrl = $controller('DrupalCtrl');
            expect(drupalCtrl).toBeDefined();
        }));

    });
});
