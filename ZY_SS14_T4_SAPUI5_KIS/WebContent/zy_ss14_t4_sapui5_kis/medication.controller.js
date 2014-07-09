sap.ui.controller("zy_ss14_t4_sapui5_kis.medication", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf zy_ss14_t4_sapui5_kis.medication
*/
	onInit: function() {

	},
	
	/**
	 *  Create popups for create and update for medication
	 */
	open_create_dialog: function (){
		var medication_layout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});
		var medication_dialog = new sap.ui.commons.Dialog();
		var oModel = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);

		/**
		* Define fields and a button to insert a medication  
		*/
		var name_label = new sap.ui.commons.Label({text: "Medikament: "});
		var name_input = new sap.ui.commons.TextField({});
		
		var description_label = new sap.ui.commons.Label({text: "Symptome "});
		var description_input = new sap.ui.commons.TextField({});
		
		var create_button = new sap.ui.commons.Button({text: "Medikament anlegen" });

		medication_dialog.setTitle("Neues Medikament anlegen");

		medication_layout.createRow(name_label, name_input);
		medication_layout.createRow(description_label, description_input);
		medication_layout.createRow(create_button);
		
		
		// Update ausf�hren, Daten aus TextFields �bergeben
		create_button.attachPress(function(){
			
		// �bergabewerte f�r oModel.update Funktion
		var oEntry = {};	
			
			oEntry.Mandt 		= '001';
			//oEntry.MedicationID = '1';
			oEntry.Name 		= name_input.getValue();
			oEntry.Description	= description_input.getValue();
			oEntry.Isactive 	= 'TRUE';
			
			
			var oParams = {};
		    oParams.fnSuccess = function(){ 
		    	
		    	medication_dialog.close(); 		
		    	
		    };
		    oParams.fnError = function(data, response){
		    	
		    	sap.ui.commons.MessageBox.alert(response);

		    	medication_dialog.open()
		    	;};
		       
			
		    
            oModel.create("/MEDICTN", oEntry, oParams.fnSuccess(), oParams.fnError());

            var medication_table = sap.ui.getCore().byId("tblMedication");
			medication_table.bindRows('/MEDICTN'); 

		});

		medication_dialog.addContent(medication_layout);
		
		medication_dialog.open();
	}, 
	
	open_update_dialog: function(data) {
		var medication_layout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});
		var medication_dialog = new sap.ui.commons.Dialog();
		var oModel = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);

		/**
		* Define fields and a button to insert a medication  
		*/
		var name_label = new sap.ui.commons.Label({text: "Medikament: "});
		var name_input = new sap.ui.commons.TextField({}).setValue(data['Name']);
		name_input.setEditable(false);
		
		var description_label = new sap.ui.commons.Label({text: "Symptome "});
		var description_input = new sap.ui.commons.TextField({}).setValue(data['Description']);
		
		var update_button = new sap.ui.commons.Button({text: "Medikament aktualisieren" });

		medication_dialog.setTitle("Existierendes Medikament aktualisieren");

		medication_layout.createRow(name_label, name_input);
		medication_layout.createRow(description_label, description_input);
		medication_layout.createRow(update_button);
		
		update_button.attachPress(function(){
			
			// �bergabewerte f�r oModel.update Funktion
			var oEntry = {};	
				
				oEntry.Mandt 		= '001';
				oEntry.MedicationID = data['MedicationID'];
				oEntry.Name 		= name_input.getValue();
				oEntry.Description	= description_input.getValue();
				oEntry.Isactive		= 'TRUE';
				
				
				var oParams = {};
			    oParams.fnSuccess = function(){ 
			    	
			    	medication_dialog.close(); 		
			    	
 
			    
			    };
			    oParams.fnError = function(){medication_dialog.open();};
			       
				
				//oModel.update("/MEDICTN", oEntry, null, oParams.fnSuccess(), oParams.fnError());
				oModel.update("/MEDICTN(Mandt='001',MedicationID="+data['MedicationID']+")", oEntry, oParams);
				
				var medication_table = sap.ui.getCore().byId("tblMedication");
				medication_table.bindRows('/MEDICTN'); 

			});		


		medication_dialog.addContent(medication_layout);
		
		medication_dialog.open();
	}

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf zy_ss14_t4_sapui5_kis.medication
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf zy_ss14_t4_sapui5_kis.medication
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf zy_ss14_t4_sapui5_kis.medication
*/
//	onExit: function() {
//
//	}

	
	
});