sap.ui.define([
   // "sap/ui/core/mvc/Controller",
    "SS/SigniwisSports1/controller/BaseController",
	"sap/ui/core/UIComponent",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel",
    "sap/m/Token",
    "SS/SigniwisSports1/model/formatter",
    "sap/m/MessageBox"
 
], function (BaseController, UIComponent, MessageToast, Fragment, Filter, FilterOperator, JSONModel,Token,Formatter,MessageBox) {
	"use strict";

	return BaseController.extend("SS.SigniwisSports1.controller.SalesLogin", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf SS.SigniwisSports.view.SalesLogin
		 */
         formatter:  Formatter,
        today: null,
       productOData:[],
       AcessoriessOData:[],
		onInit: function () {
         debugger
          this.modelUpdate();
           var OData = null;
                    var that = this;
        //     var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZLKSIGNIWIS01_SRV/");
        //     var data=oModel.read("/SIGNIWISSPORTSSet", {
        //         success:function(data){
        //            // alert("success");
        //             OData= data.results;
        //             console.log(data.results);  
        //             that.productOData = OData; 
        //             // set the model
        //              that.masterData();  
        //              that.onSelect(null);              
        //         },
        //         error:function(){
        //             alert("error");
        //         }
        //     });
        var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZLKSIGNIWIS01_SRV/");
            // oModel.read("/AcessoriessSet", {
            //     success:function(data){
            //        // alert("success");
            //         OData= data.results;
            //         console.log(data.results);  
            //         that.AcessoriessOData = OData; 
            //         // set the model
            //          that.AcessoriessData();  
                              
            //     },
            //     error:function(){
            //         alert("error");
            //     }
            // });
         
            
			var date = new Date();
			var day = date.getDate();
			var month = date.getMonth();
			var year = date.getFullYear();
			this.today = (day + "/" + month + "/" + year);

			//  var carousel = this.getView().byId("carousel");
		    //        carousel.setLoop(true);
		    //        setTimeout(function() { carousel.next(); }, 2500);
		        //  this.changeImage();
                
		           
		           	//randon id 
			var orderVal = Math.floor(Math.random() * 12345);
            this.getView().byId("orderId").setValue(orderVal);

       

        
           
        },
       
     

		//product code

	// onSelect: function (event) {
         
    //     // debugger
    //     if(event !== null){
    //         var path= event.getSource()._aSelectedPaths;
    //        path = path[0];
    //        path= this.getOwnerComponent().getModel("Model1").getProperty(path).productName;
    //    }
    //    else{
    //        path='CYCLES';
    //    }
    //         var OData=null;
    //         var that = this;
    //          var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZLKSIGNIWIS01_SRV/");
    //      var data2=oModel.read("/ProductsByCategory?PRODUCTTYPE='"+path+"'", {
    //             success:function(data){
    //                // alert("success");
    //                 OData= data.results;
    //                 console.log(data.results);  
    //                 that.detailData(data.results);                 
    //             },
    //             error:function(){
    //                 alert("error in selecting item");
    //             }
    //         });

    // },
    // detailData:function(obj){
    //    // debugger
    //       obj.forEach((Element,index)=>{
    //       obj[index].Amount = parseInt(Element.Amount);
    //        obj[index].Quantity = parseInt(Element.Quantity);
    //     });
        
    //       	var mydata={
	// 		productList:obj
	// 	};
		
	// 	var Model= new JSONModel(mydata);
        
    //      this.getOwnerComponent().setModel(Model,"Model2")
    //          var list = this.getView().byId("objectList");
    //            //  list.removeAllSelectedItems;
	// 		//debugger;
    //        //var that = this;
	// 		var oPath =  "Model2>/productList";
	// 		list.bindItems(oPath, new sap.m.ObjectListItem({
	// 				intro: "{Model2>Productname}",
	// 				icon: "{Model2>Pimage}",
    //                 number: "INR {Model2>Amount}",
    //                 numberState:"{=${Model2>Quantity} > 25 ? 'Success' : ${Model2>Quantity} > 5 ? 'Warning' : 'Error'}",        
	// 				title: "{Model2>Brand}",
	// 				type: "Active",
	// 				 attributes:[
    //                    new sap.m.ObjectAttribute(
    //                    	{text:"{Model2>Productid}"}
    //                        )
    //                   ],
    //              firstStatus:[
    //                    new sap.m.ObjectStatus({
                         
    //                      text:"Quantity : {Model2>Quantity}",
    //                       state:"{=${Model2>Quantity} > 25 ? 'Success' : ${Model2>Quantity} > 5 ? 'Warning' : 'Error'}"      
                        
    //                    })
    //                    ],
    //                       secondStatus:[
    //                    new sap.m.ObjectStatus({
                         
    //                      text:"{=${Model2>Quantity} > 25 ? 'Available' : ${Model2>Quantity} > 5 ? 'Low' : 'outOfStock'}",
    //                       state:"{=${Model2>Quantity} > 25 ? 'Success' : ${Model2>Quantity} > 5 ? 'Warning' : 'Error'}"      
                        
    //                    })
    //                    ]
	// 		}
	// 			)
    //         );
        
    // },
    onItemSelect:function(oEvent){
        //  debugger;
        var path =  oEvent.getParameter("listItem").getBindingContextPath();
		var itemIndex = path.split("/")[path.split("/").length - 1];
		
        	var oRouter = UIComponent.getRouterFor(this);
	      oRouter.navTo("DetailView",{itemName: itemIndex});
    },
    	
        
//         data :[],
//         masterData:function(){
// //    debugger;
//                this.productOData.forEach(element=> this.data.push(element.Producttype))
//                this.data =[... new Set(this.data)];

//                this.data.forEach(element=>{
                  
//                    this.ptypes.push({productName:element})
//                });

//                	var mydata={
// 			productTypes:this.ptypes
// 		};
		
// 		var Model= new JSONModel(mydata);
        
//          this.getOwnerComponent().setModel(Model,"Model1");

//         this.productOData.forEach((Element,index)=>{
//           this.productOData[index].Amount = parseInt(Element.Amount);
//            this.productOData[index].Quantity = parseInt(Element.Quantity);

//            if(Element.Amount === 0){
//               this.productOData[index].Amount = "Coming Soon ..."; 
//               this.productOData[index].Quantity= 0;
//            }
//         });

//           	var alldata={
// 			allProducts:this.productOData
// 		};
		
// 		var Model= new JSONModel(alldata);
        
//          this.getOwnerComponent().setModel(Model,"MainModel");



     
//         },
        // AcessoriessData:function(){
        //      this.AcessoriessOData.forEach((Element,index)=>{
        //   this.AcessoriessOData[index].Amount = parseInt(Element.Amount);
        // });

        //  	var alldata={
		// 	acessoriess:this.AcessoriessOData
		// };
		
		// var Model= new JSONModel(alldata);
        
        //  this.getOwnerComponent().setModel(Model,"AModel");
        // },
onRequest: function () {

			if (!this.itemPopUp) {
				this.itemPopUp = new sap.m.SelectDialog({
					title: "ProductList",
					multiSelect: true,
					confirm: this.onItemConfirm.bind(this),
					liveChange: this.handleSearch.bind(this)
				});
				this.getView().addDependent(this.itemPopUp);
				this.itemPopUp.bindAggregation("items", {
                    path: "MainModel>/allProducts",
                   // templateShareable:true,
					template: new sap.m.ObjectListItem({
						title: "{MainModel>Productname}",
                        number: " INR {MainModel>Amount}",
                      numberState:"{=${MainModel>Quantity} > 25 ? 'Success' : ${MainModel>Quantity} > 10 ? 'Warning' : 'Error'}",
                        numberUnit: "Quantity : {MainModel>Quantity}",
                        blocked :"{=${MainModel>Quantity} < 5 ? true : false }",
                        icon: "{MainModel>Pimage}",
                         attributes:[
                       new sap.m.ObjectAttribute(
                       	{text:"{MainModel>Productid}"}
                           ),
                            new sap.m.ObjectAttribute(
                       	{text:"{MainModel>Brand}"}
                           )
                      ],
                         firstStatus:[
                       new sap.m.ObjectStatus({
                         text:"{=${MainModel>Quantity} > 25 ? 'Available' : ${MainModel>Quantity} > 10 ? 'Low' : 'only few left'}",
                         state:"{=${MainModel>Quantity} > 25 ? 'Success' : ${MainModel>Quantity} > 10 ? 'Warning' : 'Error'}"
                       }
                    )
                       ]
					})
				});
			}
			this.itemPopUp.open();
		},
		itemLength: null,
		oBill: [],
		onItemConfirm: function (oEvent) {
            var item = oEvent.getParameter("selectedItems");
           // debugger
			this.itemLength = item.length;
			var selectedItems = [];
			var itemsPrice = [];
            var itemsId = [];
            // debugger

			for (var i = 0; i < item.length; i++) {
				selectedItems.push(item[i].getTitle());
				itemsPrice.push(item[i].getNumber());
				itemsId.push(item[i].getAttributes()[0].getText());
            };
            //   debugger
            itemsPrice.forEach((element,index)=>{
             
              itemsPrice[index] = element.replace("INR ","");;
            })
			var productInput=this.getView().byId("Product");
			selectedItems.forEach(function(items){
			productInput.addToken(new Token({text:items}));
			});
			var oTable = this.getView().byId("idBilling");

			oTable.setVisible(true);
				this.getView().byId("totalAmount").setVisible(true);
		
			for (var j = 0; j < item.length; j++) {
				var oBilling = {
					id: itemsId[j],
					name: selectedItems[j],
					price: itemsPrice[j],
					quantity: "1"
				};

				this.oBill.push(oBilling);
			}
            this.setData();

            //default value for quantity
        //     var oid = this.createId("idBilling");
        //  var combo= Fragment.byId(oid, "limit");
        //  combo.setSelectedKey("1");
        },
        quantityChange:function(oEvent){
       // debugger
        var value = oEvent.getSource()._lastValue;
      var row = oEvent.getSource().oParent.sId
         row= Number(row[row.length-1]);

      var totalBilling = this.getOwnerComponent().getModel("billing").getProperty("/bill");
          totalBilling[row].quantity = value
         this.setData();
        },
		setData: function () {
         //debugger;
			var ticketData = {
				bill: this.oBill
			};
            this.totalAmount=0;
			var model = new JSONModel(ticketData);
			this.getOwnerComponent().setModel(model, "billing");
			var oTable = this.getView().byId("idBilling");
			var totalBilling = this.getOwnerComponent().getModel("billing").getProperty("/bill");
			oTable.setVisibleRowCount(totalBilling.length);
			for (var i = 0; i < totalBilling.length; i++) {
				this.totalAmount =	this.totalAmount+(Number(totalBilling[i].price) * Number(totalBilling[i].quantity));
			}
			// this.getView().byId("totalAmount").setValue(this.totalAmount);
				this.getView().byId("totalAmount").setText("Total Amount = INR "+this.totalAmount+" Only/- ");
		},

		handleSelectionChange: function (oEvent) {
          //  debugger
            var changedItem = oEvent.getParameter("changedItem");
            var id = changedItem.getKey();
            var accessoriess = this.getOwnerComponent().getModel("AModel").getProperty("/acessoriess")
            accessoriess.forEach((element)=>{
                if(element.Productid===id){

                    var accessObj = {
                        id: id,
                        name: changedItem.getText(),
                        price: element.Amount,
                        quantity: "1"
                    };
                    this.oBill.push(accessObj);
                }
            })
            this.setData();
		},
		
		customerData: null,
		totalAmount: 0,
		raiseTicket: function () {

			var customerName = this.getView().byId("customerName").getValue();
			var customerNumber = this.getView().byId("customerNumber").getValue();
			var orderId = this.getView().byId("orderId").getValue();
			var valnumber = /^[0-9]+$/;
			if (customerName === "" && customerNumber === "" ) {
                MessageToast.show("Please fill the details");
                  this.getView().byId("customerName").setValueState("Error");
                    this.getView().byId("customerNumber").setValueState("Error");
			} else if (customerName === "") {
				MessageToast.show("Please fill the Customer Name");
                this.getView().byId("customerName").setValueState("Error");
			} else if (customerNumber === ""  ||  customerNumber.length!==10) {
                 this.getView().byId("customerName").setValueState("None");
                 this.getView().byId("customerNumber").setValueState("Error");
                MessageToast.show("Please enter valid phone Number");
			} else if (!customerNumber.match(valnumber)) {
                MessageToast.show("Please enter  phone Number");
                this.getView().byId("customerNumber").setValueState("Error");
				
            } 
            // else if (customerNumber.match(valnumber)) {
            //     MessageToast.show("Please enter  phone Number");
            //     this.getView().byId("customerNumber").setValueState("None");
				
			// }
             else if (this.oBill<1) {
				MessageToast.show("Please select the Product");
				
			}  
			
			else {
                //   this.getView().byId("customerName").setValueState("None");
                //  this.getView().byId("customerNumber").setValueState("None");
					this.totalAmount=0;
				 var totalBilling = this.getView().getModel("billing").getProperty("/bill");
				for (var i = 0; i < totalBilling.length; i++) {
				 	this.totalAmount +=(Number(totalBilling[i].price) * Number(totalBilling[i].quantity));

					this.productArr.push(totalBilling[i].name);
					this.productIdArr.push(totalBilling[i].id);
					this.quantityArr.push(totalBilling[i].quantity);
					this.priceArr.push(totalBilling[i].price);
				}
					this.totalAmount.toString();
				this.getView().byId("totalAmount").setText(this.totalAmount);
				this.customerData = {
					customerName: customerName,
					customerNumber: customerNumber,
					orderId: orderId
				};
				this.getPdf(totalBilling);
			}
		},
		productArr: [],
		productIdArr: [],
		quantityArr: [],
		priceArr: [],
		getPdf: function (totalBilling) {
            this.updateOdata(totalBilling);
			var amount = this.getView().byId("totalAmount").getText();
			this.getView().byId("idBilling").setVisible(false);
			this.getView().byId("Product").setVisible(true);
			this.getView().byId("ProductLabel").setVisible(true);
			var doc = new jsPDF();
			doc.setFillColor(51, 51, 51);
			doc.rect(1, 1, 208, 19, "FD");
			doc.rect(1, 1, 208, 250);
			doc.setFontType("bold");
			doc.setFontSize(20);
			doc.setTextColor(255, 255, 255);
			doc.text(80, 10, "Signiwis Sports");

			doc.setFontType("normal");
			doc.setFontSize(15);
			doc.setTextColor(0, 0, 0);
			doc.line(1, 20, 208, 20);
			doc.text(150, 30, "Date : " + this.today);
			doc.text(20, 60, "Name :  " + this.customerData.customerName);
			doc.text(20, 70, "Phone Number :  " + this.customerData.customerNumber);
			doc.text(20, 80, "OrderId :  " + this.customerData.orderId);
			doc.line(4, 90, 204, 90);
			doc.line(50, 90, 50, 170);
			doc.line(110, 90, 110, 170);
			doc.line(150, 90, 150, 170);

			doc.line(4, 90, 4, 170);
			doc.line(204, 90, 204, 170);

			doc.text(20, 100, "ProductId");
			doc.text(60, 100, " ProductName");
			doc.text(110, 100, " quantity");
			doc.text(160, 100, "Amount");

			doc.line(4, 105, 204, 105);

			doc.text(20, 115, this.productIdArr);
			doc.text(60, 115, this.productArr);
			doc.text(130, 115, this.quantityArr);
			doc.text(158, 115, this.priceArr);
			doc.line(4, 170, 204, 170);
			doc.setFontType("bold");
			doc.text(140, 200, "TotalAmount= INR" + amount);

			doc.save("booking.pdf");
				this.totalAmount=0;
				this.productArr=[];
				this.productIdArr=[];
				this.quantityArr=[];
				this.priceArr=[];
			var ticketData=[];
			this.oBill=[];
				var model = new JSONModel(ticketData);
			this.getOwnerComponent().setModel(model, "billing");
			  this.getView().byId("customerName").setValue("");
			  this.getView().byId("customerNumber").setValue("");
			  	this.getView().byId("totalAmount").setText("");
			  		this.getView().byId("Product").removeAllTokens();
			  			this.getView().byId("accessories").removeAllSelectedItems();
			  				//randon id 
			var orderVal = Math.floor(Math.random() * 12345);
			this.getView().byId("orderId").setValue(orderVal);
        },
        
        //update odata reduce the sale item count
        updateOdata:function(product){
           debugger
   var allProducts = this.getOwnerComponent().getModel("MainModel").getProperty("/allProducts");
   var accessories = this.getOwnerComponent().getModel("AModel").getProperty("/acessoriess");
     var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZLKSIGNIWIS01_SRV/");
   var that = this;
   allProducts.map((element,index)=>{
       product.forEach(sele=>{
           if(element.Productid === sele.id){
                console.log(element.Quantity);
               element.Quantity = Number(element.Quantity) - Number(sele.quantity)
               console.log(element.Quantity);

               var payLoad = {
                   Productid : element.Productid,
                   Quantity : element.Quantity
               };

                var data= oModel.update("/SIGNIWISSPORTSSet('" + element.Productid + "')", payLoad, {
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

            });

           }
       });
         debugger;
       accessories.forEach(element2=>{
           if(element.Productid === element2.Productid){
                console.log(element.Quantity);
              element.Quantity = Number(element.Quantity) - Number(product.quantity)
               console.log(element.Quantity);
 

             var   payLoad =  {
                 Productid : element2.Productid ,
                 Quantity : element2.Quantity
             }

                var data2= oModel.update("/AcessoriessSet('" + element2.Productid + "')", payLoad, {
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


            }
       });
         });
  
             
              

            // data update for accessarious


               

        },

        //                   Ticketing code
        oTicketPopUp: null,
        oTicketEvent: null,
        ptypes:[],
		onAddTicket: function (oEvent) {
              // debugger
			this.getView().byId("date").setValue(this.today);
			this.oTicketEvent = oEvent.getParameter("selectedItem").getText();
			if (this.oTicketEvent === "Ticketing") {
				if (!this.oTicketPopUp) {
					var oid = this.createId("fragTicketId");
					this.oTicketPopUp = new sap.ui.xmlfragment(oid, "SS.SigniwisSports1.view.ticket", this);
					this.getView().addDependent(this.oTicketPopUp);
					Fragment.byId(oid, "ticketDate").setValue(this.today);
				}
				this.oTicketPopUp.open();
            }
            
        },

		itemArray: [],
		onRaiseTicket: function () {
			var oid = this.createId("fragTicketId");
			var productName = Fragment.byId(oid, "ticketProduct").getValue();
            var productId = Fragment.byId(oid, "ticketProductId").getValue();
            var productType = Fragment.byId(oid, "ticketProductType").getValue();
			var quantity = Fragment.byId(oid, "ticketQuantity").getValue();
			if (productName === "" || productId === "") {
				MessageToast.show("Please select the Product");
			} else if(quantity === ""){
					MessageToast.show("Please Provide the quantity");
			}
			else {
				var ticketObject = {
					pName: productName,
                    pId: productId,
                    pType : productType,
					pQuantity: quantity,
					pImage: this.image,
					pStatus: "InProcess",
					status: "InProcess"
				};
				this.itemArray.push(ticketObject);
				var ticketData = {
					raiseTicket: this.itemArray
				};

				var model = new JSONModel(ticketData);
				this.getOwnerComponent().setModel(model, "ticketing");
				
					var oTable = this.getView().byId("ticketingTable");

			oTable.setVisible(true);
			oTable.setVisibleRowCount(this.itemArray.length);

				Fragment.byId(oid, "ticketProduct").setValue("");
				Fragment.byId(oid, "ticketProductId").setValue("");
				Fragment.byId(oid, "ticketQuantity").setValue("");
				this.onTicketClose();
			}
		},

		handleSearch: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter1 = new Filter("productname", FilterOperator.Contains, sValue);
			var oFilter2 = new Filter("Brand", FilterOperator.Contains, sValue);
			var oBinding = oEvent.getSource().getBinding("items");
			var oFilter = [oFilter1, oFilter2];
			oBinding.filter([oFilter]);
		},

		onTicketClose: function () {
			this.oTicketPopUp.close();

        },
        
        	oProductPopup: null,
		onTicketRequest: function () {
			if (!this.oProductPopup) {
				this.oProductPopup = new sap.m.SelectDialog({
					title: "ProductList",
					confirm: this.onTicketItemConfirm.bind(this),
					liveChange: this.handleSearch.bind(this)
				});
				this.getView().addDependent(this.oProductPopup);
				this.oProductPopup.bindAggregation("items", {
					path: "MainModel>/allProducts",
					template: new sap.m.ObjectListItem({
						title: "{MainModel>Productname}",
                        number: " INR {MainModel>Amount}",
                        numberState:"{=${MainModel>Quantity} > 25 ? 'Success' : ${MainModel>Quantity} > 10 ? 'Warning' : 'Error'}",
						numberUnit: "Quantity {MainModel>Quantity}",
                        icon: "{MainModel>Pimage}",
                         attributes:[
                       new sap.m.ObjectAttribute(
                       	{text:"{MainModel>Producttype}"}
                           ),
                            new sap.m.ObjectAttribute(
                       	{text:"{MainModel>Productid}"}
                           )
                      ],
					})
				});
			}
			this.oProductPopup.open();
		},
	
		onTicketItemConfirm: function (oEvent) {
          //  debugger
				var item = oEvent.getParameter("selectedItem");
				var oid = this.createId("fragTicketId");
                Fragment.byId(oid, "ticketProduct").setValue(item.getTitle());
                Fragment.byId(oid, "ticketPic").setSrc(item.getIcon());
                Fragment.byId(oid, "ticketProductId").setValue(item.getAttributes()[1].getText());
                Fragment.byId(oid, "ticketProductType").setValue(item.getAttributes()[0].getText());
				this.image = item.getIcon();
			//	console.log(Fragment.byId(oid, "ticketProductId").getValue());

            },
            onLogout:function(){
                	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteApp");
            this.getView().byId("userId").setValue("");
			this.getView().byId("userName").setValue("");
            }
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf SS.SigniwisSports.view.SalesLogin
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf SS.SigniwisSports.view.SalesLogin
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf SS.SigniwisSports.view.SalesLogin
		 */
		//	onExit: function() {
		//
		//	}

	});

});