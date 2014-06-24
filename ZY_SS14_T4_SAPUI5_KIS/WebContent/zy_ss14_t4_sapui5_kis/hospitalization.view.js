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
		
		
		var header_label = new sap.ui.commons.Label("hospitalization_plan_header",{text: "Aufenthalt anlegen"});
		header_label.setDesign(sap.ui.commons.LabelDesign.Bold);

		var line_divider = new sap.ui.commons.HorizontalDivider("hospitalization_plan_divider");
	
		layout.createRow(header_label);
		layout.createRow(line_divider);
		
		var patient_panel = new sap.ui.commons.Panel("patient_panel");
		patient_panel.setTitle(new sap.ui.core.Title({text: "Schritt 1: Patient waehlen/ anlegen",icon : "sap-icon://wounds-doc"}));
		
		var conditn_panel = new sap.ui.commons.Panel("conditn_panel");
		conditn_panel.setTitle(new sap.ui.core.Title({text: "Schritt 2: Diagnose waehlen"}));
		
		var hospi_panel = new sap.ui.commons.Panel("hospi_panel");
		hospi_panel.setTitle(new sap.ui.core.Title({text: "Schritt 3: Behandlungsplan waehlen"}));
		
		var bed_panel = new sap.ui.commons.Panel("bed_panel");
		bed_panel.setTitle(new sap.ui.core.Title({text: "Schritt 4: Bett waehlen"}));
				
		var insurancenumber_label = new sap.ui.commons.Label({text: "Versichertennummer: "});
		var insnr_comb_temp = new sap.ui.core.ListItem({text:"{Insurancenumber}", additionalText:"{Lastname}"});
		
		var insurancenumber_input = new sap.ui.commons.ComboBox(
				{items: {path: "/PATIENT",
				 template: insnr_comb_temp}});
	//		
		var firstname_label = new sap.ui.commons.Label({text: "Vorname: "});
		var firstname_input = new sap.ui.commons.TextField("Firstname_input").setValue("Test");
		
		var lastname_label = new sap.ui.commons.Label({text: "Nachname: "});
		var lastname_input = new sap.ui.commons.TextField("Lastname_input");
	
		var postalcode_label = new sap.ui.commons.Label({text: "PLZ: "});
		var postalcode_input = new sap.ui.commons.TextField("Postalcode_input");
		
		var city_label = new sap.ui.commons.Label({text: "Stadt: "});
		var city_input = new sap.ui.commons.TextField("City_input");
		
		var street_label = new sap.ui.commons.Label({text: "Strasse: "});
		var street_input = new sap.ui.commons.TextField("Street_input");
		
		var country_label = new sap.ui.commons.Label({text: "Land: "});
		var country_input = new sap.ui.commons.TextField("Country_input");
		
		var patient_panel_layout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});
		patient_panel_layout.createRow(insurancenumber_label, insurancenumber_input);
		patient_panel_layout.createRow(firstname_label, firstname_input.setEditable(false));
		patient_panel_layout.createRow(lastname_label, lastname_input.setEditable(false));
		patient_panel_layout.createRow(street_label, street_input.setEditable(false));
		patient_panel_layout.createRow(postalcode_label, postalcode_input.setEditable(false));
		patient_panel_layout.createRow(city_label, city_input.setEditable(false));
		patient_panel_layout.createRow(country_label, country_input.setEditable(false));
		
		patient_panel.addContent(patient_panel_layout);
		
		layout.createRow(patient_panel);
		layout.createRow(conditn_panel);
		layout.createRow(hospi_panel);
		layout.createRow(bed_panel);

		/** 
	   * Create Buttons:
	   */
		insurancenumber_input.attachChange(null, function(){oController.create_patient(insurancenumber_input.getValue());});

		
	
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
		var oModel = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);
//		var hospi_table = sap.ui.getCore().byId("hospi");
		
		var patient_comb_label = new sap.ui.commons.Label({text:"Schritt 1: Patient waehlen/ erstellen" });
		var patient_comb_temp = new sap.ui.core.ListItem({text:"{Lastname}", additionalText:"{Firstname}"});
		var patient_comb = new sap.ui.commons.ComboBox({
		    items: {
				path: "/PATIENT", 
				displaySecondaryValues:true,
				template: patient_comb_temp
			}
		});
		var patient_search_button = new sap.ui.commons.Button({
	        text : "Patient suchen",
	        icon : "sap-icon://wounds-doc",
	        width : "210px",
	        press : function() {open_create_dialog();
			}
	    	
		});
		var patient_create_button = new sap.ui.commons.Button({
	        text : "Patient neu anlegen",
	        icon : "sap-icon://wounds-doc",
	        width : "210px",
	        press : function() {open_create_dialog();
			}
	    	
		});
		
		var conditn_comb_label = new sap.ui.commons.Label({text:"Schritt 2: Diagnose waehlen/ erstellen" });
		var conditn_comb_temp = new sap.ui.core.ListItem({text:"{Name}", additionalText:"{Description}"});
		var conditn_comb = new sap.ui.commons.ComboBox({
		    items: {
				path: "/CONDITN", 
				displaySecondaryValues:true,
				template: conditn_comb_temp
			}
		});
		var conditn_search_button = new sap.ui.commons.Button({
	        text : "Diagnose suchen",
	        icon : "sap-icon://electrocardiogram",
	        width : "210px",
	        press : function() {open_create_dialog();
			}
	    	
		});
		var conditn_create_button = new sap.ui.commons.Button({
	        text : "Diagnose neu anlegen",
	        icon : "sap-icon://electrocardiogram",
	        width : "210px",
	        press : function() {open_create_dialog();
			}
	    	
		});
		
		var treatpl_comb_label = new sap.ui.commons.Label({text:"Schritt 3: Behandlungsplan waehlen/ erstellen" });
		var treatpl_comb_temp = new sap.ui.core.ListItem({text:"{Name}", additionalText:"{Duration}"});
		var treatpl_comb = new sap.ui.commons.ComboBox({
		    items: {
				path: "/TREATPL", 
				displaySecondaryValues:true,
				template: treatpl_comb_temp
			}
		});
		var treatpl_search_button = new sap.ui.commons.Button({
	        text : "Behandlungsplan suchen",
	        icon : "sap-icon://clinical-order",
	        width : "210px",
	        press : function() {open_create_dialog();
			}
	    	
		});
		var treatpl_create_button = new sap.ui.commons.Button({
	        text : "Behandlungsplan neu anlegen",
	        icon : "sap-icon://clinical-order",
	        width : "210px",
	        press : function() {open_create_dialog();
			}
	    	
		});
		
		var bed_comb_label = new sap.ui.commons.Label({text:"Schritt 4: Bett waehlen/ erstellen" });
		var bed_comb_temp = new sap.ui.core.ListItem({text:"{Name}", additionalText:"{Duration}"});
		var bed_comb = new sap.ui.commons.ComboBox({
		    items: {
				path: "", 
				displaySecondaryValues:true,
				template: bed_comb_temp
			}
		});
		var bed_search_button = new sap.ui.commons.Button({
	        text : "Bett suchen",
	        icon : "sap-icon://bed",
	        width : "210px",
	        press : function() {open_create_dialog();
			}
	    	
		});

		
//		layout.createRow(patient_comb_label, patient_comb, patient_search_button, patient_create_button);
//		layout.createRow(conditn_comb_label, conditn_comb, conditn_search_button, conditn_create_button);
//		layout.createRow(treatpl_comb_label, treatpl_comb, treatpl_search_button, treatpl_create_button);
//		layout.createRow(bed_comb_label, bed_comb, bed_search_button, null);		
//		layout.createRow(new sap.ui.commons.HorizontalDivider());
//		layout.createRow(hospi_table);

		
		return layout;
	}

});
