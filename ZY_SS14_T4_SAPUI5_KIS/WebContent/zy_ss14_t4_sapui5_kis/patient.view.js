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
		
		var header_label = new sap.ui.commons.Label("patient_header",{text: "Patientendaten"});
		header_label.setDesign(sap.ui.commons.LabelDesign.Bold);

		var line_divider = new sap.ui.commons.HorizontalDivider("patient_divider");
	
		layout.createRow(header_label);
		layout.createRow(line_divider);
	
		var panel = new sap.ui.commons.Panel('rPannel');              
		var title = new sap.ui.commons.Title('rTitle');     
		title.setText('List of all patients');     
		panel.setTitle(title);    
		
		var patient_table = new sap.ui.table.Table();  
		patient_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Firstname"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Firstname"),  
		          sortProperty: "Firstname"  
		}));  
		patient_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Lastname"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Lastname"),  
		          sortProperty: "Lastname"  
		}));  
		patient_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Street"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Street"),  
		          sortProperty: "Street"  
		}));  
  
		var oModel = new sap.ui.model.odata.ODataModel(  
		                              "proxy/http/i67lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/ZY_SS14_T4_SEGW_KIS_SRV",  
		                                                  false);  
		patient_table.setModel(oModel);  
		patient_table.bindRows("/PATIENT");  
		panel.addContent(patient_table);    
		layout.createRow(panel);  
		
		return layout;  
	
	}

});
