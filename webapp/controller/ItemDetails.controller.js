sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function (Controller,UIComponent) {
	"use strict";

	return Controller.extend("SS.SigniwisSports.controller.ItemDetails", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf SS.SigniwisSports.view.ItemDetails
		 */
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			oRouter.attachRoutePatternMatched(this.onClick, this);

		},
			onBack: function () {
					var oRouter = UIComponent.getRouterFor(this);
					oRouter.navTo("SalesLogin");
				},

		onClick: function (oEvent) {
// debugger
        var path = oEvent.getParameter("arguments").itemName;
              var  oPath = "Model2>/productList/"+path
			var object = this.getView().byId("object");
			object.bindElement(oPath);
		}
















        
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf SS.SigniwisSports.view.ItemDetails
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf SS.SigniwisSports.view.ItemDetails
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf SS.SigniwisSports.view.ItemDetails
		 */
		//	onExit: function() {
		//
		//	}

	});

});