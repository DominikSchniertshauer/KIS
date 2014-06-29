sap.ui.jsview("zy_ss14_t4_sapui5_kis.disease_plan", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zy_ss14_t4_sapui5_kis.disease_plan
	*/ 
	getControllerName : function() {
		return "zy_ss14_t4_sapui5_kis.disease_plan";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zy_ss14_t4_sapui5_kis.disease_plan
	*/ 
	createContent : function(oController) {
		var layout = new sap.ui.commons.layout.MatrixLayout({
			id : 'disease_plan_layout',
			layoutFixed : false,
			});
		
		var data;

	   /** 
	   * Create Buttons:
	   */
		var create_button = new sap.ui.commons.Button("disease_plan_create", {
	        text : "Neuen Behandlungsplan anlegen",
	        icon : "sap-icon://syringe",
	        press : function() { 
	        	oController.open_create_dialog();
			}
	    	
		});


		
		
		/**
		* Create Toolbar 
		*/

		var oToolbarDiseasePlan = new sap.ui.commons.Toolbar("tbDiseasePlan");
		
		oToolbarDiseasePlan.setStandalone(false);
		oToolbarDiseasePlan.setDesign(sap.ui.commons.ToolbarDesign.Flat);	
		oToolbarDiseasePlan.setWidth("570px");
		
		oToolbarDiseasePlan.addItem(create_button);
		
		/**
		* Define header description
		*/
		var header_label = new sap.ui.commons.Label("disease_plan_header",{text: "Behandlungsplaene"});
		header_label.setDesign(sap.ui.commons.LabelDesign.Bold);

		var line_divider = new sap.ui.commons.HorizontalDivider("disease_plan_divider");
	
		layout.createRow(header_label);
		layout.createRow(line_divider);
		
		/**
		* Place buttons to the form
		*/
		layout.createRow(oToolbarDiseasePlan);
		var title = new sap.ui.commons.Title('disease_plan_title');     
		title.setText('Liste von allen Behandlungsplaenen'); 
		var panel = new sap.ui.commons.Panel('disease_plan_panel');  
		panel.setTitle(title); 
		
		var titleMedi = new sap.ui.commons.Title('disease_medi_plan_title');     
		titleMedi.setText('Liste von allen zu einem Behandlungsplan zugeordneteten Medikamenten'); 
		var panelMedi = new sap.ui.commons.Panel('disease_medi_plan_panel');  
		panelMedi.setTitle(titleMedi); 
		
		 /**
		 * Create table to display all available medications 
		 */
		var disease_plan_table = new sap.ui.table.Table("tblDiseasePlan", {
				selectionMode: sap.ui.table.SelectionMode.Single,
				rowSelectionChange: function(oEvent){
					var currentRowContext = oEvent.getParameter("rowContext").getPath();
					var model = disease_plan_table.getModel();
					data = model.getProperty(currentRowContext);
					
					
					var oModel = new sap.ui.model.odata.ODataModel(  
							sap.ui.getCore().byId("path").getText(), false);  
					
					disease_plan_medi_table.setModel(oModel);  
					disease_plan_medi_table.bindRows("/TREMD?$filter=TreatPlanID eq "+data['TreatPlanID']+" "); 
					
					
				}});  
		disease_plan_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Behandlungsplan ID"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "TreatPlanID"),  
		          sortProperty: "TreatPlanID",
		          width: "130px"
		}));  
		
		disease_plan_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Behandlungsplan"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Name"),  
		          sortProperty: "Name"  
		}));  
		
		disease_plan_table.addColumn(  
			     new sap.ui.table.Column({  
			          label: new sap.ui.commons.Label({text: "Dauer (Tage)"}),  
			          template: new sap.ui.commons.TextField().bindProperty("value", "Duration"),  
			          sortProperty: "Duration"  
			})); 
  
		
		 /**
		 * Create table to display all available treatment
		 */
		var disease_plan_medi_table = new sap.ui.table.Table();  
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
		/**
		* Fill table with data: 
		*/
		var oModel = new sap.ui.model.odata.ODataModel(  
				sap.ui.getCore().byId("path").getText(), false);  
		
		disease_plan_table.setModel(oModel);  
		disease_plan_table.bindRows('/TREATPL');  
		

		
		panel.addContent(disease_plan_table);  
		panelMedi.addContent(disease_plan_medi_table);
		layout.createRow(panel);  
		layout.createRow(panelMedi);
		
		return layout;  
	}

});
