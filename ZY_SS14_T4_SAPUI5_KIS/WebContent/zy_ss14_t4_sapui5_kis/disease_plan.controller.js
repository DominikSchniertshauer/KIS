sap.ui.controller("zy_ss14_t4_sapui5_kis.disease_plan", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf zy_ss14_t4_sapui5_kis.disease_plan
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf zy_ss14_t4_sapui5_kis.disease_plan
*/
	onBeforeRendering: function() {

	},
	
	open_create_dialog: function (){
		var disease_plan_layout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});
		var disease_plan_dialog = new sap.ui.commons.Dialog();
		var oModel = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);
		
		
		var disease_plan_panel_pop = new sap.ui.commons.Panel("disease_plan_panel_pop");
		disease_plan_panel_pop.setTitle(new sap.ui.core.Title({text: "Schritt 1: Informationen zum Behandlungsplan eintragen",icon : "sap-icon://wounds-doc"}));
		
		var medication_panel_pop = new sap.ui.commons.Panel("medication_panel_pop");
		medication_panel_pop.setTitle(new sap.ui.core.Title({text: "Schritt 2: Medikamente hinzufuegen"}));

		/**
		* Define fields and a button to insert a disease 
		*/
		var name_label = new sap.ui.commons.Label({text: "Name: "});
		var name_input = new sap.ui.commons.TextField({});
		
		var description_label = new sap.ui.commons.Label({text: "Beschreibung: "});
		var description_input = new sap.ui.commons.TextField({});
		
		var medication_label = new sap.ui.commons.Label({text: "Medikamente: "});
		var medication_comb = new sap.ui.core.ListItem({text:"{Name}", additionalText:"{Description}"});
		
		var medication_input = new sap.ui.commons.ComboBox(
				{displaySecondaryValues:true,items: {path: "/MEDICTN",
				 template: medication_comb}});
		
		var add_medi_button = new sap.ui.commons.Button({text: "Einfuegen" });
		 /**
		 * Create table to display all available medications 
		 */
		var medication_temp_table = new sap.ui.table.Table({ 
								selectionMode: sap.ui.table.SelectionMode.Single,
								width: "300px",
								rowSelectionChange: function(oEvent){
									var currentRowContext = oEvent.getParameter("rowContext").getPath();
									var model = medication_temp_table.getModel();
									data = model.getProperty(currentRowContext);
								}
		});
		
		medication_temp_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Name"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Name"),  
		          sortProperty: "Name", 
		}));  
	
		medication_temp_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Beschreibung"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Description"),  
		          sortProperty: "Description",
		         
		}));  
		
		var aData = []; 
			


		
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData({modelData: aData});
		medication_temp_table.setModel(oModel);
		medication_temp_table.bindRows("/modelData");
		
		var create_button = new sap.ui.commons.Button({text: "Neuen Behandlungsplan anlegen" });

		disease_plan_dialog.setTitle("Neuen Behandlungsplan anlegen");

		var disease_plan_panel_pop_layout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});
		disease_plan_panel_pop_layout.createRow(name_label, name_input);
		disease_plan_panel_pop_layout.createRow(description_label, description_input);
		disease_plan_panel_pop.addContent(disease_plan_panel_pop_layout);
		var medication_panel_pop_layout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});
		medication_panel_pop_layout.createRow(medication_label, medication_input, add_medi_button);
		medication_panel_pop_layout.createRow(medication_temp_table);
		medication_panel_pop_layout.createRow(create_button);
		medication_panel_pop.addContent(medication_panel_pop_layout);
		
		disease_plan_layout.createRow(disease_plan_panel_pop);
		disease_plan_layout.createRow(medication_panel_pop);
		
		add_medi_button.attachPress(function() {
			
			
			
		
			
			var test = {
					"Name": medication_input.getValue("Description"),
					"Description" : "test"
			};
			aData.push(test);
			medication_temp_table.bindRows("/modelData");
		});
		
		
		
		// Update ausführen, Daten aus TextFields übergeben
		create_button.attachPress(function(){
			
		// Übergabewerte für oModel.update Funktion
//		var oEntry = {};	
//			
//			oEntry.Mandt 		= '001';
//			//oEntry.MedicationID = '1';
//			oEntry.Name 		= name_input.getValue();
//			oEntry.Description	= description_input.getValue();
//			oEntry.Isactive 	= 'TRUE';
//			
//			
//			var oParams = {};
//		    oParams.fnSuccess = function(){ 
//		    	
//		    	disease_plan_dialog.close(); 		
//		    	
//
//		    
//		    };
//		    oParams.fnError = function(){disease_plan_dialog.open();};
//		       
//			
//		    
//            oModel.create("/CONDITN", oEntry, oParams.fnSuccess(), oParams.fnError());
//            var disease_plan_table = sap.ui.getCore().byId("tblDisease");
//			disease_table.bindRows('/CONDITN'); 

		});

		disease_plan_dialog.addContent(disease_plan_layout);
		
		disease_plan_dialog.open();
	}, 

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf zy_ss14_t4_sapui5_kis.disease_plan
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf zy_ss14_t4_sapui5_kis.disease_plan
*/
//	onExit: function() {
//
//	}

});