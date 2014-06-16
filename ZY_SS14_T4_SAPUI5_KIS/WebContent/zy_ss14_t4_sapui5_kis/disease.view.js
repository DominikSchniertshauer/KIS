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

		
		var header_label = new sap.ui.commons.Label("disease_header",{text: "Aktuell existierende Krankheit"});
		header_label.setDesign(sap.ui.commons.LabelDesign.Bold);

		var line_divider = new sap.ui.commons.HorizontalDivider("disease_divider");
	
		layout.createRow(header_label);
		layout.createRow(line_divider);
		
		var panel = new sap.ui.commons.Panel('disease_panel');  
		
		var disease_table = new sap.ui.table.Table();  
		disease_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Name"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Name"),  
		          sortProperty: "Name"  
		}));  
		
		disease_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Description"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Description"),  
		          sortProperty: "Description"  
		}));  
  
		var oModel = new sap.ui.model.odata.ODataModel(  
				sap.ui.getCore().byId("path").getText(), false);  
		
		disease_table.setModel(oModel);  
		disease_table.bindRows('/CONDITN');  
		
		panel.addContent(disease_table);    
		layout.createRow(panel);  
		
		return layout;  
	}

});
