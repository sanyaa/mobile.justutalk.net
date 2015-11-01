
MovieTickets.movieList = (function () {

    // RatesViewModel,
    var   app = global.app = global.app || {};


    var viewModel = kendo.observable({
        movieList: {},
        getMovies:getMovies

    });


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
        viewModel: new viewModel()
    };

    /*return {
        initialize: init,
        getMovieList: getMovieList,
        viewModel: viewModel,
        listTypeSelected: listTypeSelected
    }*/
 
})();