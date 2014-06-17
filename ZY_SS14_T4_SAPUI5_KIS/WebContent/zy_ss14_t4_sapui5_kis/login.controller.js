sap.ui.controller("zy_ss14_t4_sapui5_kis.login", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf zy_ss14_t4_sapui5_kis.login
*/
	onInit: function() {
		var path = new sap.ui.commons.Label("path",{text:"proxy/http/i67lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/ZY_SS14_T4_SEGW_KIS_SRV"});
		//var path = new sap.ui.commons.Label("path",{text:"/sap/opu/odata/sap/ZY_SS14_T4_SEGW_KIS_SRV"});

		
		var oModel = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);
		sap.ui.getCore().setModel(oModel);
		
	},
	
	validateLogin: function(userid, password){
		
		var oModel = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);
		oModel.refreshSecurityToken(null, null);

		
		oModel.read("USER(Mandt='001',UserID="+userid+")",undefined, undefined, true, 
			// Funktion für erfolgreichen Request	
			function(response){
				if(password == response.Password){
					shell.setAppTitle("Logged in as: "+response.Username);
					shell.addWorksetItem(new sap.ui.ux3.NavigationItem("index_nav", {key:"index",text:"HOME"}));
					shell.addWorksetItem(new sap.ui.ux3.NavigationItem("hospitalization_nav", {key:"hospitalization",text:"Krankenhausaufenthalt"}));
					shell.addWorksetItem(new sap.ui.ux3.NavigationItem("aktuelles_nav", {key:"patient",text:"AKTUELLES", 
						subItems:[new sap.ui.ux3.NavigationItem("patient_nav", {key:"patient",text:"PATIENT"}),
						          new sap.ui.ux3.NavigationItem("disease_nav", {key:"disease",text:"KRANKHEITEN"}),
						          new sap.ui.ux3.NavigationItem("disease_plan_nav", {key:"disease_plan",text:"BEHANDLUNGSPLAENE"}),
						          new sap.ui.ux3.NavigationItem("medication_nav", {key:"medication",text:"MEDIKAMENTE"})
						          ]}));					

				
					
					shell.attachWorksetItemSelected(function(oEvent) {
						var itemKey = oEvent.getParameter("key");
						shell.setContent(sap.ui.getCore().byId(itemKey));	
						
					});
					shell.setContent(sap.ui.getCore().byId("index"));
					
					var username_label = sap.ui.getCore().byId("username");
					var firstname_label = sap.ui.getCore().byId("firstname");
					var lastname_label = sap.ui.getCore().byId("lastname");
					var role_image = sap.ui.getCore().byId("role");
					
					username_label.setText("Username: "+response.Username);
					firstname_label.setText("Firstname: "+response.Firstname);
					lastname_label.setText("Lastname: "+response.Lastname);
					
					if (response.RoleID == 1)
						role_image.setSrc("images/doctor.png");
					if (response.RoleID == 2)
						role_image.setSrc("images/nurse.png");
					
					var hospi_table = sap.ui.getCore().byId("hospi");
	
					var id_filter = new sap.ui.model.Filter("UserID", sap.ui.model.FilterOperator.EQ, userid);
					hospi_table.setModel(oModel);  
					hospi_table.bindRows(   {path: "/HOSPI",

						    filters: id_filter });  

				}
				else{
					alert("Es wurde ein falsches Passwort eingegeben.");
				}
			// Funktion falls Request fehlgeschlagen - Annahme: Request ist wegen falschem
			// Usernamen fehlgeschlagen
			},function(err){
				sap.ui.commons.MessageBox.alert(err.message);
			}
				 );
		
	},
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf zy_ss14_t4_sapui5_kis.login
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf zy_ss14_t4_sapui5_kis.login
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf zy_ss14_t4_sapui5_kis.login
*/
//	onExit: function() {
//
//	}

});