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
	
	validateLogin: function(username, password){
		
		var oModel = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);
		oModel.refreshSecurityToken(null, null);

		
		oModel.read("USER?$filter=Username eq '"+username+"'",undefined, undefined, true, 
			// Funktion für erfolgreichen Request	

				
			function(data, response){
				if(password == data.results[0].Password){
					
					var userid = new sap.ui.commons.Label("globalUserID");
					userid.setText(data.results[0].UserID);
					
					
					shell.setAppTitle("Angemeldet als: "+data.results[0].Username);
					shell.addWorksetItem(new sap.ui.ux3.NavigationItem("index_nav", {key:"index",text:"HOME"}));
					shell.addWorksetItem(new sap.ui.ux3.NavigationItem("hospitalization_nav", {key:"hospitalization",text:"Krankenhausaufenthalt",
						subItems:[new sap.ui.ux3.NavigationItem("hospitalization_overview_nav", {key:"hospitalization_overview",text:"Uebersicht"}),
						          new sap.ui.ux3.NavigationItem("hospitalization_new_nav", {key:"hospitalization_new",text:"Patient einweisen"}),
						          new sap.ui.ux3.NavigationItem("hospitalization_displace_nav", {key:"hospitalization_displace",text:"Patient entlassen"})
								 ]}));
					shell.addWorksetItem(new sap.ui.ux3.NavigationItem("aktuelles_nav", {key:"patient",text:"Verwaltung", 
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
					
					username_label.setText("Benutzername: "+data.results[0].Username);
					firstname_label.setText("Vorname: "+data.results[0].Firstname);
					lastname_label.setText("Familienname: "+data.results[0].Lastname);
					
					if (data.results[0].RoleID == 1)
						role_image.setSrc("images/doctor.png");
					if (data.results[0].RoleID == 2)
						role_image.setSrc("images/nurse.png");
					
					var hospi_table = sap.ui.getCore().byId("hospi");
	
					var id_filter = new sap.ui.model.Filter("UserID", sap.ui.model.FilterOperator.EQ, data.results[0].UserID);
					hospi_table.setModel(oModel);  
					hospi_table.bindRows(   {path: "/HOSPI", filters: id_filter });  
					
					// Create Notifications
					// Get Notification Bar
					var notification_bar = sap.ui.getCore().byId("notification_bar");
					var notifier = sap.ui.getCore().byId("notifier");
					
					
					// First define function for successful hospi request
					var hospi_params = {};
					hospi_params.success = function(data, results){
						
						// If hospi request was successful, request dataset from matching TreatmentplanIDs of
						// Tremd to get administration intervals
						var tremd_params = {};
						
						tremd_params.success = function(data, results){
							var patient = patient_data.shift();
							
							for(var i = 0; i < data.results.length; i++){
					    		
								var hours = new Date();
								hours = hours.getHours();
								
								// Check for next 4 hours
								for (var interval = hours; interval < hours + 4; interval++){
									
									// If current time (+1, +2, +3..) is divisible by administration intervall,
									// set notification (e.g. 18 o clock is divisible by Interval "9" --> set notification
									// for 18 o clock, but not for 17:00 or 19:00
									
									if (interval %  data.results[i].AdministrationInterval == 0){
										var text = patient+" benoetigt heute "+data.results[i].MedicationName+" um "+interval+" Uhr.";
										var now = (new Date());
										var oMessage = new sap.ui.core.Message({
											text : text,
											timestamp : now
										});
										notifier.addMessage(oMessage);
									}
								}
								
					    		

							}
							
						};
						
						// for each treatmentplan according to logged in user
						
						var patient_data = [];
						
						
						// Store Patient names in array to use them in oMessage
						for(var i = 0; i < data.results.length; i++){
				    		patient_data.push(data.results[i].Patient) ;
				    		
				    	}
						
				    	for(var i = 0; i < data.results.length; i++){
	
							oModel.read("/TREMD?$filter=TreatPlanID eq "+data.results[i].TreatPlanID, tremd_params,null,false);
							
				    	}
				    	
				    };
				    hospi_params.error = function(){};
				       
//					oModel_hospi = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);
					oModel.read("/HOSPI?$filter=UserID eq "+data.results[0].UserID, hospi_params);
					//
					
					
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
		
		
		function createCookie(name,value,days) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
			}
			else var expires = "";
			document.cookie = name+"="+value+expires+"; path=/";
		};
		
		function readCookie (name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return null;
		};
		
	},
	
	



	 eraseCookie: function(name) {
		createCookie(name,"",-1);
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