when in appbuilder
--------------
1.  script/app.js -
    navigator.splashscreen.hide();

2. in index.html -
    <script src="cordova.js"></script>
    <!--<script src="cordova.ios.js"></script>-->

3.   in index.html -
    <link href="styles/logoimages.css" rel="stylesheet" />
    <!--<link href="styles/logoimages.ios.css" rel="stylesheet" />-->


when in webstorm
--------------
1.  in script/app.js -
    //navigator.splashscreen.hide();

2. in index.html -
    <!--<script src="cordova.js"></script>-->
    <script src="cordova.ios.js"></script>

3.   in index.html -
    <!--<link href="styles/logoimages.css" rel="stylesheet" />-->
    <link href="styles/logoimages.ios.css" rel="stylesheet" />



MVVM SAMPLE
-------------------------------------

HTML
<div id="mainView" >
    <input type="text" id="item" data-bind="value: item" />
    <input type="text" id="quantity" data-bind="value: quantity" />
    <br/>
    <label data-bind="text: description"> </label>
</div>

JavaScript
<script>
    var observableViewModel = kendo.observable({
        item: "gold",
        quantity: "10 grams",
        description: function(){
            return "You bought " + this.get("quantity") + " of "
            + this.get("item") ;
        }
    });

    //bind the view model
    kendo.bind($("#mainView"),observableViewModel);
</script>







MVVM SAMPLE IN MOBILE
-------------------------------------

HTML
<div data-role="view" style="margin: 10 0 0 4" data-model="viewModel">
    Movie:
    <input type="text" data-bind="value: movie" />
    <a data-bind="click: addMovie" data-role="button"
        id="btnAdd">Add
    </a>
    <div style="margin-top: 10px">
        Watched movies list:
        <ul data-template="movie-list-template"
                data-bind="source: movieList">
        </ul>
    </div>
</div>


<!--Kendo template -->
<script id="movie-list-template" type="text/x-kendo-template">
    <li>
        Movie: <span data-bind="style:{color:movieColor,fontSize:movieFontSize }, text: movieName"></span> |
        Added: <span data-bind="text: addedDate, style:{color:addedDateColor}"></span>
        <a data-bind="click: removeMovie" data-role="button" id="btnRemove" >X</a>
    </li>
</script>


JavaScript
<script>
    var app = new kendo.mobile.Application(document.body);
    var viewModel = {
        movie: '',
        movieList: [],
        addMovie: function (e) {
            //when addMovie function is called, add the movie
            // property which is bound to the movie text box to
            //movieList array along with styles and added date
            if (this.movie != '') {
                this.get("movieList").push(
                {
                    movieName: this.get("movie"),
                    movieColor: "green",
                    movieFontSize: "16px",
                    addedDate:
                    new Date().toLocaleDateString(),
                    addedDateColor: "navy"
                });
            }
            //clear the value in the text box.
            this.set("movie", '');
        },
        removeMovie: function (e) {
            alert('Remove: ' + e.data.movieName);
            //Remove the movie name from the movieList array.
            this.set("movieList",
                jQuery.grep(this.movieList,
                    function (item, i) {
                        return (item.movieName != e.data.movieName);
                    }
                )
            );
        }
    }
</script>




Gradient background over image. good technique
-------------------------------------

.intro .gradient {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    min-height: 100%;
    opacity: .9;
    background: rgb(58,28,255);
    background: -moz-linear-gradient(top, rgb(58,28,255) 0%, rgb(255,58,48) 100%);
    background: -webkit-gradient(left top, left bottom, color-stop(0%, rgb(58,28,255)), color-stop(100%, rgb(255,58,48)));
    background: -webkit-linear-gradient(top, rgb(58,28,255) 0%, rgb(255,58,48) 100%);
    background: -o-linear-gradient(top, rgb(58,28,255) 0%, rgb(255,58,48) 100%);
    background: -ms-linear-gradient(top, rgb(58,28,255) 0%, rgb(255,58,48) 100%);
    background: linear-gradient(to bottom, rgb(58,28,255) 0%, rgb(255,58,48) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3a1cff', endColorstr='#ff3a30', GradientType=0 );
}


<section class="intro" style="background-image: url(img/intro/intro-bg.jpg);">
      <div class="gradient"></div>
      <div class="container">
        <div class="column-wrap" style="height: 437px;">

          <!-- Left Column -->

          -------




Gradient background with image. good technique
-------------------------------------
home-1.htmlmedia="all"
.customBgColor {
    background-color: #8bc34a !important;
}
.full-width-slider-controls {
    position: relative;
}
.skew-top {
    padding-top: 170px;
}
.skew {
    position: relative;
    min-height: 170px;
}
.trianglifyBox {
    background-image: url('../media/paralax/3.png');
}



HTML
-----------

<section id="reviews" class="pageRow full-width-slider-controls paralax skew skew-top customBgColor trianglifyBox">
			<div class="wrapper">

			---------




drupal services
-----------
get title and node fields and 5 items per page

http://excitenet.co.uk/users-json/node?fields=title,nid&pagesize=5



Login with kendo datasource
---------


    var userName = 'admin';
    var password = 'H4der222';
    var dataSource = new kendo.data.DataSource({
       transport: {
           read: {
               url: "http://excitenet.co.uk/users-json/user/login.json",
               beforeSend: function(req){
                  //req.setRequestHeader("Authorization",'Basic dXNlcjp1c2Vy');
               },
               data: { username: userName, password: password},
               dataType: "json" ,
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
                //console.log(data.body);
                return [{"result":[result]}];
            }
       }
    });
    dataSource.fetch(function(){
        var dataItem = dataSource.at(0);
        console.log(dataItem); // displays "Jane Doe"
        //var dataItemWhichDoesNotExist = dataSource.at(3);
        //console.log(dataItemWhichDoesNotExist); // displays "undefined"
    });



Note:
-------------------
    You can add headers to the request the same way as with the jQuery ajax method. By using the headers option:
    read: {
      url: "url",
      headers: { key: value}
    }
    or with the beforeSend callback:
    read: {
      url: "url",
      beforeSend: function (request){
        request.setRequestHeader(key, value);
      }
    }



Kendo ui getting Information THrough e parameter in function
---

eg:

    function(e){
        e.sender.dataItem(e.item).product_id;
        e.sender.dataItem(e.item)[e.sender.options.dataValueField];

        > if the dataValueField is set to product_id in this example, the two lines
        > will produce same result.
    }