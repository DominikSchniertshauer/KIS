sap.ui.controller("zy_ss14_t4_sapui5_kis.disease_plan", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf zy_ss14_t4_sapui5_kis.disease_plan
*/
	onInit: function() {

		var oModel = sap.ui.getCore().getModel();  
		medication_table = sap.ui.getCore().byId("tblDiseasePlan");
		
		medication_table.setModel(oModel);  
		medication_table.bindRows('/TREATPL');
	},

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
		
		/**
		*  Create Panels
		*/
		var disease_plan_panel_pop = new sap.ui.commons.Panel();
		disease_plan_panel_pop.setTitle(new sap.ui.core.Title({text: "Schritt 1: Informationen zum Behandlungsplan eintragen",icon : "sap-icon://wounds-doc"}));
		
		var medication_panel_pop = new sap.ui.commons.Panel();
		medication_panel_pop.setTitle(new sap.ui.core.Title({text: "Schritt 2: Medikamente hinzufuegen"}));
		
		var medication_table_panel_pop = new sap.ui.commons.Panel();
		medication_table_panel_pop.setTitle(new sap.ui.core.Title({text: "Schritt 3: Uebersicht ueber die eingefuegten Medikamente"}));
		
		var close_panel_pop = new sap.ui.commons.Panel();
		close_panel_pop.setTitle(new sap.ui.core.Title({text: "Schritt 4: Behandlungsplan anlegen"}));

		/**
		* Define fields and a button to insert a disease 
		*/
		var name_label = new sap.ui.commons.Label({text: "Name: ", width: "205px"});
		var name_input = new sap.ui.commons.TextField({});
		
		var description_label = new sap.ui.commons.Label({text: "Dauer (Tage): " , width: "205px"});
		var description_input = new sap.ui.commons.TextField({});
		
		var medication_label = new sap.ui.commons.Label({text: "Medikamente: ", width: "200px"});
		var medication_comb = new sap.ui.core.ListItem({text:"{Name}", key:"{MedicationID}", additionalText:"{Description}"});
		
		var medication_input = new sap.ui.commons.ComboBox(
				{displaySecondaryValues:true,items: {path: "/MEDICTN",
				 template: medication_comb}});

		var interval_label = new sap.ui.commons.Label({text: "Verabreichungsinterval (Stunden): " , width: "200px"});
		var interval_input = new sap.ui.commons.TextField({});
		
		var add_medi_button = new sap.ui.commons.Button({text: "Zum Behandlungsplan hinzufuegen" });
		add_medi_button.setEnabled(false);
		
		/**
		* Create table to display all available medications 
		*/
		var medication_temp_table = new sap.ui.table.Table({ 
								selectionMode: sap.ui.table.SelectionMode.Single,
								width: "450px",
								rowSelectionChange: function(oEvent){
									var currentRowContext = oEvent.getParameter("rowContext").getPath();
									var model = medication_temp_table.getModel();
									data = model.getProperty(currentRowContext);
								}
		});
		
		medication_temp_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Name:"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Name"),  
		          sortProperty: "Name", 
		}));  
	
		medication_temp_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Beschreibung:"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Description"),  
		          sortProperty: "Description",
		         
		}));  
		
		medication_temp_table.addColumn(  
			     new sap.ui.table.Column({  
			          label: new sap.ui.commons.Label({text: "Verabreichungsinterval (Stunden)"}),  
			          template: new sap.ui.commons.TextField().bindProperty("value", "Interval"),  
			          sortProperty: "Interval",
			         
			}));  
		
		var aData = []; 
			
		/**
		 *  Set Data model for temp table
		 */
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData({modelData: aData});
		medication_temp_table.setModel(oModel);
		medication_temp_table.bindRows("/modelData");
		
		var create_button = new sap.ui.commons.Button({text: "Neuen Behandlungsplan anlegen" });

		/**
		 * Place elements on panels
		 */
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
		medication_panel_pop_layout.createRow(medication_label, medication_input);
		medication_panel_pop_layout.createRow(interval_label, interval_input);
		medication_panel_pop_layout.createRow(add_medi_button);
		medication_panel_pop.addContent(medication_panel_pop_layout);
		
		var medication_table_panel_pop_layout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});
		
		medication_table_panel_pop_layout.createRow(medication_temp_table);
		
		medication_table_panel_pop.addContent(medication_table_panel_pop_layout);
		
		var close_panel_pop_layout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});
		
		close_panel_pop_layout.createRow(null, create_button);
		close_panel_pop.addContent(close_panel_pop_layout);
		disease_plan_layout.createRow(disease_plan_panel_pop);
		disease_plan_layout.createRow(medication_panel_pop);
		disease_plan_layout.createRow(medication_table_panel_pop);
		disease_plan_layout.createRow(close_panel_pop);
		
		
		/** 
		 *  Function to enable / disable button to add medis
		 */
		interval_input.attachChange(function(){
			
			if ((interval_input.getValue() != '') && (medication_input.getValue() != ''))  {
				add_medi_button.setEnabled(true);
			} else { 
				add_medi_button.setEnabled(false);
			}
		});
		
		medication_input.attachChange(function(){
			
			if ((interval_input.getValue() != '') && (medication_input.getValue() != ''))  {
				add_medi_button.setEnabled(true);
			} else { 
				add_medi_button.setEnabled(false);
			}
		});
		
		/**
		 * Define action on press button to add medis
		 */
		add_medi_button.attachPress(function() {
			
			/**
			 * define Data model
			 */
			var oModel = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);
			oModel.refreshSecurityToken(null, null);
			
			// Filtern nach Versichertennummer
			
			
			oModel.read("/MEDICTN(Mandt='001',MedicationID="+medication_input.getSelectedKey()+")" , null, null, true,
					function(data, response){

				try {
					
					
					var test = {
							"MedicationID": medication_input.getSelectedKey(),
							"Name": medication_input.getValue(),
							"Description" : data['Description'],
							"Interval" : interval_input.getValue()
					};
					aData.push(test);
					medication_temp_table.bindRows("/modelData");

					medication_input.setValue("");
					interval_input.setValue("");
					add_medi_button.setEnabled(false);
				
			} catch(e) { }
			
			});
			
			
		});
		
		
		
		/**
		 * Define action when button create new treatment plan is pressed
		 */
		create_button.attachPress(function(){
			
			/**
			 * define data variable
			 */
			var oEntry = {};	
				
				oEntry.Mandt 		= '001';
				oEntry.Name 		= name_input.getValue();
				oEntry.Isactive 	= 'TRUE';
				oEntry.Duration		= description_input.getValue();
				
				
				/**
				 * When the treatment plan is created successful... 
				 */
				var mParameters = {};
				mParameters.success = function(data, response){
					
					/**
					 * ... add all selected medis to the just created treatment plan
					 */
					while (aData.length >0) {
						var getTblData = aData.pop();
						var oEntry = {};
						
						oEntry.Mandt 	= '001';
						oEntry.TreatPlanID = data['TreatPlanID'];
						oEntry.MedicationID = getTblData['MedicationID'];
						oEntry.AdministrationInterval = getTblData['Interval'];
						var oModel = sap.ui.getCore().getModel();  
						oModel.create("/TREMED", oEntry);
				
					}
					disease_plan_dialog.close(); 
	            };
	            mParameters.error = function(){
	            	
			    	var messages = "Es sind Fehler aufgetreten: \n";
			    	sap.ui.commons.MessageBox.alert(messages);
			    	
	            };

	            

			       
			    
			       
				var oModel = sap.ui.getCore().getModel();  
				
			
		        oModel.create("/TREATPL", oEntry, mParameters);
		        

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