sap.ui.jsview("zy_ss14_t4_sapui5_kis.patient", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zy_ss14_t4_sapui5_kis.patient
	*/ 
	getControllerName : function() {
		return "zy_ss14_t4_sapui5_kis.patient";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zy_ss14_t4_sapui5_kis.patient
	*/ 
	
	createContent : function(oController) {
		var layout = new sap.ui.commons.layout.MatrixLayout({
			id : 'patient_layout',
			layoutFixed : false,
			});
	
	
		
		var header_label = new sap.ui.commons.Label("patient_header",{text: "Patientendaten"});
		header_label.setDesign(sap.ui.commons.LabelDesign.Bold);

		var line_divider = new sap.ui.commons.HorizontalDivider("patient_divider");
	
		layout.createRow(header_label);
		layout.createRow(line_divider);
	
		var panel = new sap.ui.commons.Panel('rPannel');              
		var title = new sap.ui.commons.Title('rTitle');     
		title.setText('Liste von allen Patienten');     
		panel.setTitle(title);    
		

		
		
	
		
		function open_create_dialog() {
	
		};
	
		var create_button = new sap.ui.commons.Button("patient_create", {
	        text : "Neuen Patienten anlegen",
	        icon : "sap-icon://wounds-doc",
	        press : function() {oController.open_create_dialog();
			}
	    	
		});
		
		var update_button = new sap.ui.commons.Button("patient_update", {
	        text : "Patientendaten aktualisieren",
	        icon : "sap-icon://activity-individual",
	        press : function() {;}
		});
		
		
		/**
		* Create Toolbar 
		*/

		var oToolbar = new sap.ui.commons.Toolbar("tb");
		
		oToolbar.setStandalone(false);
		oToolbar.setDesign(sap.ui.commons.ToolbarDesign.Flat);	
		oToolbar.setWidth("500px");
		
		oToolbar.addItem(create_button);
		oToolbar.addItem(update_button);
		
		layout.createRow(oToolbar);
		
		var patient_table = new sap.ui.table.Table();  
		patient_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Vorname"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Firstname"),  
		          sortProperty: "Firstname"  
		}));  
		
		patient_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Familienname"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Lastname"),  
		          sortProperty: "Lastname"  
		}));  
		
		patient_table.addColumn(  
			     new sap.ui.table.Column({  
			          label: new sap.ui.commons.Label({text: "Versicherungsnummer"}),  
			          template: new sap.ui.commons.TextField().bindProperty("value", "Insurancenumber"),  
			          sortProperty: "Insurancenumber"  
			})); 
		
		patient_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Strasse"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Street"),  
		          sortProperty: "Street"  
		}));  
  
		patient_table.addColumn(  
			     new sap.ui.table.Column({  
			          label: new sap.ui.commons.Label({text: "Postleitzahl"}),  
			          template: new sap.ui.commons.TextField().bindProperty("value", "Postalcode"),  
			          sortProperty: "Postalcode"  
			})); 
		
		patient_table.addColumn(  
			     new sap.ui.table.Column({  
			          label: new sap.ui.commons.Label({text: "Stadt"}),  
			          template: new sap.ui.commons.TextField().bindProperty("value", "City"),  
			          sortProperty: "City"  
			})); 
		
		patient_table.addColumn(  
			     new sap.ui.table.Column({  
			          label: new sap.ui.commons.Label({text: "Land"}),  
			          template: new sap.ui.commons.TextField().bindProperty("value", "Country"),  
			          sortProperty: "Country"  
			})); 
		
		var oModel = new sap.ui.model.odata.ODataModel(  
				sap.ui.getCore().byId("path").getText(),  
		                                                  false);  
		
		patient_table.setModel(oModel);  
		patient_table.bindRows('/PATIENT');  
		
		panel.addContent(patient_table);    
		layout.createRow(panel);  
		
		return layout;  
		
//		 function open_create_dialog (){
//				var patient_create_layout = new sap.ui.commons.layout.MatrixLayout({
//					layoutFixed : false,
//					});
//				
//				var patient_create_dialog = new sap.ui.commons.Dialog();
//				var text = new sap.ui.commons.TextView({text: "Bitte geben Sie die Versichertennummer ein: "});
//				var input = new sap.ui.commons.TextField();
//				
//				patient_create_dialog.setTitle("Erster Schritt");
//				
//				input.setValue("");
//				input.setTooltip("Versicherungsnummer eingeben");
//				//input.attachChange(function(){alert('Text changed to :'+ input.getValue());});
//		
//				patient_create_layout.createRow(text);
//				patient_create_layout.createRow(input);
//				patient_create_layout.createRow(new sap.ui.commons.Button({text: "OK", 
//					
//					press:function(){lookup_insnr(input.getValue());
//									 patient_create_dialog.close();}}));
//		
//				
//				patient_create_dialog.addContent(patient_create_layout);
//		
//				patient_create_dialog.open();
//			}
//		 
//		 function lookup_insnr(insnr) {
//				
//				var oModel = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);
//				oModel.refreshSecurityToken(null, null);
//				
//				// Filtern nach Versichertennummer
//				oModel.read("/PATIENT?$filter=Insurancenumber eq '"+insnr+"'" ,undefined, undefined, true,
//						function(data, response){
//					
//				// Falls Versichertennummer existent --> Update Layout aufbauen	
//					try {if (data.results[0].PatientID != ''){
//						
//						var internal_layout = new sap.ui.commons.layout.MatrixLayout({
//							layoutFixed : false,
//							});
//						var internal_dialog = new sap.ui.commons.Dialog();
//
//						// Dialog definieren und Felder mit Ergebniswerten füllen
//						
//						
//						var firstname_label = new sap.ui.commons.Label({text: "Vorname: "});
//						var firstname_input = new sap.ui.commons.TextField({}).setValue(data.results[0].Firstname);
//						
//						var lastname_label = new sap.ui.commons.Label({text: "Nachname: "});
//						var lastname_input = new sap.ui.commons.TextField().setValue(data.results[0].Lastname);
//						
//						var insurancenumber_label = new sap.ui.commons.Label({text: "Versichertennummer: "});
//						var insurancenumber_input = new sap.ui.commons.TextField().setValue(data.results[0].Insurancenumber);
//						
//						var postalcode_label = new sap.ui.commons.Label({text: "PLZ: "});
//						var postalcode_input = new sap.ui.commons.TextField().setValue(data.results[0].Postalcode);
//						
//						var city_label = new sap.ui.commons.Label({text: "Stadt: "});
//						var city_input = new sap.ui.commons.TextField().setValue(data.results[0].City);
//						
//						var street_label = new sap.ui.commons.Label({text: "Strasse: "});
//						var street_input = new sap.ui.commons.TextField().setValue(data.results[0].Street);
//						
//						
//						var country_label = new sap.ui.commons.Label({text: "Land: "});
//						var country_input = new sap.ui.commons.TextField().setValue(data.results[0].Country);
//
//						var update_button = new sap.ui.commons.Button({text: "Eingaben sichern" });
//
//						internal_dialog.setTitle("Patient bereits vorhanden");
//	
//						internal_layout.createRow(firstname_label, firstname_input);
//						internal_layout.createRow(lastname_label, lastname_input);
//						internal_layout.createRow(insurancenumber_label, insurancenumber_input.setEditable(false));
//						internal_layout.createRow(street_label, street_input);
//						internal_layout.createRow(postalcode_label, postalcode_input);
//						internal_layout.createRow(city_label, city_input);
//						internal_layout.createRow(country_label, country_input);
//						internal_layout.createRow(update_button);
//						
//						// Update ausführen, Daten aus TextFields übergeben
//						update_button.attachPress(function(){
//							
//							// Übergabewerte für oModel.update Funktion
//							var oEntry = {
//							};	
//							
//							oEntry.Mandt = '001';
//							oEntry.PatientID = data.results[0].PatientID;
//							oEntry.Firstname = firstname_input.getValue();
//							oEntry.Lastname = lastname_input.getValue();
//							oEntry.Insurancenumber = insurancenumber_input.getValue();
//							oEntry.Postalcode = postalcode_input.getValue();
//							oEntry.City =  city_input.getValue();
//							oEntry.Street =  street_input.getValue();
//							oEntry.Country = country_input.getValue();
//							
//							var oParams = {};
//						    oParams.fnSuccess = function(){ internal_dialog.close();};
//						    oParams.fnError = function(){internal_dialog.open();};
//						       
//							
//							oModel.update("/PATIENT(Mandt='001',PatientID="+data.results[0].PatientID+")", oEntry, oParams);
//							});
//						
//						internal_dialog.addContent(internal_layout);
//						
//						internal_dialog.open();
//						
//					}} catch(e) {
//						var internal_layout = new sap.ui.commons.layout.MatrixLayout({
//							layoutFixed : false,
//							});
//						var internal_dialog = new sap.ui.commons.Dialog();
//
//						// Dialog definieren und Felder mit Ergebniswerten füllen
//						
//						
//						var firstname_label = new sap.ui.commons.Label({text: "Vorname: "});
//						var firstname_input = new sap.ui.commons.TextField({});
//						
//						var lastname_label = new sap.ui.commons.Label({text: "Nachname: "});
//						var lastname_input = new sap.ui.commons.TextField();
//						
//						var insurancenumber_label = new sap.ui.commons.Label({text: "Versichertennummer: "});
//						var insurancenumber_input = new sap.ui.commons.TextField().setValue(insnr);
//						
//						var postalcode_label = new sap.ui.commons.Label({text: "PLZ: "});
//						var postalcode_input = new sap.ui.commons.TextField();
//						
//						var city_label = new sap.ui.commons.Label({text: "Stadt: "});
//						var city_input = new sap.ui.commons.TextField();
//						
//						var street_label = new sap.ui.commons.Label({text: "Strasse: "});
//						var street_input = new sap.ui.commons.TextField();
//						
//						
//						var country_label = new sap.ui.commons.Label({text: "Land: "});
//						var country_input = new sap.ui.commons.TextField();
//
//						var update_button = new sap.ui.commons.Button({text: "Eingaben sichern" });
//
//						internal_dialog.setTitle("Patient neu anlegen");
//	
//						internal_layout.createRow(firstname_label, firstname_input);
//						internal_layout.createRow(lastname_label, lastname_input);
//						internal_layout.createRow(insurancenumber_label, insurancenumber_input.setEditable(false));
//						internal_layout.createRow(street_label, street_input);
//						internal_layout.createRow(postalcode_label, postalcode_input);
//						internal_layout.createRow(city_label, city_input);
//						internal_layout.createRow(country_label, country_input);
//						internal_layout.createRow(update_button);
//						
//						// Update ausführen, Daten aus TextFields übergeben
//						update_button.attachPress(function(){
//							
//							// Übergabewerte für oModel.update Funktion
//							var oEntry = {
//							};	
//							
//							oEntry.Mandt = '001';
//							oEntry.PatientID = '1';
//							oEntry.Firstname = firstname_input.getValue();
//							oEntry.Lastname = lastname_input.getValue();
//							oEntry.Insurancenumber = insurancenumber_input.getValue();
//							oEntry.Postalcode = postalcode_input.getValue();
//							oEntry.City =  city_input.getValue();
//							oEntry.Street =  street_input.getValue();
//							oEntry.Country = country_input.getValue();
//							
//							var oParams = {};
//						    oParams.fnSuccess = function(){ internal_dialog.close();};
//						    oParams.fnError = function(){internal_dialog.open();};
//						       
//							
//							oModel.create("/PATIENT", oEntry, oParams);
//						});
//						
//						internal_dialog.addContent(internal_layout);
//						
//						internal_dialog.open();
//					}
//					
//					
//				});
//				
//			}
	},

	
		
		
	
});
