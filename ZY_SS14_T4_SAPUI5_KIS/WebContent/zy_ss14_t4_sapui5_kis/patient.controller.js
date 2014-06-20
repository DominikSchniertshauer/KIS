sap.ui.controller("zy_ss14_t4_sapui5_kis.patient", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf zy_ss14_t4_sapui5_kis.patient
*/
	onInit: function() {
		
		
		
	},
	
	 open_create_dialog: function (){
		var patient_create_layout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});
		
		var patient_create_dialog = new sap.ui.commons.Dialog();
		var text = new sap.ui.commons.TextView({text: "Bitte geben Sie die Versichertennummer ein: "});
		var input = new sap.ui.commons.TextField();
		
		patient_create_dialog.setTitle("Erster Schritt");
		
		input.setValue("");
		input.setTooltip("Versicherungsnummer eingeben");
		//input.attachChange(function(){alert('Text changed to :'+ input.getValue());});

		patient_create_layout.createRow(text);
		patient_create_layout.createRow(input);
		patient_create_layout.createRow(new sap.ui.commons.Button({text: "OK", 
			
			press:function(){lookup_insnr(input.getValue());
							 patient_create_dialog.close();}}));

		
		patient_create_dialog.addContent(patient_create_layout);

		patient_create_dialog.open();
		
		function lookup_insnr(insnr) {
			
			var oModel = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);
			oModel.refreshSecurityToken(null, null);
			
			// Filtern nach Versichertennummer
			oModel.read("/PATIENT?$filter=Insurancenumber eq '"+insnr+"'" ,undefined, undefined, true,
					function(data, response){
				
			// Falls Versichertennummer existent --> Update Layout aufbauen	
				try {if (data.results[0].PatientID != ''){
					
					var internal_layout = new sap.ui.commons.layout.MatrixLayout({
						layoutFixed : false,
						});
					var internal_dialog = new sap.ui.commons.Dialog();

					// Dialog definieren und Felder mit Ergebniswerten füllen
					
					
					var firstname_label = new sap.ui.commons.Label({text: "Vorname: "});
					var firstname_input = new sap.ui.commons.TextField({}).setValue(data.results[0].Firstname);
					
					var lastname_label = new sap.ui.commons.Label({text: "Nachname: "});
					var lastname_input = new sap.ui.commons.TextField().setValue(data.results[0].Lastname);
					
					var insurancenumber_label = new sap.ui.commons.Label({text: "Versichertennummer: "});
					var insurancenumber_input = new sap.ui.commons.TextField().setValue(data.results[0].Insurancenumber);
					
					var postalcode_label = new sap.ui.commons.Label({text: "PLZ: "});
					var postalcode_input = new sap.ui.commons.TextField().setValue(data.results[0].Postalcode);
					
					var city_label = new sap.ui.commons.Label({text: "Stadt: "});
					var city_input = new sap.ui.commons.TextField().setValue(data.results[0].City);
					
					var street_label = new sap.ui.commons.Label({text: "Strasse: "});
					var street_input = new sap.ui.commons.TextField().setValue(data.results[0].Street);
					
					
					var country_label = new sap.ui.commons.Label({text: "Land: "});
					var country_input = new sap.ui.commons.TextField().setValue(data.results[0].Country);

					var update_button = new sap.ui.commons.Button({text: "Eingaben sichern" });

					internal_dialog.setTitle("Patient bereits vorhanden");

					internal_layout.createRow(firstname_label, firstname_input);
					internal_layout.createRow(lastname_label, lastname_input);
					internal_layout.createRow(insurancenumber_label, insurancenumber_input.setEditable(false));
					internal_layout.createRow(street_label, street_input);
					internal_layout.createRow(postalcode_label, postalcode_input);
					internal_layout.createRow(city_label, city_input);
					internal_layout.createRow(country_label, country_input);
					internal_layout.createRow(update_button);
					
					// Update ausführen, Daten aus TextFields übergeben
					update_button.attachPress(function(){
						
						// Übergabewerte für oModel.update Funktion
						var oEntry = {
						};	
						
						oEntry.Mandt = '001';
						oEntry.PatientID = data.results[0].PatientID;
						oEntry.Firstname = firstname_input.getValue();
						oEntry.Lastname = lastname_input.getValue();
						oEntry.Insurancenumber = insurancenumber_input.getValue();
						oEntry.Postalcode = postalcode_input.getValue();
						oEntry.City =  city_input.getValue();
						oEntry.Street =  street_input.getValue();
						oEntry.Country = country_input.getValue();
						
						var oParams = {};
					    oParams.fnSuccess = function(){ internal_dialog.close();};
					    oParams.fnError = function(){internal_dialog.open();};
					       
						
						oModel.update("/PATIENT(Mandt='001',PatientID="+data.results[0].PatientID+")", oEntry, oParams);
						});
					
					internal_dialog.addContent(internal_layout);
					
					internal_dialog.open();
					
				}} catch(e) {
					var internal_layout = new sap.ui.commons.layout.MatrixLayout({
						layoutFixed : false,
						});
					var internal_dialog = new sap.ui.commons.Dialog();

					// Dialog definieren und Felder mit Ergebniswerten füllen
					
					
					var firstname_label = new sap.ui.commons.Label({text: "Vorname: "});
					var firstname_input = new sap.ui.commons.TextField({});
					
					var lastname_label = new sap.ui.commons.Label({text: "Nachname: "});
					var lastname_input = new sap.ui.commons.TextField();
					
					var insurancenumber_label = new sap.ui.commons.Label({text: "Versichertennummer: "});
					var insurancenumber_input = new sap.ui.commons.TextField().setValue(insnr);
					
					var postalcode_label = new sap.ui.commons.Label({text: "PLZ: "});
					var postalcode_input = new sap.ui.commons.TextField();
					
					var city_label = new sap.ui.commons.Label({text: "Stadt: "});
					var city_input = new sap.ui.commons.TextField();
					
					var street_label = new sap.ui.commons.Label({text: "Strasse: "});
					var street_input = new sap.ui.commons.TextField();
					
					
					var country_label = new sap.ui.commons.Label({text: "Land: "});
					var country_input = new sap.ui.commons.TextField();

					var update_button = new sap.ui.commons.Button({text: "Eingaben sichern" });

					internal_dialog.setTitle("Patient neu anlegen");

					internal_layout.createRow(firstname_label, firstname_input);
					internal_layout.createRow(lastname_label, lastname_input);
					internal_layout.createRow(insurancenumber_label, insurancenumber_input.setEditable(false));
					internal_layout.createRow(street_label, street_input);
					internal_layout.createRow(postalcode_label, postalcode_input);
					internal_layout.createRow(city_label, city_input);
					internal_layout.createRow(country_label, country_input);
					internal_layout.createRow(update_button);
					
					// Update ausführen, Daten aus TextFields übergeben
					update_button.attachPress(function(){
						
						// Übergabewerte für oModel.update Funktion
						var oEntry = {
						};	
						
						oEntry.Mandt = '001';
						oEntry.PatientID = '1';
						oEntry.Firstname = firstname_input.getValue();
						oEntry.Lastname = lastname_input.getValue();
						oEntry.Insurancenumber = insurancenumber_input.getValue();
						oEntry.Postalcode = postalcode_input.getValue();
						oEntry.City =  city_input.getValue();
						oEntry.Street =  street_input.getValue();
						oEntry.Country = country_input.getValue();
						
						var oParams = {};
					    oParams.fnSuccess = function(){ internal_dialog.close();};
					    oParams.fnError = function(){internal_dialog.open();};
					       
						
						oModel.create("/PATIENT", oEntry, oParams);
					});
					
					internal_dialog.addContent(internal_layout);
					
					internal_dialog.open();
				}
				
				
			});
			
		}
	},
 
 
	
	
	patient_create: function(){
		
		
		
	},
	
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf zy_ss14_t4_sapui5_kis.patient
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf zy_ss14_t4_sapui5_kis.patient
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf zy_ss14_t4_sapui5_kis.patient
*/
//	onExit: function() {
//
//	}

});