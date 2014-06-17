sap.ui.jsview("zy_ss14_t4_sapui5_kis.index", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zy_ss14_t4_sapui5_kis.index
	*/ 
	getControllerName : function() {
		return "zy_ss14_t4_sapui5_kis.index";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zy_ss14_t4_sapui5_kis.index
	*/ 
	createContent : function(oController) {
		
		var layout = new sap.ui.commons.layout.MatrixLayout({
			id : 'index_layout',
			layoutFixed : false,
			columns: 2
			});
		
		var left_layout = new sap.ui.commons.layout.MatrixLayout({
			id : 'left_layout',
			layoutFixed : false,
			
			
			});
		
		var right_layout = new sap.ui.commons.layout.MatrixLayout({
			id : 'right_layout',
			layoutFixed : false
			
			});
		
		var left_header_label = new sap.ui.commons.Label("index_header",{text: "Userdata"});
		left_header_label.setDesign(sap.ui.commons.LabelDesign.Bold);
		
		var right_header_label = new sap.ui.commons.Label("right_header",{text: "Dashboard"});
		right_header_label.setDesign(sap.ui.commons.LabelDesign.Bold);
		
		var line_divider = new sap.ui.commons.HorizontalDivider();
		var line_divider2 = new sap.ui.commons.HorizontalDivider();
		var line_divider3 = new sap.ui.commons.HorizontalDivider();

		var role_image = new sap.ui.commons.Image("role");
		role_image.setWidth("200px");
		role_image.setDecorative(false);
		
		var username_label = new sap.ui.commons.Label("username",{text:""});
		var firstname_label = new sap.ui.commons.Label("firstname",{text:""});
		var lastname_label = new sap.ui.commons.Label("lastname",{text:""});
		
		var hospi_table = new sap.ui.table.Table("hospi"); 
		hospi_table.setTitle("Zugeordnete Patienten");
		hospi_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Patient"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Patient"),  
		          sortProperty: "Patient"  
		}));  
		hospi_table.addColumn(  
		     new sap.ui.table.Column("treatmentplan",{
		          label: new sap.ui.commons.Label({text: "Treatment Plan"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Treatmentplan"),  
		          sortProperty: "Treatmentplan"  
		}));  
		hospi_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Disease"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Disease"),  
		          sortProperty: "Disease"  
		}));  
			
		
		left_layout.createRow(role_image);
		left_layout.createRow(line_divider2);

		left_layout.createRow(username_label);
		left_layout.createRow(firstname_label);
		left_layout.createRow(lastname_label);
	    // var index_panel = new sap.ui.commons.Panel("index_panel",{width: "600px"});

		right_layout.createRow(hospi_table);
		
		layout.createRow(right_header_label);
		layout.createRow(line_divider, line_divider3);

		layout.createRow(left_layout, right_layout);
	    //Attach the panel to the page
	   // layout.createRow(index_panel);
	    
		return layout;
	}

});
