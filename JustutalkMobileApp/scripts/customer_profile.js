(function (global) {


    var ProfileViewModel,
        app = global.app = global.app || {};



    ProfileViewModel = kendo.data.ObservableObject.extend({


        get  : function(){

            var profile_id = app.checkoutService.viewModel.get("checkout.billing.profile_id");

            schema = {
                model: {
                    id: "profile_id"
                }
            };

            var params = {
                page        : 0,
                parameters  : {
                    profile_id : profile_id ,
                    type : 'billing'
                },
                fields      : "",
                pagesize    : 0,
                sort        : "",
                direction   : ""
            };


            var options = {
                //callback:this.getCallBack
            };

            var p = app.services.get('entity_commerce_customer_profile',params, schema,options);
            return p.then(function(data){

                //console.log(data);

                if(data && data.length){

                    data = data[0];
                    var addr = data.commerce_customer_address;

                    var billing = {
                        profile_id          :data.profile_id,
                        first_name          :addr.first_name,
                        last_name           :addr.last_name,
                        address1            :addr.thoroughfare,
                        address2            :addr.premise,
                        postcode            :addr.postal_code,
                        county              :addr.administrative_area,
                        country             :addr.country,
                        city                :addr.locality,

                        //None Essential
                        telephone           :'',
                        email               :''
                    };

                    app.checkoutService.viewModel.set("checkout.billing",billing);

                }
                console.log(app.checkoutService.viewModel.get("checkout.billing"));
                return app.checkoutService.viewModel.get("checkout.billing");
            });


        },
        getCallBack:function(data){

            data = data[0];
            var addr = data.commerce_customer_address;

            var billing = {
                profile_id          :data.profile_id,
                first_name          :addr.first_name,
                last_name           :addr.last_name,
                address1            :addr.thoroughfare,
                address2            :addr.premise,
                postcode            :addr.postal_code,
                county              :addr.administrative_area,
                country             :addr.country,
                city                :addr.locality,

                //None Essential
                telephone           :'',
                email               :''
            };

            app.checkoutService.viewModel.set("checkout.billing",billing);

            console.log(app.checkoutService.viewModel.get("checkout.billing"));
        },


        create: function(){

            var billing = app.checkoutService.viewModel.get("checkout.billing")

            schema = {
                model: {
                    id: "profile_id"
                },
                data: function(result) {
                    return [result];
                }
            };

            var requestData=   {
                "status": "1",
                "type": "billing",
                "uid": app.loginService.viewModel.get("user.user_id"),
                "commerce_customer_address":
                {
                    "country":  billing.country,
                    "administrative_area": billing.county,
                    "sub_administrative_area": null,
                    "locality": billing.city,
                    "dependent_locality": "",
                    "postal_code": billing.postcode,
                    "thoroughfare": billing.address1,
                    "premise": billing.address2,
                    "sub_premise": null,
                    "organisation_name": null,
                    "name_line": billing.first_name + ' ' + billing.last_name,
                    "first_name": billing.first_name,
                    "last_name": billing.last_name
                }
            };

            var options = {
                //callback:this.createCallBack
            };


            var p = app.services.create('entity_commerce_customer_profile',requestData, schema,options);
            return p.then(function(data){

                //console.log(data);

                if(data && data.length){

                    data = data[0];
                    var addr = data.commerce_customer_address;

                    var billing = {
                        profile_id          :data.profile_id,
                        first_name          :addr.first_name,
                        last_name           :addr.last_name,
                        address1            :addr.thoroughfare,
                        address2            :addr.premise,
                        postcode            :addr.postal_code,
                        county              :addr.administrative_area,
                        country             :addr.country,
                        city                :addr.locality,

                        //None Essential
                        telephone           :'',
                        email               :''
                    };

                    app.checkoutService.viewModel.set("checkout.billing",billing);

                }
                billing =app.checkoutService.viewModel.get("checkout.billing");
                console.log('billing');
                console.log(billing);
                return billing;
            });

        },
        createCallBack:function(data){

            data = data[0];
            var addr = data.commerce_customer_address;

            var billing = {
                profile_id          :data.profile_id,
                first_name          :addr.first_name,
                last_name           :addr.last_name,
                address1            :addr.thoroughfare,
                address2            :addr.premise,
                postcode            :addr.postal_code,
                county              :addr.administrative_area,
                country             :addr.country,
                city                :addr.locality,

                //None Essential
                telephone           :'',
                email               :''
            };

            app.checkoutService.viewModel.set("checkout.billing",billing);

            //console.log(app.checkoutService.viewModel.get("checkout.billing"));
        },


        update  : function(){

            var billing = app.checkoutService.viewModel.get("checkout.billing")

            schema = {
                model: {
                    id: "profile_id"
                },
                data: function(result) {
                    return [result];
                }
            };

            var requestData=   {
                "status": "1",
                "type": "billing",
                "uid": app.loginService.viewModel.get("user.user_id"),
                "commerce_customer_address":
                {
                    "country":  billing.country,
                    "administrative_area": billing.county,
                    "sub_administrative_area": null,
                    "locality": billing.city,
                    "dependent_locality": "",
                    "postal_code": billing.postcode,
                    "thoroughfare": billing.address1,
                    "premise": billing.address2,
                    "sub_premise": null,
                    "organisation_name": null,
                    "name_line": billing.first_name + ' ' + billing.last_name,
                    "first_name": billing.first_name,
                    "last_name": billing.last_name
                }
            };

            var options = {
                //callback:this.updateCallBack,
                //id: billing.profile_id
            };

            //console.log(requestData);
            //console.log(billing);
            //return 0;

            var p = app.services._update('entity_commerce_customer_profile',billing.profile_id,requestData, schema,options);
            return p.then(function(data){

                console.log(data.profile_id);
                //console.log(data[0].profile_id);

                if(data && data.length){

                    //data = data[0];
                    var addr = data.commerce_customer_address;

                    var billing = {
                        profile_id          :data.profile_id,
                        first_name          :addr.first_name,
                        last_name           :addr.last_name,
                        address1            :addr.thoroughfare,
                        address2            :addr.premise,
                        postcode            :addr.postal_code,
                        county              :addr.administrative_area,
                        country             :addr.country,
                        city                :addr.locality,

                        //None Essential
                        telephone           :'',
                        email               :''
                    };

                    app.checkoutService.viewModel.set("checkout.billing",billing);

                }
                //console.log(app.checkoutService.viewModel.get("checkout.billing"));
                return app.checkoutService.viewModel.get("checkout.billing");
            });


        },
        updateCallBack:function(data){

            //data = data[0];

            //console.log(data);

            //return 0;


            var addr = data.commerce_customer_address;

            var billing = {
                profile_id          :data.profile_id,
                first_name          :addr.first_name,
                last_name           :addr.last_name,
                address1            :addr.thoroughfare,
                address2            :addr.premise,
                postcode            :addr.postal_code,
                county              :addr.administrative_area,
                country             :addr.country,
                city                :addr.locality,

                //None Essential
                telephone           :'',
                email               :''
            };

            app.checkoutService.viewModel.set("checkout.billing",billing);

            //console.log(app.checkoutService.viewModel.get("checkout.billing"));
        },

        delete  : function(status){


        }


    });

    app.profileService = {
        viewModel: new ProfileViewModel()
    };
})(window);
