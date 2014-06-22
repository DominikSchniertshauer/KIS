sap.ui.controller("zy_ss14_t4_sapui5_kis.hospitalization", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf zy_ss14_t4_sapui5_kis.hospitalization
*/
	onInit: function() {
	
	var oModel = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);
	sap.ui.getCore().setModel(oModel);
	},

	create_patient: function(insnr){
		
		var field;
		var fields = ["firstname", "lastname", "street", "postalcode", "city", "country"];

		if(insnr.length == 10){
			for(var i in fields){
				field = sap.ui.getCore().byId(fields[i]+"_input");
				field.setEditable(true);
			}
		}
		else{
			
			for(var i in fields){
				field = sap.ui.getCore().byId(fields[i]+"_input");
				field.setEditable(false);
			}
			
			alert("Versicherungsnummer muss 10 Zeichen haben");
			
		}
	},
	
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf zy_ss14_t4_sapui5_kis.hospitalization
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf zy_ss14_t4_sapui5_kis.hospitalization
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf zy_ss14_t4_sapui5_kis.hospitalization
*/
//	onExit: function() {
//
//	}

});