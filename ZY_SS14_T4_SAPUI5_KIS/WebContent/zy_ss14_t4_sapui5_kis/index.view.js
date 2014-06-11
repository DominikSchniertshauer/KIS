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
		var layout = new sap.ui.commons.layout.AbsoluteLayout({width:"340px",height:"150px"});
		layout.addStyleClass("CustomStyle");

		var description_label = new sap.ui.commons.Label({text:"Username"});
		var userid_input = new sap.ui.commons.TextField({width:"190px"});
		
		description_label.setLabelFor(userid_input);
		
		layout.addContent(description_label, {right:"248px",top:"20px"});
		layout.addContent(userid_input, {left:"110px",top:"20px"});
		return layout;
	}

});
