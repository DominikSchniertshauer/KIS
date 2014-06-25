sap.ui.controller("zy_ss14_t4_sapui5_kis.disease", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf zy_ss14_t4_sapui5_kis.disease
*/
	onInit: function() {

	},
	
	/**
	 *  Create popups for create and update for disease
	 */
	open_create_dialog: function (){
		var disease_layout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});
		var disease_dialog = new sap.ui.commons.Dialog();
		var oModel = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);

		/**
		* Define fields and a button to insert a disease 
		*/
		var name_label = new sap.ui.commons.Label({text: "Krankheit: "});
		var name_input = new sap.ui.commons.TextField({});
		
		var description_label = new sap.ui.commons.Label({text: "Symptome "});
		var description_input = new sap.ui.commons.TextField({});
		
		var create_button = new sap.ui.commons.Button({text: "Krankheit anlegen" });

		disease_dialog.setTitle("Neue Krankheit anlegen");

		disease_layout.createRow(name_label, name_input);
		disease_layout.createRow(description_label, description_input);
		disease_layout.createRow(create_button);
		
		
		// Update ausführen, Daten aus TextFields übergeben
		create_button.attachPress(function(){
			
		// Übergabewerte für oModel.update Funktion
		var oEntry = {};	
			
			oEntry.Mandt 		= '001';
			//oEntry.MedicationID = '1';
			oEntry.Name 		= name_input.getValue();
			oEntry.Description	= description_input.getValue();
			oEntry.Isactive 	= 'TRUE';
			
			
			var oParams = {};
		    oParams.fnSuccess = function(){ 
		    	
		    	disease_dialog.close(); 		
		    	

		    
		    };
		    oParams.fnError = function(){disease_dialog.open();};
		       
			
		    
            oModel.create("/CONDITN", oEntry, oParams.fnSuccess(), oParams.fnError());
            var disease_table = sap.ui.getCore().byId("tblDisease");
			disease_table.bindRows('/CONDITN'); 

		});

		disease_dialog.addContent(disease_layout);
		
		disease_dialog.open();
	}, 
	
	open_update_dialog: function(data) {
		var disease_layout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});
		var disease_dialog = new sap.ui.commons.Dialog();
		var oModel = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);

		/**
		* Define fields and a button to insert a disease  
		*/
		var name_label = new sap.ui.commons.Label({text: "Krankheit: "});
		var name_input = new sap.ui.commons.TextField({}).setValue(data['Name']);
		name_input.setEditable(false);
		
		var description_label = new sap.ui.commons.Label({text: "Symptome "});
		var description_input = new sap.ui.commons.TextField({}).setValue(data['Description']);
		
		var update_button = new sap.ui.commons.Button({text: "Krankheit aktualisieren" });

		disease_dialog.setTitle("Existierende Krankheit aktualisieren");

		disease_layout.createRow(name_label, name_input);
		disease_layout.createRow(description_label, description_input);
		disease_layout.createRow(update_button);
		
		update_button.attachPress(function(){
			
			// Übergabewerte für oModel.update Funktion
			var oEntry = {};	
				
				oEntry.Mandt 		= '001';
				oEntry.ConditionID = data['ConditionID'];
				oEntry.Name 		= name_input.getValue();
				oEntry.Description	= description_input.getValue();
				oEntry.Isactive		= 'TRUE';
				
				
				var oParams = {};
			    oParams.fnSuccess = function(){ 
			    	
			    	disease_dialog.close(); 		
	
			    };
			    oParams.fnError = function(){disease_dialog.open();};
			       
				
				//oModel.update("/MEDICTN", oEntry, null, oParams.fnSuccess(), oParams.fnError());
				oModel.update("/CONDITN(Mandt='001',ConditionID="+data['ConditionID']+")", oEntry, oParams);
				var disease_table = sap.ui.getCore().byId("tblDisease");
				disease_table.bindRows('/CONDITN'); 

			});		


		disease_dialog.addContent(disease_layout);
		
		disease_dialog.open();
	}

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf zy_ss14_t4_sapui5_kis.disease
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf zy_ss14_t4_sapui5_kis.disease
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf zy_ss14_t4_sapui5_kis.disease
*/
//	onExit: function() {
//
//	}

});