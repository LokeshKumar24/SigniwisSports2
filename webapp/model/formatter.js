sap.ui.define([
"sap/m/MessageToast"
],
function(MessageToast){ 
    return {
convertToNumber:function(value){
    return parseInt(value);
},
quantityState:function(value){
    debugger
    	if (value > 50) {
				return "Success";
			} else if (value <= 50 && value < 25) {
				return "None";
			} else if (value < 25 && value > 5) {
				return "Warning";
			} else {
				return "Error";
			}
}
    }
});