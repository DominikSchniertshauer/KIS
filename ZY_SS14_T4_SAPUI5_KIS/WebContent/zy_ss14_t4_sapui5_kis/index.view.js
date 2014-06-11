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
			});
		
		var header_label = new sap.ui.commons.Label("index_header",{text: "Benutzerdaten"});
		header_label.setDesign(sap.ui.commons.LabelDesign.Bold);

		var line_divider = new sap.ui.commons.HorizontalDivider("index_divider");
	
		
		var username_label = new sap.ui.commons.Label("username",{text:"Username"});
		var lastname_label = new sap.ui.commons.Label("firstname",{text:"Firstname"});
		var firstname_label = new sap.ui.commons.Label("lastname",{text:"Lastname"});
		
		layout.createRow(header_label);
		layout.createRow(line_divider);
		layout.createRow(username_label);
		layout.createRow(firstname_label);
		layout.createRow(lastname_label);
	    // var index_panel = new sap.ui.commons.Panel("index_panel",{width: "600px"});


	    //Attach the panel to the page
	   // layout.createRow(index_panel);
	    
		return layout;
	}

});
