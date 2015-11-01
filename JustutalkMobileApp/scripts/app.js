(function (global) {
    
    var app = global.app = global.app || {};
	    
    app.makeUrlAbsolute = function (url) {
            var anchorEl = document.createElement("a");
            anchorEl.href = url;
            return anchorEl.href;
        };
    
    
    
    // create an object to store the models for each view
    window.APP = {
      models: {
        home: {
          title: 'Home'
        },
        settings: {
          title: 'Settings'
        },
        contacts: {
          title: 'Contacts',
          ds: new kendo.data.DataSource({
            data: [ { id: 1, name: 'Bob' },
                    { id: 2, name: 'Mary' },
                    { id: 3, name: 'John' }]
          }),
          alert: function(e) {
            alert(e.data.name);
          }
        }
      }
    };
    

    document.addEventListener("deviceready", function () {
        navigator.splashscreen.hide();

        app.changeSkin = function (e) {
            var mobileSkin = "";

            if (e.sender.element.text() === "Flat") {
                e.sender.element.text("Native");
                mobileSkin = "flat";
            } else {
                e.sender.element.text("Flat");
                mobileSkin = "";
            }

            app.application.skin(mobileSkin);
        };

        app.application = new kendo.mobile.Application(document.body, { 
            layout: "main-layout",
            initial: 'views/menu.html',
            transition: 'slide',
            loading: "<h1>Loading...</h1>"
        });
        
        
        
    }, false);
})(window);