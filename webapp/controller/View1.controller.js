sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "sap/m/MessageToast"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller,JSONModel,MessageToast) {
		"use strict";

		return Controller.extend("SS.SigniwisSports1.controller.View1", {
			onInit: function () {
            //  
             this.getView().byId("userId").setValue("");
			this.getView().byId("userName").setValue("");
            }
            ,
		empArray: null,
		onLogin: function () {
            // debugger;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var id = this.getView().byId("userId").getValue();
			var name = this.getView().byId("userName").getValue();

			if (id === "" || name === "" || id === "null" || name === "null") {
				MessageToast.show("Please fill all the details");
				this.getView().byId("userId").setValueState("Error");
				this.getView().byId("userName").setValueState("Error");
			} else if (id === "production" && name === "manager") {

				this.getView().byId("userId").setValueState("None");
				this.getView().byId("userName").setValueState("None");
				oRouter.navTo("ProductLogin");
			} else {
				if (this.empArray === null || this.empArray === undefined) {
					this.empArray = this.getView().getModel("empData").getProperty("/EmployeeList");
				}
				for (var i = 0; i < this.empArray.length; i++) {

					if (id === this.empArray[i].empId && name === this.empArray[i].empName) {
						this.getView().byId("userId").setValueState("None");
                        this.getView().byId("userName").setValueState("None");
                       // this.getOwnerComponent().getRouter().getRoute("<Route name>").attachPatternMatched(<Your Handler>, this);
						oRouter.navTo("SalesLogin", {
							empId: id
						});
						break;
					} else {
						MessageToast.show("Please enter valid details");
						this.getView().byId("userId").setValueState("Error");
						this.getView().byId("userName").setValueState("Error");
					}
				}
			}

		}
		});
	});
