sap.ui.jsview("zy_ss14_t4_sapui5_kis.login", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zy_ss14_t4_sapui5_kis.login
	*/ 
	getControllerName : function() {
		return "zy_ss14_t4_sapui5_kis.login";
	},
	
	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zy_ss14_t4_sapui5_kis.login
	*/ 
	createContent : function(oController) {
		
		
		
		var layout = new sap.ui.commons.layout.AbsoluteLayout({width:"340px",height:"150px"});
		layout.addStyleClass("CustomStyle");

		var description_label = new sap.ui.commons.Label({text:"Benutzername"});
		var username_input = new sap.ui.commons.TextField({width:"190px"});
		
		description_label.setLabelFor(username_input);
		
		layout.addContent(description_label, {right:"248px",top:"20px"});
		layout.addContent(username_input, {left:"110px",top:"20px"});

		description_label = new sap.ui.commons.Label({text:"Passwort"});
		var password_input = new sap.ui.commons.PasswordField({width:"190px"});
		description_label.setLabelFor(password_input);
		layout.addContent(description_label, {right:"248px",top:"62px"});
		layout.addContent(password_input, {left:"110px",top:"62px"});

		var login_button = new sap.ui.commons.Button({text:"Anmelden",width:"133px"});
		login_button.attachPress(function(){oController.validateLogin(username_input.getValue(), password_input.getValue());});
		layout.addContent(login_button, {left:"110px",top:"104px"});
		//alert("Loggin in as '"+username_input.getValue()+"' and password '"+password_input.getValue()+"'.")
		
		
		
//		
//		user_table.addColumn(new sap.ui.table.Column({
//			label : new sap.ui.commons.Label({
//			text : "Username"
//			}),
//			template : new sap.ui.commons.TextField().bindProperty("value",
//			"Username"),
//			sortProperty : "Username"
//			}));
		
		//layout.addContent(user_table,{left:"110px",top:"150px"});
		
		return layout;
	}

});
