sap.ui.jsview("zy_ss14_t4_sapui5_kis.hospitalization", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zy_ss14_t4_sapui5_kis.hospitalization
	*/ 
	getControllerName : function() {
		return "zy_ss14_t4_sapui5_kis.hospitalization";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zy_ss14_t4_sapui5_kis.hospitalization
	*/ 
	createContent : function(oController) {

		var layout = new sap.ui.commons.layout.MatrixLayout({
			id : 'hospitalization_layout',
			layoutFixed : false,
			});
		
		
		var header_label = new sap.ui.commons.Label("hospitalization_plan_header",{text: "Aktuell existierende Krankenhausaufenthalte"});
		header_label.setDesign(sap.ui.commons.LabelDesign.Bold);

		var line_divider = new sap.ui.commons.HorizontalDivider("hospitalization_plan_divider");
	
		layout.createRow(header_label);
		layout.createRow(line_divider);
		
		var panel = new sap.ui.commons.Panel('hospitalization_plan_panel');  
	   /** 
	   * Create Buttons:
	   */
		var instruct_patient_button = new sap.ui.commons.Button("instruct_patient_create", {
	        text : "Patient einweisen",
	        icon : "sap-icon://wounds-doc",
	        press : function() {open_create_dialog();
			}
	    	
		});
		var diagnose_patient_button = new sap.ui.commons.Button("diagnose_patient_instruct", {
	        text : "Diagnose anfertigen",
	        icon : "sap-icon://wounds-doc",
	        press : function() {open_create_dialog();
			}
	    	
		});
		var treatmentplan_patient_button = new sap.ui.commons.Button("treatmentplan_patient_instruct", {
	        text : "Behandlungsplan anlegen",
	        icon : "sap-icon://wounds-doc",
	        press : function() {open_create_dialog();
			}
	    	
		});
		var bed_patient_button = new sap.ui.commons.Button("bed_patient_instruct", {
	        text : "Bed zuweisen",
	        icon : "sap-icon://wounds-doc",
	        press : function() {open_create_dialog();
			}
	    	
		});
		var release_patient_button = new sap.ui.commons.Button("release_patient_update", {
	        text : "Patient entlassen",
	        icon : "sap-icon://wounds-doc",
	        press : function() {open_create_dialog();
			}
	    	
		});
		
		layout.createRow(instruct_patient_button, diagnose_patient_button, treatmentplan_patient_button, bed_patient_button, release_patient_button);
	
		
		return layout;
	}

});
