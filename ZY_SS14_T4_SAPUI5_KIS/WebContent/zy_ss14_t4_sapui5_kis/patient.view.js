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

		var data;

	   /** 
	   * Create Buttons:
	   */	
		var create_button = new sap.ui.commons.Button("patient_create", {
	        text : "Neuen Patienten anlegen",
	        icon : "sap-icon://wounds-doc",
	        press : function() {oController.open_create_dialog();
			}
	    	
		});
		
		var update_button = new sap.ui.commons.Button("patient_update", {
	        text : "Patientendaten aktualisieren",
	        icon : "sap-icon://activity-individual",
	        press : function() { oController.open_update_dialog(data);}
		});	

		
		/**
		* Create Toolbar 
		*/

		var oToolbarPatient = new sap.ui.commons.Toolbar("tbPatient");
		
		oToolbarPatient.setStandalone(false);
		oToolbarPatient.setDesign(sap.ui.commons.ToolbarDesign.Flat);	
		oToolbarPatient.setWidth("500px");
		
		oToolbarPatient.addItem(create_button);
		oToolbarPatient.addItem(update_button);
		
		
		
		/**
		* Define header description
		*/
		var header_label = new sap.ui.commons.Label("patient_header",{text: "Patientendaten"});
		header_label.setDesign(sap.ui.commons.LabelDesign.Bold);

		var line_divider = new sap.ui.commons.HorizontalDivider("patient_divider");
	
		/**
		* Place buttons to the form
		*/		
		layout.createRow(oToolbarPatient);
		layout.createRow(header_label);
		layout.createRow(line_divider);
	
		var panel = new sap.ui.commons.Panel('rPannel');              
		var title = new sap.ui.commons.Title('rTitle');     
		title.setText('Liste von allen Patienten');     
		panel.setTitle(title);    
		

		
		
	
		
		function open_create_dialog() {
	
		};
	

		
		
		 /**
		 * Create table to display all available patient
		 */
		
		var patient_table = new sap.ui.table.Table("tblPatient",{
			selectionMode: sap.ui.table.SelectionMode.Single,
			rowSelectionChange: function(oEvent){
				var currentRowContext = oEvent.getParameter("rowContext").getPath();
				var model = patient_table.getModel();
				data = model.getProperty(currentRowContext);
			}});  
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
	
		/**
		* Fill table with data: 
		*/
		patient_table.setModel(oModel);  
		patient_table.bindRows('/PATIENT');  
		
		panel.addContent(patient_table);    
		layout.createRow(panel);  
		
		return layout;  
		

	},

	
		
		
	
});
