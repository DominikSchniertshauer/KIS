sap.ui.jsview("zy_ss14_t4_sapui5_kis.disease", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zy_ss14_t4_sapui5_kis.disease
	*/ 
	getControllerName : function() {
		return "zy_ss14_t4_sapui5_kis.disease";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zy_ss14_t4_sapui5_kis.disease
	*/ 
	createContent : function(oController) {
		var layout = new sap.ui.commons.layout.MatrixLayout({
			id : 'disease_layout',
			layoutFixed : false,
			});

		var data;

	   /** 
	   * Create Buttons:
	   */
		var create_button = new sap.ui.commons.Button("disease_create", {
	        text : "Neue Krankheit anlegen",
	        icon : "sap-icon://syringe",
	        press : function() { 
	        	oController.open_create_dialog();
			}
	    	
		});

		var update_button = new sap.ui.commons.Button("disease_update", {
	        text : "Existierende Krankheit aktualisieren",
	        icon : "sap-icon://syringe",
	        press : function() {
	        	oController.open_update_dialog(data);
	        }
		});	
		
		
		/**
		* Create Toolbar 
		*/

		var oToolbarDisease = new sap.ui.commons.Toolbar("tbDisease");
		
		oToolbarDisease.setStandalone(false);
		oToolbarDisease.setDesign(sap.ui.commons.ToolbarDesign.Flat);	
		oToolbarDisease.setWidth("500px");
		
		oToolbarDisease.addItem(create_button);
		oToolbarDisease.addItem(update_button);
		
		/**
		* Define header description
		*/
		
		var header_label = new sap.ui.commons.Label("disease_header",{text: "Krankheiten"});
		header_label.setDesign(sap.ui.commons.LabelDesign.Bold);

		var line_divider = new sap.ui.commons.HorizontalDivider("disease_divider");
	
		layout.createRow(header_label);
		layout.createRow(line_divider);
		
		/**
		* Place buttons to the form
		*/
		layout.createRow(oToolbarDisease);
		var panel = new sap.ui.commons.Panel('disease_panel');  
		var title = new sap.ui.commons.Title('disease_title');     
		title.setText('Liste von allen Krankheiten');     
		panel.setTitle(title);  

		 /**
		 * Create table to display all available disease 
		 */
		
		var disease_table = new sap.ui.table.Table("tblDisease",{
			selectionMode: sap.ui.table.SelectionMode.Single,
			rowSelectionChange: function(oEvent){
				var currentRowContext = oEvent.getParameter("rowContext").getPath();
				var model = disease_table.getModel();
				data = model.getProperty(currentRowContext);
			}});    
		disease_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Name"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Name"),  
		          sortProperty: "Name", 
		          width: "250px"
		}));  
		
		disease_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Symptome"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Description"),  
		          sortProperty: "Description"  
		}));  

		/**
		* Fill table with data: 
		*/
		var oModel = new sap.ui.model.odata.ODataModel(  
				sap.ui.getCore().byId("path").getText(), false);  
		
		disease_table.setModel(oModel);  
		disease_table.bindRows('/CONDITN');  
		
		panel.addContent(disease_table);    
		layout.createRow(panel);  
		
		return layout;  
	}

});
