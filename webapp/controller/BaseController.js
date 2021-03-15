sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], 
function(Controller,JSONModel){
    return Controller.extend("SS.SigniwisSports1.controller.Base", {


        	onInit: function () {
        debugger

    
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
         
            
			// var date = new Date();
			// var day = date.getDate();
			// var month = date.getMonth();
			// var year = date.getFullYear();
			// this.today = (day + "/" + month + "/" + year);

			//  var carousel = this.getView().byId("carousel");
		    //        carousel.setLoop(true);
		    //        setTimeout(function() { carousel.next(); }, 2500);
		        //  this.changeImage();
                
		           
		           	//randon id 
			var orderVal = Math.floor(Math.random() * 12345);
            this.getView().byId("orderId").setValue(orderVal);

       

        
           
        },

        modelUpdate:function(){
            debugger
               var OData = null;
                    var that = this;
            var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZLKSIGNIWIS01_SRV/");
            var data=oModel.read("/SIGNIWISSPORTSSet", {
                success:function(data){
                   // alert("success");
                    OData= data.results;
                    console.log(data.results);  
                    that.productOData = OData; 
                    // set the model
                     that.masterData();  
                     that.onSelect(null);              
                },
                error:function(){
                    alert("error");
                }
            });

             oModel.read("/AcessoriessSet", {
                success:function(data){
                   // alert("success");
                    OData= data.results;
                    console.log(data.results);  
                    that.AcessoriessOData = OData; 
                    // set the model
                     that.AcessoriessData();  
                              
                },
                error:function(){
                    alert("error");
                }
            });

        },
        // accessaries data
          AcessoriessData:function(){
             this.AcessoriessOData.forEach((Element,index)=>{
          this.AcessoriessOData[index].Amount = parseInt(Element.Amount);
        });

         	var alldata={
			acessoriess:this.AcessoriessOData
		};
		
		var Model= new JSONModel(alldata);
        
         this.getOwnerComponent().setModel(Model,"AModel");
        },
        	//product code

	onSelect: function (event) {
         
        // debugger
        if(event !== null){
            var path= event.getSource()._aSelectedPaths;
           path = path[0];
           path= this.getOwnerComponent().getModel("Model1").getProperty(path).productName;
       }
       else{
           path='CYCLES';
       }
            var OData=null;
            var that = this;
             var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZLKSIGNIWIS01_SRV/");
         var data2=oModel.read("/ProductsByCategory?PRODUCTTYPE='"+path+"'", {
                success:function(data){
                   // alert("success");
                    OData= data.results;
                    console.log(data.results);  
                    that.detailData(data.results);                 
                },
                error:function(){
                    alert("error in selecting item");
                }
            });

    },
    detailData:function(obj){
       // debugger
          obj.forEach((Element,index)=>{
          obj[index].Amount = parseInt(Element.Amount);
           obj[index].Quantity = parseInt(Element.Quantity);
        });
        
          	var mydata={
			productList:obj
		};
		
		var Model= new JSONModel(mydata);
        
         this.getOwnerComponent().setModel(Model,"Model2")
             var list = this.getView().byId("objectList");
             
			if(list){
			var oPath =  "Model2>/productList";
			list.bindItems(oPath, new sap.m.ObjectListItem({
					intro: "{Model2>Productname}",
					icon: "{Model2>Pimage}",
                    number: "INR {Model2>Amount}",
                    numberState:"{=${Model2>Quantity} > 25 ? 'Success' : ${Model2>Quantity} > 5 ? 'Warning' : 'Error'}",        
					title: "{Model2>Brand}",
					type: "Active",
					 attributes:[
                       new sap.m.ObjectAttribute(
                       	{text:"{Model2>Productid}"}
                           )
                      ],
                 firstStatus:[
                       new sap.m.ObjectStatus({
                         
                         text:"Quantity : {Model2>Quantity}",
                          state:"{=${Model2>Quantity} > 25 ? 'Success' : ${Model2>Quantity} > 5 ? 'Warning' : 'Error'}"      
                        
                       })
                       ],
                          secondStatus:[
                       new sap.m.ObjectStatus({
                         
                         text:"{=${Model2>Quantity} > 25 ? 'Available' : ${Model2>Quantity} > 5 ? 'Low' : 'outOfStock'}",
                          state:"{=${Model2>Quantity} > 25 ? 'Success' : ${Model2>Quantity} > 5 ? 'Warning' : 'Error'}"      
                        
                       })
                       ]
			}
				)
            );
        }
        
    },
     data :[],
     ptypes:[],
        masterData:function(){
//    debugger;
               this.productOData.forEach(element=> this.data.push(element.Producttype))
               this.data =[... new Set(this.data)];

               this.data.forEach(element=>{
                  
                   this.ptypes.push({productName:element})
               });

               	var mydata={
			productTypes:this.ptypes
		};
		
		var Model= new JSONModel(mydata);
        
         this.getOwnerComponent().setModel(Model,"Model1");

        this.productOData.forEach((Element,index)=>{
          this.productOData[index].Amount = parseInt(Element.Amount);
           this.productOData[index].Quantity = parseInt(Element.Quantity);

           if(Element.Amount === 0){
              this.productOData[index].Amount = "Coming Soon ..."; 
              this.productOData[index].Quantity= 0;
           }
        });

          	var alldata={
			allProducts:this.productOData
		};
		
		var Model= new JSONModel(alldata);
        
         this.getOwnerComponent().setModel(Model,"MainModel");



     
        },
    });
});