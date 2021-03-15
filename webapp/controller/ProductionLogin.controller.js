sap.ui.define([
    //"sap/ui/core/mvc/Controller",
     "SS/SigniwisSports1/controller/BaseController",
	"sap/ui/model/FilterOperator",
    "sap/ui/model/Filter",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
], function (BaseController, FilterOperator, Filter,MessageBox,JSONModel) {
	"use strict";

	return BaseController.extend("SS.SigniwisSports1.controller.ProductionLogin", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf SS.SigniwisSports.view.ProductionLogin
		 */
		onInit: function () {
		// debugger;
		// this.tableLength();
		},
			// 	onAfterRendering: function() {
		
			// },
			tableLength:function(){
		 if(this.getOwnerComponent().getModel("ticketing")){
			var ticketArray=this.getOwnerComponent().getModel("ticketing").getProperty("/raiseTicket");
			this.getView().byId("idTable").setVisibleRowCount(ticketArray.length);
			}
				
			},

		oDataModified: [],

		onBtnPress1: function (oEvent) {
            debugger;
			var btn = oEvent.getSource().oParent.mAggregations.cells;
			//btn[5].getProperty("text");
			btn[6].setProperty("text", "Approved");
			btn[5].setEnabled(false);
            btn[4].setEnabled(false);
            if(btn[0].getProperty("text") === "NEW" || btn[0].getProperty("text") === "" ){
                var Id = new Date().getTime();
              var   pId = Id.toString();
              pId= pId.slice(pId.length-10,10);
                var obj ={
                    About: "",
                    Amount: "",
                    Brand: "COMING SOON ...",
                    Pimage: "",
                    Productid: pId,
                    Productname: btn[2].getProperty("text"),
                    Producttype: btn[1].getProperty("text"),
                    Quantity: btn[3].getProperty("text"),
                   Specifications: ""
                }
              this.create(obj)
            }
            else{

                this.createProduct(btn[0].getProperty("text"),btn[3].getProperty("text"));
            }

		},

		onBtnPress2: function (oEvent) {

			var btn = oEvent.getSource().oParent.mAggregations.cells;
			//btn[5].getProperty("text");
			btn[6].setProperty("text", "Declined");
			btn[5].setEnabled(false);
			btn[4].setEnabled(false);

		},
		onLogout: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("RouteApp");
			 if(this.getOwnerComponent().getModel("ticketing")){
			
						this.oDataModified = this.getOwnerComponent().getModel("ticketing").getProperty("/raiseTicket");
			for (var i = 0; i < this.oDataModified.length; i++) {
				if(this.oDataModified[i].pStatus !== "InProcess"){
				this.oDataModified[i].status = "Completed";
				}
			}
			var ticketData = {
				raiseTicket: this.oDataModified
			};
			var model = new sap.ui.model.json.JSONModel(ticketData);
			this.getOwnerComponent().setModel(model, "ticketing");
			 }
		},
		oPopUp: null,
		onShowTicket: function () {
         //   debugger;
			if (!this.oPopUp) {
				var oid = this.createId("productFragId");
				this.oPopUp = new sap.ui.xmlfragment(oid, "SS.SigniwisSports1.view.productInfo", this);
				this.oPopUp.bindAggregation("items", {
                    path: "MainModel>/allProducts",
					template: new sap.m.ObjectListItem({
                        intro: "{MainModel>Productname}",
                        icon: "{MainModel>Pimage}",
                        title: "{MainModel>Brand}",
                        type: "Active",
                        attributes:[
                            new sap.m.ObjectAttribute(
                                {text:"{MainModel>Productid}"}
                                )
                            ]
                        })
                    });
                    this.getView().addDependent(this.oPopUp);
			}
			this.oPopUp.open();

		},
		onClose: function () {
			this.oPopUp.removeAllItems();
		},
		handleSearch: function (oEvent) {
				var sValue = oEvent.getParameter("value");
				var oFilter1 = new Filter("productName", FilterOperator.Contains, sValue);
				var oFilter2 = new Filter("brand", FilterOperator.Contains, sValue);
				var oBinding = oEvent.getSource().getBinding("items");
				var oFilter = [oFilter1, oFilter2];
				oBinding.filter([oFilter]);
            },
            createProduct:function(pId,quantity){
              //  debugger;
           var products =[],product = null;
           products=  this.getOwnerComponent().getModel("MainModel").getProperty("/allProducts")

           products.forEach(element => {
               if(element.Productid === pId){
                product = element;
                product.Quantity = element.Quantity+parseInt(quantity);
                this.update(product);
               }
           });
           

            },
            update:function(product){
              //  debugger;
              var that = this;
              var  payLoad = product;
               var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZLKSIGNIWIS01_SRV/");
               var data= oModel.update("/SIGNIWISSPORTSSet('" + product.Productid + "')", payLoad, {
				method: "PUT",
				success: function (odata, Response) {

					if (odata !== "" || odata !== undefined) {
                        MessageBox.success("Updated successfully.");
                   
                      that.modelUpdate();
					} else {
						MessageBox.error("Not updated.");
					}

				},
				error: function (cc, vv) {
                MessageBox.error("Not updated.");
				}

            })
            
            
        },
                create:function(obj){
                    var that = this;

            var payLoad = obj;
             var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZLKSIGNIWIS01_SRV/");
			var data=	oModel.create("/SIGNIWISSPORTSSet",payLoad, {
					success: function (odata, Response) {

					if (odata !== "" || odata !== undefined) {
                        MessageBox.success("Created successfully.");
                        //  SalesLogin.onInit();
                         that.modelUpdate();
					} else {
						MessageBox.error("New entry not created.");
					}
				},
				error: function (cc, vv) {
                     MessageBox.error("New entry not created.");
				}
				});
			
                },
     
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf SS.SigniwisSports.view.ProductionLogin
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf SS.SigniwisSports.view.ProductionLogin
		 */
	
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf SS.SigniwisSports.view.ProductionLogin
		 */
		

	});

});