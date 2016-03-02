(function (global) {
    var app = global.app = global.app || {};

    // Stores past URLs that failed to load. Used for a quick lookup
    // and because `onerror` is not triggered in some browsers
    // if the response is cached.
    var errors = {};

    app.utils = {
        init: function (kendoApp) {
            app.application = kendoApp;
        },

        parseQueryStringToObject: function () {
            var argsParsed = {},
                arg,
                kvp,
                hash = document.location.hash;

            if (!hash || hash.length == 0) {
                return argsParsed;
            }
            var args = document.location.hash.split('?');
            if (args.length < 2) {
                return argsParsed;
            }
            args = args[1].split('&');

            for (i = 0; i < args.length; i++) {
                arg = decodeURIComponent(args[i]);

                if (arg.indexOf('=') == -1) {
                    argsParsed[arg.trim()] = true;
                }
                else {
                    kvp = arg.split('=');
                    var val = kvp[1].trim();
                    argsParsed[kvp[0].trim()] = isNaN(val) ? val : parseFloat(val);
                }
            }
            return argsParsed;
        },
        isURLReal: function (fullyQualifiedURL) {
            var URL = encodeURIComponent(fullyQualifiedURL),
                dfd = $.Deferred(),
                checkURLPromise = $.getJSON('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22' + URL + '%22&format=json');

            checkURLPromise
                .done(function(response) {
                    // results should be null if the page 404s or the domain doesn't work
                    if (response.query.results) {
                        dfd.resolve(true);
                    } else {
                        dfd.reject(false);
                    }
                })
                .fail(function() {
                    dfd.reject('failed');
                });


            return dfd.promise();
        },

        //============================================




        // Check the existence of an image file at `url` by creating a
        // temporary Image element. The `success` callback is called
        // if the image loads correctly or the image is already complete.
        // The `failure` callback is called if the image fails to load
        // or has failed to load in the past.
        checkImage : function (url, success, failure) {
            var img = new Image(),    // the
                loaded = false,
                errored = false;

            // Run only once, when `loaded` is false. If `success` is a
            // function, it is called with `img` as the context.
            img.onload = function () {
                if (loaded) {
                    return;
                }

                loaded = true;

                if (success && success.call) {
                    success.call(img);
                }
            };

            // Run only once, when `errored` is false. If `failure` is a
            // function, it is called with `img` as the context.
            img.onerror = function () {
                if (errored) {
                    return;
                }

                errors[url] = errored = true;

                if (failure && failure.call) {
                    failure.call(img);
                }
            };

            // If `url` is in the `errors` object, trigger the `onerror`
            // callback.
            if (errors[url]) {
                img.onerror.call(img);
                return;
            }

            // Set the img src to trigger loading
            img.src = url;

            // If the image is already complete (i.e. cached), trigger the
            // `onload` callback.
            if (img.complete) {
                img.onload.call(img);
            }
        },



        //=============================================

        setViewTitle: function (view, title) {
            view.data("kendoMobileView").title = title;
            var navbar = view.find(".km-navbar").data("kendoMobileNavBar");
            if (navbar) {
                navbar.title(title);
            }
        },

        navigate: function (location) {
            app.application.navigate(location);
        },

        redirect: function (location) {
            app.application.pane.history.pop();
            app.application.navigate(location);
        },

        scrollViewToTop: function (viewElement) {
            viewElement.data("kendoMobileView").scroller.reset();
        },

        showLoading: function (message) {
            $(".loading-message").text(message ? message : "Loading...");
            app.application.showLoading();
        },

        hideLoading: function () {
            app.application.hideLoading();
        },

        updateCartBadges: function ($, cart) {
            var numberInCart = cart.items.aggregates() && cart.items.aggregates().qty ? cart.items.aggregates().qty.sum : 0;
            var cartBadges = $(".cart-badge");
            cartBadges.text(numberInCart);
            if (numberInCart > 0) {
                cartBadges.show();
            } else {
                cartBadges.hide();
            }
        },

        showError: function (message, error) {
            var errorMessage = message + (error === undefined ? "" : "\n" + error.status + ": " + error.statusText);
            $("#error-view .message").text(errorMessage);
            $("#error-view").show().data().kendoMobileModalView.open();
        },

        closeError: function () {
            $("#error-view").data().kendoMobileModalView.close();
        },

        closeAllPopovers: function () {
            $(".km-popup").each(function (idx, item) {
                var popover = $(item).data().kendoMobilePopOver;
                if (popover) {
                    popover.close();
                }
            });
        }

    }

})(window);