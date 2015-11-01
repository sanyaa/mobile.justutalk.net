(function (global) {

    // RatesViewModel,
    var app = global.app = global.app || {};




    var dataSource = new kendo.data.DataSource({
        type: "odata",
        transport: {
            read: {
                url: "http://demos.kendoui.com/service/Northwind.svc/Products"
            }
        },
        sort: {
            field: "ProductName",
            dir: "desc"
        },
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true,
        pageSize: 50
    });
    var viewModel1 = kendo.data.ObservableObject.extend({
        //that : this,
        movieList: new kendo.data.DataSource({
            type: "odata",
            transport: {
                read: {
                    url: "http://demos.kendoui.com/service/Northwind.svc/Products"
                }
            },
            sort: {
                field: "ProductName",
                dir: "desc"
            },
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true,
            pageSize: 50
            
        }),
        //dataSource:{},
        getMovies:getMovies,
        getMovies2:function(){

            /*
            dataSource.filter( { field: "ProductName", operator: "startswith", value: "S" });
            var view = dataSource.view();
            console.log(view.length);
            console.log(view[0].ProductName); // displays "Jane Doe"
            */

            //dataSource.fetch();
            /*var that = this;
            dataSource.fetch(function(e) {
                var product = dataSource.at(0);
                dataSource.remove(product);
                dataSource.sync();
                //that.movieList = dataSource;

                var data = {};
                data.push(product);

                var data = dataSource.data();
                console.log(data.length);  // displays "2"
                that.set("movieList", dataSource);


            });*/


            //this.set("movieList", dataSource.fetch());

        },

        showHomeView:showHomeView


    });

    var viewModel = kendo.observable({

        movieList: new kendo.data.DataSource({
            type: "odata",
            transport: {
                read: {
                    url: "http://demos.kendoui.com/service/Northwind.svc/Products"
                }
            },
            sort: {
                field: "ProductName",
                dir: "desc"
            },
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true,
            pageSize: 50
        }),


        fromCountry:'',
        toCountry:'',

        getMovies:getMovies,
        showHomeView:showHomeView,

        data : [
            { text: "Black", value: "1" },
            { text: "Orange", value: "2" },
            { text: "Grey", value: "3" }
        ]

    });

    function showHomeView(e) {
        //viewModel.dataSource.group([]);
        //$("#featured").data("kendoMobileListView").options.type = "flat";

        //fromCountry = viewModel.set(),
        //toCountry:'',

        var that = this,
        fromCountry = that.get("fromCountry").trim(),
        toCountry = that.get("toCountry").trim();

        console.log(viewModel.movieList);
        viewModel.movieList.filter({ field: "ProductName", operator: "startswith", value: fromCountry});
        //viewModel.movieList.sync();
    }

    function getMovies(){
        var dataSource = new kendo.data.DataSource({
            type: "odata",
            transport: {
                read: {
                    url: "http://demos.kendoui.com/service/Northwind.svc/Products"
                }
            },
            sort: {
                field: "ProductName",
                dir: "desc"
            },
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true,
            pageSize: 50
        });

        $("#filterable-listview").kendoMobileListView({
            dataSource: dataSource,
            template: $("#mobile-listview-filtering-template").text(),
            filterable: {
                field: "ProductName",
                operator: "startswith"
            },
            endlessScroll: true
        });
    }



    //fetches the list of movies from the service
    //depending on the listType filter
    function getMovieList(listType) {
        var movieListoptions = {
            url: MovieTickets.configuration.getMovieListUrl,
            data: { listType: listType },
            requestType: "GET",
            dataType: "JSON",
            callBack: callBack
        };
        //service call
        MovieTickets.dataAccess.callService(movieListoptions);
    }
    //callback method from service call
    function callBack(result) {
        if (result.success === true) {
            viewModel.set("movieList", result.data);                       
        }
    }

    //this event is fired when movie list
    //type is changed from the UI
    function listTypeSelected(e) {

        getMovieList(e.sender.selectedIndex);
    }
    //Loading the movie list with listType= 0
    //which is Now Running list
    function init(){
        getMovieList(0);
    }

    app.ratesModel = {
        viewModel: viewModel,
        showHomeView:showHomeView
    };

    /*return {
        initialize: init,
        getMovieList: getMovieList,
        viewModel: viewModel,
        listTypeSelected: listTypeSelected
    }*/
 
})(window);