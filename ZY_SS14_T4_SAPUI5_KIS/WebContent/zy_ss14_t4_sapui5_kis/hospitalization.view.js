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
		
		var left_layout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});	
		
		var right_layout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});
		
		var header_label = new sap.ui.commons.Label("hospitalization_plan_header",{text: "Aufenthalt anlegen"});
		header_label.setDesign(sap.ui.commons.LabelDesign.Bold);

		var line_divider = new sap.ui.commons.HorizontalDivider("hospitalization_plan_divider");
	
		layout.createRow(header_label);
		layout.createRow(line_divider);
		
		
		var panel_left = new sap.ui.commons.Panel();
		var panel_right = new sap.ui.commons.Panel();
		
		var patient_panel = new sap.ui.commons.Panel("patient_panel");
		patient_panel.setTitle(new sap.ui.core.Title({text: "Schritt 1: Patient waehlen/ anlegen",icon : "sap-icon://wounds-doc"}));
		
		var conditn_panel = new sap.ui.commons.Panel("conditn_panel");
		conditn_panel.setTitle(new sap.ui.core.Title({text: "Schritt 2: Diagnose waehlen",				 icon : "sap-icon://electrocardiogram",
}));
		
		var treat_panel = new sap.ui.commons.Panel("treat_panel");
		treat_panel.setTitle(new sap.ui.core.Title({text: "Schritt 3: Behandlungsplan waehlen"}));
		
		var user_panel = new sap.ui.commons.Panel("user_panel");
		user_panel.setTitle(new sap.ui.core.Title({text: "Schritt 4: Mitarbeiter waehlen"}));
		
		
		var bed_panel = new sap.ui.commons.Panel("bed_panel");
		bed_panel.setTitle(new sap.ui.core.Title({text: "Schritt 5: Bett waehlen"}));
				
		var insurancenumber_label = new sap.ui.commons.Label({text: "Versichertennummer: "});
		var insnr_comb_temp = new sap.ui.core.ListItem({text:"{Insurancenumber}", additionalText:"{Lastname}"});
		
		var insurancenumber_input = new sap.ui.commons.ComboBox("Insurancenumber_input",
				{displaySecondaryValues: true,
				items: {path: "/PATIENT",
				 template: insnr_comb_temp,
				 }});
	//		
		var firstname_label = new sap.ui.commons.Label({text: "Vorname: ", width: "150px"});
		var firstname_input = new sap.ui.commons.TextField("Firstname_input");
		
		var lastname_label = new sap.ui.commons.Label({text: "Nachname: ", width: "150px"});
		var lastname_input = new sap.ui.commons.TextField("Lastname_input");
	
		var postalcode_label = new sap.ui.commons.Label({text: "PLZ: ", width: "150px"});
		var postalcode_input = new sap.ui.commons.TextField("Postalcode_input");
		
		var city_label = new sap.ui.commons.Label({text: "Stadt: ", width: "150px"});
		var city_input = new sap.ui.commons.TextField("City_input");
		
		var street_label = new sap.ui.commons.Label({text: "Strasse: ", width: "150px"});
		var street_input = new sap.ui.commons.TextField("Street_input");
		
		var country_label = new sap.ui.commons.Label({text: "Land: ", width: "150px"});
		var country_input = new sap.ui.commons.TextField("Country_input");
		
		var fields = ["Firstname", "Lastname", "Street", "Postalcode", "City", "Country"];
		

	
	

			
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

		// Choose diagnosis
		var conditn_panel_layout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});
		
		var conditn_label = new sap.ui.commons.Label({text: "Krankheit:        ", width: "150px"});
		var conditn_comb_temp = new sap.ui.core.ListItem({text:"{Name}", key:"{ConditionID}", additionalText:"{Description}"});
		
		var conditn_input = new sap.ui.commons.ComboBox("Condition_input",
				{displaySecondaryValues: true, 
				items: {path: "/CONDITN",
				 template: conditn_comb_temp,
				 }});
		
		//conditn_input.attachChange((function(){  oController.check_conditn_exists(conditn_input.getValue());}));

		conditn_panel_layout.createRow(conditn_label, conditn_input);
		conditn_panel.addContent(conditn_panel_layout);
		
		// Choose Treatmentplan
		var treat_panel_layout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});
		
		var treat_label = new sap.ui.commons.Label({text: "Behandlungsplan:        ", width: "150px"});
		var treat_comb_temp = new sap.ui.core.ListItem({text:"{Name}", key:"{TreatPlanID}", additionalText:"{Duration}"});
		
		var treat_input = new sap.ui.commons.ComboBox("Treatment_input",
				{displaySecondaryValues: true, 
				items: {path: "/TREATPL",
				 template: treat_comb_temp,
				 }});

		var treat_create_button = new sap.ui.commons.Button({
	        text : "Plan anlegen",
	        width: "150px",
	        icon : "sap-icon://clinical-order",
//	        width : "200px",
	        press : function() {oController.create_treat();
			}
	    	
		});
		
		var treat_begin_label = new sap.ui.commons.Label({text: "Beginn Behandlungsplan:        ", width: "150px"});

		
		var treat_begin_date = new sap.ui.commons.DatePicker('Treat_begin');
		treat_begin_date.setLocale("en-US");
		
		//treat_begin_date.setYyyymmdd("20140101");
		//var now = new Date();
		
		
		treat_panel_layout.createRow(treat_label, treat_input, treat_create_button);
		treat_panel_layout.createRow(treat_begin_label, treat_begin_date);
		
//		treat_panel_layout.createRow(treat_create_button);
		treat_panel.addContent(treat_panel_layout);
		
		// Mapping to users (nurses and doctors)
		
		var user_panel_layout = new sap.ui.commons.layout.MatrixLayout({
			height: "200px",
			layoutFixed : true,
			});
		
		var user_panel_layout_top = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});
		
		var user_label = new sap.ui.commons.Label({text: "Zustaendig:        ", width: "150px"});
		var user_comb_temp = new sap.ui.core.ListItem({text:"{Username}", key:"{UserID}", additionalText:"{Lastname}"});
		
		var user_input = new sap.ui.commons.ComboBox("User_input",
				{displaySecondaryValues: true, 
				items: {path: "/USER",
				 template: user_comb_temp,
				 }});
		var aData = []; 

		var user_add_button = new sap.ui.commons.Button({
	        text : "Mitarbeiter zuweisen",
	        icon : "sap-icon://clinical-order",
//	        width : "200px",
	        press : function() {oController.add_user(user_input, aData);
			}
	    	
		});
		
		var user_temp_table = new sap.ui.table.Table("user_temp_table",{ 
			selectionMode: sap.ui.table.SelectionMode.Single,
			width: "450px",
			height: "150px",
			rowSelectionChange: function(oEvent){
				var currentRowContext = oEvent.getParameter("rowContext").getPath();
				var model = user_temp_table.getModel();
				data = model.getProperty(currentRowContext);
			}
		});
		
//		user_temp_table.addColumn(  
//				new sap.ui.table.Column({  
//				label: new sap.ui.commons.Label({text: "UserID:"}),  
//				template: new sap.ui.commons.TextField().bindProperty("value", "UserID"),  
//				sortProperty: "UserID", 
//				}));  

		
		user_temp_table.addColumn(  
		new sap.ui.table.Column({  
		label: new sap.ui.commons.Label({text: "Username:"}),  
		template: new sap.ui.commons.TextField().bindProperty("value", "Username"),  
		sortProperty: "Username", 
		}));  

		user_temp_table.addColumn(  
		new sap.ui.table.Column({  
		label: new sap.ui.commons.Label({text: "Vorname:"}),  
		template: new sap.ui.commons.TextField().bindProperty("value", "Firstname"),  
		sortProperty: "Firstname",
		
		}));  
		
		user_temp_table.addColumn(  
		new sap.ui.table.Column({  
		  label: new sap.ui.commons.Label({text: "Nachname"}),  
		  template: new sap.ui.commons.TextField().bindProperty("value", "Lastname"),  
		  sortProperty: "Lastname",
		 
		}));  
		
		
		
		
		user_panel_layout_top.createRow(user_label, user_input, user_add_button);
		user_panel_layout.createRow(user_panel_layout_top);
		user_panel_layout.createRow(user_temp_table);
		user_panel.addContent(user_panel_layout);
		
		
		var aData = []; 
		
		/**
		*  Set Data model for temp table
		*/
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData({modelData: aData});
		user_temp_table.setModel(oModel);
		user_temp_table.bindRows("/modelData");
		
		
		
		// Bed functionalities
		var bed_panel_layout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});
		var bed_label = new sap.ui.commons.Label({text: "Bett:        ", width: "150px"});
		var bed_comb_temp = new sap.ui.core.ListItem({text:"{BedID}", key:"{BedID}", additionalText:"{RoomID}"});
		
		var bed_input = new sap.ui.commons.DropdownBox("Bed_input",
				{displaySecondaryValues: true, 
				items: {path: "/BED?$filter=Istaken eq 'FALSE'",
				 template: bed_comb_temp,
				 }});
		bed_panel_layout.createRow(bed_label, bed_input);
		
		var patient = []; 

		
		var hospi_create_button = new sap.ui.commons.Button({
	        text : "Patient einweisen",
	        icon : "sap-icon://sys-enter",
//	        width : "200px",
	        press : function() {
		    		patient.Firstname = firstname_input.getValue();
		    		patient.Lastname =  lastname_input.getValue();
		    		patient.Street = street_input.getValue();
		    		patient.Postalcode = postalcode_input.getValue();
		    		patient.City = city_input.getValue();
		    		patient.Country = country_input.getValue();
		    		patient.Insurancenumber = insurancenumber_input.getValue();
	        		
	        		oController.create_hospi(patient, conditn_input, treat_input, treat_begin_date, user_temp_table, bed_input, hospi_begin_date, aData);
			}
	    	
		});
		
		var hospi_begin_label = new sap.ui.commons.Label({text: "Begin Einweisung:        ", width: "150px"});

		
		var hospi_begin_date = new sap.ui.commons.DatePicker('Hospi_begin');
		hospi_begin_date.setLocale("en-US");
		hospi_begin_date.setYyyymmdd(new Date().getFullYear().toString()+"-"+(new Date().getMonth()+1).toString()+"-"+new Date().getDate().toString());
		treat_begin_date.setYyyymmdd(new Date().getFullYear().toString()+"-"+(new Date().getMonth()+1).toString()+"-"+new Date().getDate().toString());
				

		
		bed_panel_layout.createRow(hospi_begin_label, hospi_begin_date);

		bed_panel_layout.createRow(hospi_create_button);
		bed_panel.addContent(bed_panel_layout);

		/** 
	   * Create Buttons:
	   */
		insurancenumber_input.attachChange(null, function(){oController.create_patient(insurancenumber_input.getValue(), fields);});


		
		
		
		
		
		left_layout.createRow(patient_panel);
		left_layout.createRow(conditn_panel);
		left_layout.createRow(treat_panel);
		left_layout.createRow(user_panel);
		left_layout.createRow(bed_panel);

		layout.createRow(left_layout, right_layout);
		
		
		
		
		
		
		
		
		
		
		
	
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
