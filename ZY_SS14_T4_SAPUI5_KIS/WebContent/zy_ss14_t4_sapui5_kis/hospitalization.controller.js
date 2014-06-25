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

	
	check_conditn_exists: function(name){
		
		var oModel = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);

		var field;
		var oEntry = {
		};	
		
			oModel.read("/CONDITN?$filter=Name eq '"+name+"'" ,undefined, undefined, true,
					function(data, response){
				
				try{
					if (data.results[0].ConditionID != ''){
								
				
					}
				} catch(e) {
					alert("neu anlegen dude");
				}
						
						
					
						var oParams = {};
					    oParams.fnSuccess = function(){ internal_dialog.close();};
					    oParams.fnError = function(){internal_dialog.open();};
					       
		
				
			});
			 },
	
	lock_patient: function(fields){
	var field;	
	var fields_filled = true;
	
	var text = sap.ui.getCore().byId("Patient_lock_button").getText();

	if(text == "Daten pruefen."){
		for(var i in fields){
			field = sap.ui.getCore().byId(fields[i]+"_input");
			if(field.getValue() == ""){
				fields_filled = false;
				var label = sap.ui.getCore().byId("Patient_lock_label");
				label.setText("");

			}
		}
		if(!fields_filled)
			alert("Bitte alle Felder ausfuellen.");
		else{
			var button = sap.ui.getCore().byId("Patient_lock_button");
			button.setStyle(sap.ui.commons.ButtonStyle.Accept);
			button.setIcon("sap-icon://accept");
			button.setText("Daten korrekt.");
			
			for(var i in fields){
				field = sap.ui.getCore().byId(fields[i]+"_input");
				field.setEnabled(false);
			}
			field = sap.ui.getCore().byId("Insurancenumber_input");
			field.setEnabled(false);
				
		}
		fixed = true;

	} else{
		
		for(var i in fields){
			field = sap.ui.getCore().byId(fields[i]+"_input");
			field.setEnabled(true);
		}
		
		field = sap.ui.getCore().byId("Insurancenumber_input");
		field.setEnabled(true);
		
		var button = sap.ui.getCore().byId("Patient_lock_button");
		button.setStyle(null);
		button.setIcon("");
		button.setText("Daten pruefen.");
		fixed = false;

	}			
				
		
		
	},
	
	create_patient: function(insnr, fields){
		var oModel = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);

		var field;
		var oEntry = {
		};	
		
		if(insnr.length == 10){
			
			oModel.read("/PATIENT?$filter=Insurancenumber eq '"+insnr+"'" ,undefined, undefined, true,
					function(data, response){
				
				try {
					if (data.results[0].PatientID != ''){
					
					for(var i in fields){
						field = sap.ui.getCore().byId(fields[i]+"_input");
						field.setEditable(true);
						
						if(fields[i] == 'Firstname'){
							field.setValue(data.results[0].Firstname);
//							oEntry.Firstname = field.getValue();
						}
						
						if(fields[i] == 'Lastname'){
							field.setValue(data.results[0].Lastname);
//							oEntry.Lastname = field.getValue();
						}
						
						if(fields[i] == 'Street'){
							field.setValue(data.results[0].Street);
//							oEntry.Street = field.getValue();
						}
						if(fields[i] == 'Postalcode'){
							field.setValue(data.results[0].Postalcode);
//							oEntry.City = field.getValue();
						}
						if(fields[i] == 'City'){
							field.setValue(data.results[0].City);
//							oEntry.City = field.getValue();
						}
						if(fields[i] == 'Country'){
							field.setValue(data.results[0].Country);
//							oEntry.City = field.getValue();
						}
						
						}
						
					}

						
						
					
						var oParams = {};
					    oParams.fnSuccess = function(){ internal_dialog.close();};
					    oParams.fnError = function(){internal_dialog.open();};
					       
						
						
					
			
					
				} catch(e) {

					for(var i in fields){
						field = sap.ui.getCore().byId(fields[i]+"_input");
						field.setEditable(true);
						field.setValue("");
						
						
						}
				
						var oEntry = {
						};	
												
						var oParams = {};
					    oParams.fnSuccess = function(){ internal_dialog.close();};
					    oParams.fnError = function(){internal_dialog.open();};	
				
				}
				
			});
			
		
		}
		else{
			
			for(var i in fields){
				field = sap.ui.getCore().byId(fields[i]+"_input");
				field.setValue("");
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