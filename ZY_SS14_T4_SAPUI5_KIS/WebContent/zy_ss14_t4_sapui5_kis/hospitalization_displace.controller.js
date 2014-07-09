sap.ui.controller("zy_ss14_t4_sapui5_kis.hospitalization_displace", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf zy_ss14_t4_sapui5_kis.hospitalization_displace
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf zy_ss14_t4_sapui5_kis.hospitalization_displace
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf zy_ss14_t4_sapui5_kis.hospitalization_displace
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf zy_ss14_t4_sapui5_kis.hospitalization_displace
*/
//	onExit: function() {
//
//	}
	
	get_patient: function(insnr, fields){
		var oModel = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);

		var field;
		var tmpPatientID = null;
		var oEntry = {
		};	
		
		if(insnr.length == 10){
		
			oModel.read("/PATIENT?$filter=Insurancenumber eq '"+insnr+"'" ,undefined, undefined, true,
					function(data, response){
			
				try {
					if (data.results[0].PatientID != ''){
						
						for(var i in fields){
							field = sap.ui.getCore().byId(fields[i]+"_input");
							field.setEditable(false);
						
							if(fields[i] == 'Fname'){
								field.setValue(data.results[0].Firstname);
//								oEntry.Firstname = field.getValue();
							}	
						
							if(fields[i] == 'Lname'){
								field.setValue(data.results[0].Lastname);
//								oEntry.Lastname = field.getValue();
							}
							
						
						}
						tmpPatientID = data.results[0].PatientID;
						alert(tmpPatientID);
					}
					
				} catch(e) {
					
				};
				
				
			});
			
			return tmpPatientID;
		}
	},
	
	displace_patient : function (patientID) {
		
		alert(patientID);
	}

});