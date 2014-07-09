	sap.ui.jsview("zy_ss14_t4_sapui5_kis.hospitalization_displace", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zy_ss14_t4_sapui5_kis.hospitalization_displace
	*/ 
	getControllerName : function() {
		return "zy_ss14_t4_sapui5_kis.hospitalization_displace";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zy_ss14_t4_sapui5_kis.hospitalization_displace
	*/ 
	createContent : function(oController) {


		var patientID = 'test'; 
		
		var layout = new sap.ui.commons.layout.MatrixLayout({
			id : 'hospitalization__displace_layout',
			layoutFixed : false,
			});
		
		var left_layout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});	
		
		var right_layout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});
		
		var header_label = new sap.ui.commons.Label("hospitalization_displace_header",{text: "Patienten entlassen"});
		header_label.setDesign(sap.ui.commons.LabelDesign.Bold);

		var line_divider = new sap.ui.commons.HorizontalDivider("hospitalization_displace_divider");
	
		layout.createRow(header_label);
		layout.createRow(line_divider);
		
		
		var panel_left = new sap.ui.commons.Panel();
		var panel_right = new sap.ui.commons.Panel();
		
		var patient_displace_panel = new sap.ui.commons.Panel("patient_displace_panel");
		patient_displace_panel.setTitle(new sap.ui.core.Title({text: "Patient auswaehlen und entlassen",icon : "sap-icon://wounds-doc"}));	
		
		var insurancenumber_label = new sap.ui.commons.Label({text: "Versichertennummer: "});
		var insnr_comb_temp = new sap.ui.core.ListItem({text:"{Insurancenumber}", additionalText:"{Lastname}"});
		
		var insurancenumber_input = new sap.ui.commons.ComboBox("Insurnumber_input",
				{displaySecondaryValues: true,
				items: {path: "/PATIENT",
				 template: insnr_comb_temp,
				}});
		
		
		var fields = ["Fname", "Lname"];
		insurancenumber_input.attachChange(null, function(){ patientID = oController.get_patient(insurancenumber_input.getValue(), fields);});
		
		var firstname_label = new sap.ui.commons.Label({text: "Vorname: "});
		var firstname_input = new sap.ui.commons.TextField("Fname_input").setValue("Test");
		
		var lastname_label = new sap.ui.commons.Label({text: "Nachname: "});
		var lastname_input = new sap.ui.commons.TextField("Lname_input");
		
		
		var patient_displace_panel_layout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});
		
		
		var hospi_displace_button = new sap.ui.commons.Button({
	        text : "Patient entlassen",
	        icon : "sap-icon://accept",
//	        width : "200px",
	        press : function() {oController.displace_patient(patientID);
			}
	    	
		});
		
		patient_displace_panel_layout.createRow(insurancenumber_label, insurancenumber_input);
		patient_displace_panel_layout.createRow(firstname_label, firstname_input.setEditable(false));
		patient_displace_panel_layout.createRow(lastname_label, lastname_input.setEditable(false));
		patient_displace_panel_layout.createRow(hospi_displace_button);
		patient_displace_panel.addContent(patient_displace_panel_layout);
		
		left_layout.createRow(patient_displace_panel);
		
		layout.createRow(left_layout, right_layout);
		
		return layout;
	}

});
