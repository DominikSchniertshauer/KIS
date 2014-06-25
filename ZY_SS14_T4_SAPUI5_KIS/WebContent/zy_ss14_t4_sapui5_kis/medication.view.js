sap.ui.jsview("zy_ss14_t4_sapui5_kis.medication", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zy_ss14_t4_sapui5_kis.medication
	*/ 
	getControllerName : function() {
		return "zy_ss14_t4_sapui5_kis.medication";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zy_ss14_t4_sapui5_kis.medication
	*/ 
	createContent : function(oController) {
		var layout = new sap.ui.commons.layout.MatrixLayout({
			id : 'medication_layout',
			layoutFixed : false,
			});
	
		var data;
		
	   /** 
	   * Create Buttons:
	   */
		var create_button = new sap.ui.commons.Button("medication_create", {
	        text : "Neues Medikament anlegen",
	        icon : "sap-icon://syringe",
	        press : function() { 
	        	oController.open_create_dialog();
			}
	    	
		});

		var update_button = new sap.ui.commons.Button("medication_update", {
	        text : "Existierendes Medikament aendern",
	        icon : "sap-icon://syringe",
	        press : function() {
	        	oController.open_update_dialog(data);
	        }
		});
		
		
		/**
		* Create Toolbar 
		*/

		var oToolbar2 = new sap.ui.commons.Toolbar("tb2");
		
		oToolbar2.setStandalone(false);
		oToolbar2.setDesign(sap.ui.commons.ToolbarDesign.Flat);	
		oToolbar2.setWidth("500px");
		
		oToolbar2.addItem(create_button);
		oToolbar2.addItem(update_button);

		/**
		* Define header description
		*/
		var header_label = new sap.ui.commons.Label("medication_header",{text: "Medikamente" });
		header_label.setDesign(sap.ui.commons.LabelDesign.Bold);

		var line_divider = new sap.ui.commons.HorizontalDivider("medication_divider");
	
		layout.createRow(header_label);
		layout.createRow(line_divider);
		
		
		/**
		* Place buttons to the form
		*/
		layout.createRow(oToolbar2);
		var title = new sap.ui.commons.Title('medication_title');     
		title.setText('Liste von allen Medikamenten'); 
		var panel = new sap.ui.commons.Panel('medication_panel');
		panel.setTitle(title); 

		
		 /**
		 * Create table to display all available medications 
		 */
		var medication_table = new sap.ui.table.Table("tblMedication", { 
								selectionMode: sap.ui.table.SelectionMode.Single,
								rowSelectionChange: function(oEvent){
									var currentRowContext = oEvent.getParameter("rowContext").getPath();
									var model = medication_table.getModel();
									data = model.getProperty(currentRowContext);
								}
		});
		
		medication_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Name"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Name"),  
		          sortProperty: "Name", 
		}));  
	
		medication_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Beschreibung"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Description"),  
		          sortProperty: "Description",
		         
		}));  
		

		/**
		* Fill table with data: 
		*/
		var oModel = new sap.ui.model.odata.ODataModel(  
				sap.ui.getCore().byId("path").getText(), false);  
		
		medication_table.setModel(oModel);  
		medication_table.bindRows('/MEDICTN');  
		
		panel.addContent(medication_table);    
		layout.createRow(panel);  
		
		return layout;  
	}

});
