sap.ui.jsview("zy_ss14_t4_sapui5_kis.hospitalization_overview", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zy_ss14_t4_sapui5_kis.hospitalization_overview
	*/ 
	getControllerName : function() {
		return "zy_ss14_t4_sapui5_kis.hospitalization_overview";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zy_ss14_t4_sapui5_kis.hospitalization_overview
	*/ 
	createContent : function(oController) {
		var layout = new sap.ui.commons.layout.MatrixLayout({
			id : 'hospitalization_overview_layout',
			layoutFixed : false,
			});

		
		var header_label = new sap.ui.commons.Label("hospitalization_overview_header",{text: "Hospitalisierungen"});
		header_label.setDesign(sap.ui.commons.LabelDesign.Bold);

		var line_divider = new sap.ui.commons.HorizontalDivider("hospitalization_overview_divider");
	
		layout.createRow(header_label);
		layout.createRow(line_divider);
		
		
		
		var panel = new sap.ui.commons.Panel('hospitalization_overview_panel');  
		var title = new sap.ui.commons.Title('hospitalization_overview_title');     
		title.setText('Liste von allen aktuellen Hospitalisierungen');     
		panel.setTitle(title);  
		
		var hospi2_table = new sap.ui.table.Table("hospitalization_Overview_Table", {
			id: "Mandt",
		}); 


		hospi2_table.addColumn(  
			     new sap.ui.table.Column({  
			          label: new sap.ui.commons.Label({text: "HospiID"}),  
			          template: new sap.ui.commons.TextField().bindProperty("value", "HospitaliznID"),  
			          sortProperty: "HospitaliznID"  
			}));  
		hospi2_table.addColumn(  
			     new sap.ui.table.Column({  
			          label: new sap.ui.commons.Label({text: "Patient"}),  
			          template: new sap.ui.commons.TextField().bindProperty("value", "Patient"),  
			          sortProperty: "Patient"  
			}));  
		hospi2_table.addColumn(  
			     new sap.ui.table.Column({  
			          label: new sap.ui.commons.Label({text: "Krankheit"}),  
			          template: new sap.ui.commons.TextField().bindProperty("value", "Disease"),  
			          sortProperty: "Disease"  
			}));  
		hospi2_table.addColumn(  
		     new sap.ui.table.Column({
		          label: new sap.ui.commons.Label({text: "Behandlungsplan"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Treatmentplan"),  
		          sortProperty: "Treatmentplan"  
		}));  
		hospi2_table.addColumn(  
			     new sap.ui.table.Column({  
			          label: new sap.ui.commons.Label({text: "Employee"}),  
			          template: new sap.ui.commons.TextField().bindProperty("value", "Employee"),  
			          sortProperty: "Employee"  
			}));  



  
		var oModel = new sap.ui.model.odata.ODataModel(  
				sap.ui.getCore().byId("path").getText(), false);  
		
		
		
		hospi2_table.setModel(oModel);  
		hospi2_table.bindRows('/HOSPI');  
		
		panel.addContent(hospi2_table);    
		layout.createRow(panel);  
		
		
		return layout;  
	}

});



