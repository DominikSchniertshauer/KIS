sap.ui.controller("zy_ss14_t4_sapui5_kis.index", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf zy_ss14_t4_sapui5_kis.index
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf zy_ss14_t4_sapui5_kis.index
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf zy_ss14_t4_sapui5_kis.index
*/
//	onAfterRendering: function() {
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf zy_ss14_t4_sapui5_kis.index
*/
//	onExit: function() {
//
//	}
	
	show_patientInfo_dialog: function (data){
		var patientInfo_layout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});
		var patientInfo_dialog = new sap.ui.commons.Dialog();
		var oModel = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);
		
	
		/**
		*  Create Panels
		*/
		var patient_panel_pop = new sap.ui.commons.Panel();
		patient_panel_pop.setTitle(new sap.ui.core.Title({text: "Informationen zum Patienten",icon : "sap-icon://wounds-doc"}));
		
		
		var oModel = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);
		oModel.refreshSecurityToken(null, null);
		
		// Filtern nach Versichertennummer
		oModel.read("/PATIENT(Mandt='001',PatientID="+data['PatientID']+")" ,undefined, undefined, true,
				function(dataPatient, response){
		
		
				var firstname_label = new sap.ui.commons.Label({text: "Vorname: "});
				var firstname_input = new sap.ui.commons.TextField({}).setValue(dataPatient['Firstname']);
				firstname_input.setEditable(false);
				
				var lastname_label = new sap.ui.commons.Label({text: "Nachname: "});
				var lastname_input = new sap.ui.commons.TextField().setValue(dataPatient['Lastname']);
				lastname_input.setEditable(false);
				
				var insurancenumber_label = new sap.ui.commons.Label({text: "Versichertennummer: "});
				var insurancenumber_input = new sap.ui.commons.TextField().setValue(dataPatient['Insurancenumber']);
				insurancenumber_input.setEditable(false);
				
				var postalcode_label = new sap.ui.commons.Label({text: "PLZ: "});
				var postalcode_input = new sap.ui.commons.TextField().setValue(dataPatient['Postalcode']);
				postalcode_input.setEditable(false);
				
				var city_label = new sap.ui.commons.Label({text: "Stadt: "});
				var city_input = new sap.ui.commons.TextField().setValue(dataPatient['City']);
				city_input.setEditable(false);
				
				var street_label = new sap.ui.commons.Label({text: "Strasse: "});
				var street_input = new sap.ui.commons.TextField().setValue(dataPatient['Street']);
				street_input.setEditable(false);
				
				
				var country_label = new sap.ui.commons.Label({text: "Land: "});
				var country_input = new sap.ui.commons.TextField().setValue(dataPatient['Country']);
				country_input.setEditable(false);
		
				var patient_panel_pop_layout = new sap.ui.commons.layout.MatrixLayout({
					layoutFixed : false,
					});
				
				patient_panel_pop_layout.createRow(insurancenumber_label, insurancenumber_input);
				patient_panel_pop_layout.createRow(firstname_label, firstname_input, lastname_label, lastname_input);
				patient_panel_pop_layout.createRow(street_label, street_input, postalcode_label, postalcode_input);
				patient_panel_pop_layout.createRow(city_label, city_input, country_label, country_input);

				patient_panel_pop.addContent(patient_panel_pop_layout);
		});

		
		

		
		
		
		var medicationstay_panel_pop = new sap.ui.commons.Panel();
		medicationstay_panel_pop.setTitle(new sap.ui.core.Title({text: "Informationen zum Krankenhausaufenthalt"}));
		
		var disease_label = new sap.ui.commons.Label({text: "Krankheit: "});
		var disease_input = new sap.ui.commons.TextField({}).setValue(data['Disease']).setWidth("370px");
		disease_input.setEditable(false);
		
		var disease_plan_label = new sap.ui.commons.Label({text: "Behandlungsplan: "});
		var disease_plan_input = new sap.ui.commons.TextField({}).setValue(data['Treatmentplan']).setWidth("370px");
		disease_plan_input.setEditable(false);
		
	
		var	floor_label = new sap.ui.commons.Label({text: "Etage: "});
		var floor_input = new sap.ui.commons.TextField({}).setValue(data['Floor']).setWidth("370px");;
		floor_input.setEditable(false);
		
		var	room_label = new sap.ui.commons.Label({text: "Zimmer: "});
		var room_input = new sap.ui.commons.TextField({}).setValue(data['RoomID']).setWidth("370px");;
		room_input.setEditable(false);
		 /**
		 * Create table to display all available treatment
		 */
		var disease_plan_medi_table = new sap.ui.table.Table({
			title: "Zu verabreichende Medikamente",
			width: "480px",
			visibleRowCount: 4,
		});  
		disease_plan_medi_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Medikament"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "MedicationName"),  
		          sortProperty: "MedicationName"  
		}));  
		
		disease_plan_medi_table.addColumn(  
			     new sap.ui.table.Column({  
			          label: new sap.ui.commons.Label({text: "Beschreibung"}),  
			          template: new sap.ui.commons.TextField().bindProperty("value", "Description"),  
			          sortProperty: "Description"  
			})); 
		disease_plan_medi_table.addColumn(  
			     new sap.ui.table.Column({  
			          label: new sap.ui.commons.Label({text: "Verabreichungsinterval (Stunden)"}),  
			          template: new sap.ui.commons.TextField().bindProperty("value", "AdministrationInterval"),  
			          sortProperty: "AdministrationInterval"  
			})); 
		
		var oModel = new sap.ui.model.odata.ODataModel(  
				sap.ui.getCore().byId("path").getText(), false);  
		
		disease_plan_medi_table.setModel(oModel);  
		disease_plan_medi_table.bindRows("/TREMD?$filter=TreatPlanID eq "+data['TreatPlanID']+" "); 
		
		/**
		 * Show all person
		 */
		
		var user_temp_table = new sap.ui.table.Table({ 
			title: "Zugeordnetes Personal",
			selectionMode: sap.ui.table.SelectionMode.Single,
			width: "480px",
			visibleRowCount: 4,
		});
		
		user_temp_table.addColumn(  
		new sap.ui.table.Column({  
		label: new sap.ui.commons.Label({text: "Username:"}),  
		template: new sap.ui.commons.TextField().bindProperty("value", "Username"),  
		sortProperty: "Username", 
		}));  

		user_temp_table.addColumn(  
		new sap.ui.table.Column({  
		label: new sap.ui.commons.Label({text: "Vorname:"}),  
		template: new sap.ui.commons.TextField().bindProperty("value", "Firstname"),  
		sortProperty: "Firstname",
		
		}));  
		
		user_temp_table.addColumn(  
		new sap.ui.table.Column({  
		  label: new sap.ui.commons.Label({text: "Nachname"}),  
		  template: new sap.ui.commons.TextField().bindProperty("value", "Lastname"),  
		  sortProperty: "Lastname",
		 
		}));  
		user_temp_table.addColumn(  
				new sap.ui.table.Column({  
				  label: new sap.ui.commons.Label({text: "Rolle"}),  
				  template: new sap.ui.commons.TextField().bindProperty("value", "Name"),  
				  sortProperty: "Name",
				 
				}));  
		
		var oModel = new sap.ui.model.odata.ODataModel(  
				sap.ui.getCore().byId("path").getText(), false);  
		
		user_temp_table.setModel(oModel);  
		user_temp_table.bindRows("/HOUSE?$filter=HospitaliznID eq "+data['HospitaliznID']+" "); 
		

		var medicationstay_panel_pop_top = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});
		medicationstay_panel_pop_top.createRow(disease_plan_medi_table);
		medicationstay_panel_pop_top.createRow(user_temp_table);
		var medicationstay_panel_pop_layout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});
		
		medicationstay_panel_pop_layout.createRow(disease_label, disease_input);
		medicationstay_panel_pop_layout.createRow(disease_plan_label, disease_plan_input);
		medicationstay_panel_pop_layout.createRow(floor_label, floor_input);
		medicationstay_panel_pop_layout.createRow(room_label, room_input);
		medicationstay_panel_pop.addContent(medicationstay_panel_pop_layout);
		

		
		
		patientInfo_layout.createRow(patient_panel_pop);
		
		patientInfo_layout.createRow(medicationstay_panel_pop);
		patientInfo_layout.createRow(medicationstay_panel_pop_top)
		
		
		patientInfo_dialog.addContent(patientInfo_layout);
		patientInfo_dialog.open();
	}

});