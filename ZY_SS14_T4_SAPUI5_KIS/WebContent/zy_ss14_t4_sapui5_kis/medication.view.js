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

		
		var header_label = new sap.ui.commons.Label("medication_header",{text: "Auflistung aller verfuegbaren Medikamente" });
		header_label.setDesign(sap.ui.commons.LabelDesign.Bold);

		var line_divider = new sap.ui.commons.HorizontalDivider("medication_divider");
	
		layout.createRow(header_label);
		layout.createRow(line_divider);
		
		var panel = new sap.ui.commons.Panel('medication_panel');  
		
		var medication_table = new sap.ui.table.Table();  
		medication_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Name"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Name"),  
		          sortProperty: "Name"  
		}));  
		
		medication_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Description"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Description"),  
		          sortProperty: "Description"  
		}));  
		
//		medication_table.attachRowSelect(function(oEvent){
//			var currentRowContext = oEvent.getParameter("rowContext").getPath();
//			var model = medication_table.getModel();
//			var data = mode.getProperty(sPath);
//			Alert(data['Name']);
//			
//			
//		});
  
		var oModel = new sap.ui.model.odata.ODataModel(  
				sap.ui.getCore().byId("path").getText(), false);  
		
		medication_table.setModel(oModel);  
		medication_table.bindRows('/MEDICTN');  
		
		panel.addContent(medication_table);    
		layout.createRow(panel);  
		
		return layout;  
	}

});
