(function (global) {

    // RatesViewModel,
    var app = global.app = global.app || {};

    var data_Rates = [
        {"flag": "AF.png", "name": "AF"                                , "display": "Afghanistan"},
        {"flag": "AX.png", "name": "AX"                                 , "display": "Aland Islands"},
        {"flag": "AL.png", "name": "AL"                                    , "display": "Albania"},
        {"flag": "DZ.png", "name": "DZ"                                    , "display": "Algeria"},
        {"flag": "AS.png", "name": "AS"                                , "display": "American Samoa"},
        {"flag": "AD.png", "name": "AD"                                    , "display": "Andorra"},
        {"flag": "AO.png", "name": "AO"                                     , "display": "Angola"},
        {"flag": "AI.png", "name": "AI"                                   , "display": "Anguilla"},
        {"flag": "AQ.png", "name": "AQ"                                 , "display": "Antarctica"},
        {"flag": "AG.png", "name": "AG"                                 , "display": "Antigua and Barbuda"},
        {"flag": "AR.png", "name": "AR"                                  , "display": "Argentina"},
        {"flag": "AM.png", "name": "AM"                                    , "display": "Armenia"},
        {"flag": "AW.png", "name": "AW"                                      , "display": "Aruba"},
        {"flag": "AU.png", "name": "AU"                                  , "display": "Australia"},
        {"flag": "AT.png", "name": "AT"                                    , "display": "Austria"},
        {"flag": "AZ.png", "name": "AZ"                                 , "display": "Azerbaijan"},
        {"flag": "BS.png", "name": "BS"                                    , "display": "Bahamas"},
        {"flag": "BH.png", "name": "BH"                                    , "display": "Bahrain"},
        {"flag": "BD.png", "name": "BD"                                 , "display": "Bangladesh"},
        {"flag": "BB.png", "name": "BB"                                   , "display": "Barbados"},
        {"flag": "BY.png", "name": "BY"                                    , "display": "Belarus"},
        {"flag": "BE.png", "name": "BE"                                    , "display": "Belgium"},
        {"flag": "BZ.png", "name": "BZ"                                     , "display": "Belize"},
        {"flag": "BJ.png", "name": "BJ"                                      , "display": "Benin"},
        {"flag": "BM.png", "name": "BM"                                    , "display": "Bermuda"},
        {"flag": "BT.png", "name": "BT"                                     , "display": "Bhutan"},
        {"flag": "BO.png", "name": "BO"                                    , "display": "Bolivia"},
        {"flag": "BQ.png", "name": "BQ"                                 , "display": "Bonaire, Sint Eustatius and Saba"},
        {"flag": "BA.png", "name": "BA"                     , "display": "Bosnia and Herzegovina"},
        {"flag": "BW.png", "name": "BW"                                   , "display": "Botswana"},
        {"flag": "BV.png", "name": "BV"                              , "display": "Bouvet Island"},
        {"flag": "BR.png", "name": "BR"                                     , "display": "Brazil"},
        {"flag": "IO.png", "name": "IO"             , "display": "British Indian Ocean Territory"},
        {"flag": "VG.png", "name": "VG"                     , "display": "British Virgin Islands"},
        {"flag": "BN.png", "name": "BN"                                     , "display": "Brunei"},
        {"flag": "BG.png", "name": "BG"                                   , "display": "Bulgaria"},
        {"flag": "BF.png", "name": "BF"                               , "display": "Burkina Faso"},
        {"flag": "BI.png", "name": "BI"                                    , "display": "Burundi"},
        {"flag": "KH.png", "name": "KH"                                   , "display": "Cambodia"},
        {"flag": "CM.png", "name": "CM"                                   , "display": "Cameroon"},
        {"flag": "CA.png", "name": "CA"                                     , "display": "Canada"},
        {"flag": "CV.png", "name": "CV"                                 , "display": "Cape Verde"},
        {"flag": "KY.png", "name": "KY"                             , "display": "Cayman Islands"},
        {"flag": "CF.png", "name": "CF"                   , "display": "Central African Republic"},
        {"flag": "TD.png", "name": "TD"                                       , "display": "Chad"},
        {"flag": "CL.png", "name": "CL"                                      , "display": "Chile"},
        {"flag": "CN.png", "name": "CN"                                      , "display": "China"},
        {"flag": "CX.png", "name": "CX"                           , "display": "Christmas Island"},
        {"flag": "CC.png", "name": "CC"                    , "display": "Cocos (Keeling) Islands"},
        {"flag": "CO.png", "name": "CO"                                   , "display": "Colombia"},
        {"flag": "KM.png", "name": "KM"                                    , "display": "Comoros"},
        {"flag": "CG.png", "name": "CG"                        , "display": "Congo (Brazzaville)"},
        {"flag": "CD.png", "name": "CD"                           , "display": "Congo (Kinshasa)"},
        {"flag": "CK.png", "name": "CK"                               , "display": "Cook Islands"},
        {"flag": "CR.png", "name": "CR"                                 , "display": "Costa Rica"},
        {"flag": "HR.png", "name": "HR"                                    , "display": "Croatia"},
        {"flag": "CU.png", "name": "CU"                                       , "display": "Cuba"},
        {"flag": "CW.png", "name": "CW"                                    , "display": "Curaçao"},
        {"flag": "CY.png", "name": "CY"                                     , "display": "Cyprus"},
        {"flag": "CZ.png", "name": "CZ"                             , "display": "Czech Republic"},
        {"flag": "DK.png", "name": "DK"                                    , "display": "Denmark"},
        {"flag": "DJ.png", "name": "DJ"                                   , "display": "Djibouti"},
        {"flag": "DM.png", "name": "DM"                                   , "display": "Dominica"},
        {"flag": "DO.png", "name": "DOc"                         , "display": "Dominican Republic"},
        {"flag": "EC.png", "name": "EC"                                    , "display": "Ecuador"},
        {"flag": "EG.png", "name": "EG"                                      , "display": "Egypt"},
        {"flag": "SV.png", "name": "SV"                                , "display": "El Salvador"},
        {"flag": "GQ.png", "name": "GQ"                          , "display": "Equatorial Guinea"},
        {"flag": "ER.png", "name": "ER"                                    , "display": "Eritrea"},
        {"flag": "EE.png", "name": "EE"                                    , "display": "Estonia"},
        {"flag": "ET.png", "name": "ET"                                   , "display": "Ethiopia"},
        {"flag": "EU.png", "name": "EU"                                  , "display": "Euro Zone"},
        {"flag": "FK.png", "name": "FK"                           , "display": "Falkland Islands"},
        {"flag": "FO.png", "name": "FO"                              , "display": "Faroe Islands"},
        {"flag": "FJ.png", "name": "FJ"                                       , "display": "Fiji"},
        {"flag": "FI.png", "name": "FI"                                    , "display": "Finland"},
        {"flag": "FR.png", "name": "FR"                                     , "display": "France"},
        {"flag": "GF.png", "name": "GF"                              , "display": "French Guiana"},
        {"flag": "PF.png", "name": "PF"                           , "display": "French Polynesia"},
        {"flag": "TF.png", "name": "TF"                , "display": "French Southern Territories"},
        {"flag": "GA.png", "name": "GA"                                      , "display": "Gabon"},
        {"flag": "GM.png", "name": "GM"                                     , "display": "Gambia"},
        {"flag": "GE.png", "name": "GE"                                    , "display": "Georgia"},
        {"flag": "DE.png", "name": "DE"                                    , "display": "Germany"},
        {"flag": "GH.png", "name": "GH"                                      , "display": "Ghana"},
        {"flag": "GI.png", "name": "GI"                                  , "display": "Gibraltar"},
        {"flag": "GR.png", "name": "GR"                                     , "display": "Greece"},
        {"flag": "GL.png", "name": "GL"                                  , "display": "Greenland"},
        {"flag": "GD.png", "name": "GD"                                    , "display": "Grenada"},
        {"flag": "GP.png", "name": "GP"                                 , "display": "Guadeloupe"},
        {"flag": "GU.png", "name": "GU"                                       , "display": "Guam"},
        {"flag": "GT.png", "name": "GT"                                  , "display": "Guatemala"},
        {"flag": "GG.png", "name": "GG"                                   , "display": "Guernsey"},
        {"flag": "GN.png", "name": "GN"                                     , "display": "Guinea"},
        {"flag": "GW.png", "name": "GW"                              , "display": "Guinea-Bissau"},
        {"flag": "GY.png", "name": "GY"                                     , "display": "Guyana"},
        {"flag": "HT.png", "name": "HT"                                      , "display": "Haiti"},
        {"flag": "HM.png", "name": "HM"          , "display": "Heard Island and McDonald Islands"},
        {"flag": "HN.png", "name": "HN"                                   , "display": "Honduras"},
        {"flag": "HK.png", "name": "HK"                    , "display": "Hong Kong S.A.R., China"},
        {"flag": "HU.png", "name": "HU"                                    , "display": "Hungary"},
        {"flag": "IS.png", "name": "IS"                                    , "display": "Iceland"},
        {"flag": "IN.png", "name": "IN"                                      , "display": "India"},
        {"flag": "ID.png", "name": "ID"                                  , "display": "Indonesia"},
        {"flag": "IR.png", "name": "IR"                                       , "display": "Iran"},
        {"flag": "IQ.png", "name": "IQ"                                       , "display": "Iraq"},
        {"flag": "IE.png", "name": "IE"                                    , "display": "Ireland"},
        {"flag": "IM.png", "name": "IM"                                , "display": "Isle of Man"},
        {"flag": "IL.png", "name": "IL"                                     , "display": "Israel"},
        {"flag": "IT.png", "name": "IT"                                      , "display": "Italy"},
        {"flag": "CI.png", "name": "CI"                                , "display": "Ivory Coast"},
        {"flag": "JM.png", "name": "JM"                                    , "display": "Jamaica"},
        {"flag": "JP.png", "name": "JP"                                      , "display": "Japan"},
        {"flag": "JE.png", "name": "JE"                                     , "display": "Jersey"},
        {"flag": "JO.png", "name": "JO"                                     , "display": "Jordan"},
        {"flag": "KZ.png", "name": "KZ"                                 , "display": "Kazakhstan"},
        {"flag": "KE.png", "name": "KE"                                      , "display": "Kenya"},
        {"flag": "KI.png", "name": "KI"                                   , "display": "Kiribati"},
        {"flag": "KW.png", "name": "KW"                                     , "display": "Kuwait"},
        {"flag": "KG.png", "name": "KG"                                 , "display": "Kyrgyzstan"},
        {"flag": "LA.png", "name": "LA"                                       , "display": "Laos"},
        {"flag": "LV.png", "name": "LV"                                     , "display": "Latvia"},
        {"flag": "LB.png", "name": "LB"                                    , "display": "Lebanon"},
        {"flag": "LS.png", "name": "LS"                                    , "display": "Lesotho"},
        {"flag": "LR.png", "name": "LR"                                    , "display": "Liberia"},
        {"flag": "LY.png", "name": "LY"                                      , "display": "Libya"},
        {"flag": "LI.png", "name": "LI"                              , "display": "Liechtenstein"},
        {"flag": "LT.png", "name": "LT"                                  , "display": "Lithuania"},
        {"flag": "LU.png", "name": "LU"                                 , "display": "Luxembourg"},
        {"flag": "MO.png", "name": "MO"                        , "display": "Macao S.A.R., China"},
        {"flag": "MK.png", "name": "MK"                                  , "display": "Macedonia"},
        {"flag": "MG.png", "name": "MG"                                 , "display": "Madagascar"},
        {"flag": "MW.png", "name": "MW"                                     , "display": "Malawi"},
        {"flag": "MY.png", "name": "MY"                                   , "display": "Malaysia"},
        {"flag": "MV.png", "name": "MV"                                   , "display": "Maldives"},
        {"flag": "ML.png", "name": "ML"                                       , "display": "Mali"},
        {"flag": "MT.png", "name": "MT"                                      , "display": "Malta"},
        {"flag": "MH.png", "name": "MH"                           , "display": "Marshall Islands"},
        {"flag": "MQ.png", "name": "MQ"                                 , "display": "Martinique"},
        {"flag": "MR.png", "name": "MR"                                 , "display": "Mauritania"},
        {"flag": "MU.png", "name": "MU"                                  , "display": "Mauritius"},
        {"flag": "YT.png", "name": "YT"                                    , "display": "Mayotte"},
        {"flag": "MX.png", "name": "MX"                                     , "display": "Mexico"},
        {"flag": "FM.png", "name": "FM"                                 , "display": "Micronesia"},
        {"flag": "MD.png", "name": "MD"                                    , "display": "Moldova"},
        {"flag": "MC.png", "name": "MC"                                     , "display": "Monaco"},
        {"flag": "MN.png", "name": "MN"                                   , "display": "Mongolia"},
        {"flag": "ME.png", "name": "ME"                                 , "display": "Montenegro"},
        {"flag": "MS.png", "name": "MS"                                 , "display": "Montserrat"},
        {"flag": "MA.png", "name": "MA"                                    , "display": "Morocco"},
        {"flag": "MZ.png", "name": "MZ"                                 , "display": "Mozambique"},
        {"flag": "MM.png", "name": "MM"                                    , "display": "Myanmar"},
        {"flag": "NA.png", "name": "NA"                                    , "display": "Namibia"},
        {"flag": "NR.png", "name": "NR"                                      , "display": "Nauru"},
        {"flag": "NP.png", "name": "NP"                                      , "display": "Nepal"},
        {"flag": "NL.png", "name": "NL"                                , "display": "Netherlands"},
        {"flag": "AN.png", "name": "AN"                       , "display": "Netherlands Antilles"},
        {"flag": "NC.png", "name": "NC"                              , "display": "New Caledonia"},
        {"flag": "NZ.png", "name": "NZ"                                , "display": "New Zealand"},
        {"flag": "NI.png", "name": "NI"                                  , "display": "Nicaragua"},
        {"flag": "NE.png", "name": "NE"                                      , "display": "Niger"},
        {"flag": "NG.png", "name": "NG"                                    , "display": "Nigeria"},
        {"flag": "NU.png", "name": "NU"                                       , "display": "Niue"},
        {"flag": "NF.png", "name": "NF"                             , "display": "Norfolk Island"},
        {"flag": "MP.png", "name": "MP"                   , "display": "Northern Mariana Islands"},
        {"flag": "KP.png", "name": "KP"                                , "display": "North Korea"},
        {"flag": "NO.png", "name": "NO"                                     , "display": "Norway"},
        {"flag": "OM.png", "name": "OM"                                       , "display": "Oman"},
        {"flag": "PK.png", "name": "PK"                                   , "display": "Pakistan"},
        {"flag": "PW.png", "name": "PW"                                      , "display": "Palau"},
        {"flag": "PS.png", "name": "PS"                      , "display": "Palestinian Territory"},
        {"flag": "PA.png", "name": "PA"                                     , "display": "Panama"},
        {"flag": "PG.png", "name": "PG"                           , "display": "Papua New Guinea"},
        {"flag": "PY.png", "name": "PY"                                   , "display": "Paraguay"},
        {"flag": "PE.png", "name": "PE"                                       , "display": "Peru"},
        {"flag": "PH.png", "name": "PH"                                , "display": "Philippines"},
        {"flag": "PN.png", "name": "PN"                                   , "display": "Pitcairn"},
        {"flag": "PL.png", "name": "PL"                                     , "display": "Poland"},
        {"flag": "PT.png", "name": "PT"                                   , "display": "Portugal"},
        {"flag": "PR.png", "name": "PR"                                , "display": "Puerto Rico"},
        {"flag": "QA.png", "name": "QA"                                      , "display": "Qatar"},
        {"flag": "RE.png", "name": "RE"                                    , "display": "Reunion"},
        {"flag": "RO.png", "name": "RO"                                    , "display": "Romania"},
        {"flag": "RU.png", "name": "RU"                                     , "display": "Russia"},
        {"flag": "RW.png", "name": "RW"                                     , "display": "Rwanda"},
        {"flag": "BL.png", "name": "BL"                           , "display": "Saint Barthélemy"},
        {"flag": "SH.png", "name": "SH"                               , "display": "Saint Helena"},
        {"flag": "KN.png", "name": "KN"                      , "display": "Saint Kitts and Nevis"},
        {"flag": "LC.png", "name": "LC"                                , "display": "Saint Lucia"},
        {"flag": "MF.png", "name": "MF"                 , "display": "Saint Martin (French part)"},
        {"flag": "PM.png", "name": "PM"                  , "display": "Saint Pierre and Miquelon"},
        {"flag": "VC.png", "name": "VC"           , "display": "Saint Vincent and the Grenadines"},
        {"flag": "WS.png", "name": "WS"                                      , "display": "Samoa"},
        {"flag": "SM.png", "name": "SM"                                 , "display": "San Marino"},
        {"flag": "ST.png", "name": "ST"                      , "display": "Sao Tome and Principe"},
        {"flag": "SA.png", "name": "SA"                               , "display": "Saudi Arabia"},
        {"flag": "SN.png", "name": "SN"                                    , "display": "Senegal"},
        {"flag": "RS.png", "name": "RS"                                     , "display": "Serbia"},
        {"flag": "SC.png", "name": "SC"                                 , "display": "Seychelles"},
        {"flag": "SL.png", "name": "SL"                               , "display": "Sierra Leone"},
        {"flag": "SG.png", "name": "SG"                                  , "display": "Singapore"},
        {"flag": "SX.png", "name": "SX"                  , "display": "Sint Maarten (Dutch part)"},
        {"flag": "SK.png", "name": "SK"                                   , "display": "Slovakia"},
        {"flag": "SI.png", "name": "SI"                                   , "display": "Slovenia"},
        {"flag": "SB.png", "name": "SB"                            , "display": "Solomon Islands"},
        {"flag": "SO.png", "name": "SO"                                    , "display": "Somalia"},
        {"flag": "ZA.png", "name": "ZA"                               , "display": "South Africa"},
        {"flag": "GS.png", "name": "GS", "display": "South Georgia and the South Sandwich Islands"},
        {"flag": "KR.png", "name": "KR"                                , "display": "South Korea"},
        {"flag": "SS.png", "name": "SS"                                , "display": "South Sudan"},
        {"flag": "ES.png", "name": "ES"                                      , "display": "Spain"},
        {"flag": "LK.png", "name": "LK"                                  , "display": "Sri Lanka"},
        {"flag": "SD.png", "name": "SD"                                      , "display": "Sudan"},
        {"flag": "SR.png", "name": "SR"                                   , "display": "Suriname"},
        {"flag": "SJ.png", "name": "SJ"                     , "display": "Svalbard and Jan Mayen"},
        {"flag": "SZ.png", "name": "SZ"                                  , "display": "Swaziland"},
        {"flag": "SE.png", "name": "SE"                                     , "display": "Sweden"},
        {"flag": "CH.png", "name": "CH"                                , "display": "Switzerland"},
        {"flag": "SY.png", "name": "SY"                                      , "display": "Syria"},
        {"flag": "TW.png", "name": "TW"                                     , "display": "Taiwan"},
        {"flag": "TJ.png", "name": "TJ"                                 , "display": "Tajikistan"},
        {"flag": "TZ.png", "name": "TZ"                                   , "display": "Tanzania"},
        {"flag": "TH.png", "name": "TH"                                   , "display": "Thailand"},
        {"flag": "TL.png", "name": "TL"                                , "display": "Timor-Leste"},
        {"flag": "TG.png", "name": "TG"                                       , "display": "Togo"},
        {"flag": "TK.png", "name": "TK"                                    , "display": "Tokelau"},
        {"flag": "TO.png", "name": "TO"                                      , "display": "Tonga"},
        {"flag": "TT.png", "name": "TT"                        , "display": "Trinidad and Tobago"},
        {"flag": "TN.png", "name": "TN"                                    , "display": "Tunisia"},
        {"flag": "TR.png", "name": "TR"                                     , "display": "Turkey"},
        {"flag": "TM.png", "name": "TM"                               , "display": "Turkmenistan"},
        {"flag": "TC.png", "name": "TC"                   , "display": "Turks and Caicos Islands"},
        {"flag": "TV.png", "name": "TV"                                     , "display": "Tuvalu"},
        {"flag": "VI.png", "name": "VI"                        , "display": "U.S. Virgin Islands"},
        {"flag": "UG.png", "name": "UG"                                     , "display": "Uganda"},
        {"flag": "UA.png", "name": "UA"                                    , "display": "Ukraine"},
        {"flag": "AE.png", "name": "AE"                       , "display": "United Arab Emirates"},
        {"flag": "GB.png", "name": "GB"                             , "display": "United Kingdom"},
        {"flag": "US.png", "name": "US"                              , "display": "United States"},
        {"flag": "UM.png", "name": "UM"       , "display": "United States Minor Outlying Islands"},
        {"flag": "UY.png", "name": "UY"                                    , "display": "Uruguay"},
        {"flag": "UZ.png", "name": "UZn"                                 , "display": "Uzbekistan"},
        {"flag": "VU.png", "name": "VU"                                    , "display": "Vanuatu"},
        {"flag": "VA.png", "name": "VA"                                    , "display": "Vatican"},
        {"flag": "VE.png", "name": "VE"                                  , "display": "Venezuela"},
        {"flag": "VN.png", "name": "VN"                                    , "display": "Vietnam"},
        {"flag": "WF.png", "name": "WF"                          , "display": "Wallis and Futuna"},
        {"flag": "EH.png", "name": "EH"                             , "display": "Western Sahara"},
        {"flag": "YE.png", "name": "YE"                                      , "display": "Yemen"},
        {"flag": "ZM.png", "name": "ZM"                                     , "display": "Zambia"},
        {"flag": "ZW.png", "name": "ZW"                                 , "display": "Zimbabwe"}
    ];

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

        //url: "http://excitenet.co.uk/users-json/jusutalk-mobile-rates/get.json",

        dsRates: new kendo.data.DataSource({
            transport: {
                read: {
                    url: "http://excitenet.co.uk/users-json/jusutalk-mobile-rates/get.json", //this.viewModel.get('url'),
                    beforeSend: function(xhr){
                        /*var token = app.loginService.viewModel.token;
                        xhr.setRequestHeader('X-CSRF-Token', token);*/

                    },
                    dataType: "json",
                    type: "POST"
                }
            },
            batch: true,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true,
            pageSize: 10,
            sort: {
                field: "tid",
                dir:"asc"
            },
            schema: {
                /* total: function() {
                 return 32;
                 },*/
                total: "total",
                data: "data",
                model: {
                    id: "tid",
                    fields: {
                        tid: { editable: false, nullable: true },
                        to_country: { type: "string" },
                        from_country: { type: "string" },
                        rate: { type: "string" },
                        status: { type: "number" }
                    }
                }
            }
        }),

        fromCountry:'GB',
        toCountry:'',
        toFlag:'gb',
        showingRates: false,

        getMovies:getMovies,
        showHomeView:showHomeView,
        initRates:initRates

    });


    function initRates(){

        $('.ui.dropdown').dropdown();

        $('#to-counties.ui.dropdown')
            .dropdown({
                // maxSelections: 3
                onChange: function(value, text, $selectedItem) {

                    // custom action
                    var r = $('#to-counties.ui.dropdown')
                        .dropdown('get value');

                        var that = app.ratesModel.viewModel;
                        fromCountry = that.get("fromCountry").trim(),
                        toCountry = that.get("toCountry").trim();

                    that.set("toFlag", value);

                    var str = text;
                    var res = str.split("</i>");
                    text = res[1]


                    viewModel.dsRates.filter({
                        field: "to_country",
                        operator: "startswith",
                        value: text
                    });

                    viewModel
                        .dsRates
                        .read()
                        .then(function() {
                            that.set("showingRates", true);
                        });
                }
            });

        /*
        var dataSource_1 = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp"
                }
            }
        });
        $("#dropdownlist").kendoDropDownList({
            dataSource: dataSource_1,
            dataTextField: "ProductName",
            dataValueField: "ProductID"
        });
        */


        //-----------------------------------------------------------------------
        /*
        isURLReal('http://google.com')
            .done(function(result) {
                alert('yes');
            })
            .fail(function(result) {
                alert('no, or request failed');
            });
        */


        //-----------------------------------------------------------------------
        /*$("#to-country").kendoComboBox({

            dataSource: data_Rates,
            dataValueField: "display",
            dataTextField: "display", // The widget is bound to the "name" field
            placeholder: "enter country you are calling",
            height: 400,
            suggest: true,
            highlightFirst: true,
            filter: "startswith",
            //index: 3

            //template: '<span class="k-state-default" id="rates-countries-tpl"><span><img src="https://www.twilio.com/bundles/flags/img/58x42/#= flag.toLowerCase() #" /></span><strong>#: display #</strong></span>'

        });*/


        //-----------------------------------------------------------------------
        //create AutoComplete UI component
       /* $("#countries").kendoAutoComplete({
            valuePrimitive: true,
            filter: "startswith",
            //virtual: true,
            dataSource: data_Rates,
            dataValueField: "display",
            dataTextField: "display", // The widget is bound to the "name" field
            placeholder: "enter country you are calling",
            //select: onSelect,
            //change: onChange,
            //separator: ", ",
            //filter: "startswith",
            //template: "<div>#:name#</div>",

            //headerTemplate: '<div><h6 style=" margin: 10px 6px; border-bottom: 1px solid #ccc;">Destination Country</h6></div>',
            //template: '<span class="k-state-default" id="countries-ac-tpl"><span><img src="https://www.twilio.com/bundles/flags/img/58x42/#= flag.toLowerCase() #" /></span><strong>#: display #</strong></span>'
        });

        */
        $("#pager").kendoPager({
            dataSource: app.ratesModel.viewModel.dsRates
        })


    }





    //------------------not used ------------------------------------
    function showHomeView(e) {

        var that = this,
        fromCountry = that.get("fromCountry").trim(),
        toCountry = that.get("toCountry").trim();

        /**
         * search object in an array of objects.
         * -------------------------------------
         */
        var objCountry = data_Rates.filter(function ( obj ) {
            return obj.display === toCountry;
        })[0];


        //console.log(objCountry);
        if (typeof objCountry !== "undefined")
            that.set("toFlag",objCountry.flag.toLowerCase());

        viewModel.dsRates.filter({
            field: "to_country",
            operator: "startswith",
            value: toCountry
        });
        viewModel.dsRates.read();

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