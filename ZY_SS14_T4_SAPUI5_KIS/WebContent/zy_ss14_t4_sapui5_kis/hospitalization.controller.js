sap.ui.controller("zy_ss14_t4_sapui5_kis.hospitalization", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf zy_ss14_t4_sapui5_kis.hospitalization
*/
	onInit: function() {
	
	var oModel = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);
	sap.ui.getCore().setModel(oModel);
	},

	/**
	 * Function to create a new hospitalisation 
	 * @param patient
	 * @param conditn_input
	 * @param treat_input
	 * @param treat_begin_date
	 * @param user_temp_table
	 * @param bed_input
	 * @param hospi_begin_date
	 * @param aData
	 */
	
	
	
	create_hospi: function(patient, conditn_input, treat_input, treat_begin_date, user_temp_table, bed_input, hospi_begin_date, aData){
		
		// Define function for completion checks
		// Is used for every try of create hospi
		var oModel = sap.ui.getCore().getModel(); 

		
		function check_data(patient, conditn_input, treat_input, treat_begin_date, user_temp_table, bed_input, hospi_begin_date, aData){
			var valid = true; 
			var oModel = sap.ui.getCore().getModel(); 

			// Check patient data 
			if(patient.Insurancenumber == "" || patient.Firstname == "" || patient.Lastname == "" || patient.Postalcode == "" || patient.City == "" || patient.Street == "" || patient.Country == ""){
				valid = false;
				
				jQuery.sap.require("sap.ui.commons.MessageBox");
				
				sap.ui.commons.MessageBox.show("Patientendaten unvollstaendig.",
						sap.ui.commons.MessageBox.Icon.ERROR,
						"Fehlermeldung");
			} 
			
			
			// Check if condition exists
			name = conditn_input.getValue();
			oModel.read("/CONDITN?$filter=Name eq '"+name+"'" ,undefined, undefined, true,
					function(data, response){
				
				try{
					if (data.results[0].ConditionID != ''){
								
				
					}
				} catch(e) {
					valid = false;
					jQuery.sap.require("sap.ui.commons.MessageBox");
					sap.ui.commons.MessageBox.show("Krankheit nicht vorhanden.",
							sap.ui.commons.MessageBox.Icon.ERROR,
							"Fehlermeldung");
				}
			
			});

			// Check for vadility of treatment tab
			if (treat_input.getSelectedKey() == "" ){
				valid = false;
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.show("Behandlungsplan nicht vorhanden.",
						sap.ui.commons.MessageBox.Icon.ERROR,
						"Fehlermeldung");
			}
			if(new Date(treat_begin_date.getValue()).getDate() < new Date().getDate() || treat_begin_date.getValue() ==""){
				valid = false;
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.show("Start des Behandlungsplans ungueltig.",
						sap.ui.commons.MessageBox.Icon.ERROR,
						"Fehlermeldung");
			}

			// Check if valid users are assigned
			
			if(aData.length == 0){
				valid = false;
			
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.show("Zuordnung zu Mitarbeitern fehlerhaft.",
						sap.ui.commons.MessageBox.Icon.ERROR,
						"Fehlermeldung");
			}
			
			// Check for vadility of hospitalizazion date

			if(new Date(hospi_begin_date.getValue()).toDateString() < new Date().toDateString() || hospi_begin_date.getValue() ==""){
				valid = false;
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.show("Start der Einweisung ungueltig.",
						sap.ui.commons.MessageBox.Icon.ERROR,
						"Fehlermeldung");
			}
			
			if(new Date(treat_begin_date.getValue()).toDateString() < new Date(hospi_begin_date.getValue()).toDateString() ){
				valid = false;
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.show("Behandlungsplan darf nicht vor der Einweisung starten.",
						sap.ui.commons.MessageBox.Icon.ERROR,
						"Fehlermeldung");
			}
			

			return valid;
		};
		
		// Setup patients to use them successfully in hospitalization
		var patientid;
		
		var insnr = patient.Insurancenumber;
		

		
		/**
		 * Get all Patient informations according to the choosen insurancenumber
		 */
		var valid = check_data(patient, conditn_input, treat_input, treat_begin_date, user_temp_table, bed_input, hospi_begin_date, aData);
		if(valid){

		oModel.read("/PATIENT?$filter=Insurancenumber eq '"+insnr+"'" ,undefined, undefined, true,
				function(data, response){
			
			try {
				/** 
				 * in case the patient exist... 
				 */
				if(data.results[0].PatientID != ""){
					var oEntry = {
					};	

		
					oEntry.Mandt = '001';
					oEntry.PatientID = data.results[0].PatientID;
					patientid = data.results[0].PatientID;
					
					oEntry.Firstname = patient.Firstname;
					oEntry.Lastname = patient.Lastname;
					oEntry.Insurancenumber = patient.Insurancenumber;
					oEntry.Postalcode = patient.Postalcode;
					oEntry.City =  patient.City;
					oEntry.Street =  patient.Street;
					oEntry.Country = patient.Country;
					
					var oParams = {};
				    oParams.success = function(){};
				    oParams.error = function(){};
				       
					
					oModel.update("/PATIENT(Mandt='001',PatientID="+data.results[0].PatientID+")", oEntry, oParams);
				}
				
				
			} catch(e) {
				
				var oEntry = {
				};	
				
				oEntry.Mandt = '001';
				oEntry.PatientID = 1;
				oEntry.Firstname = patient.Firstname;
				oEntry.Lastname = patient.Lastname;
				oEntry.Insurancenumber = patient.Insurancenumber;
				oEntry.Postalcode = patient.Postalcode;
				oEntry.City =  patient.City;
				oEntry.Street =  patient.Street;
				oEntry.Country = patient.Country;
				
				var oParams = {};
			    oParams.success = function(data, response){
			    	patientid = data['PatientID'];
			    
			    };
			    oParams.error = function(){};
			       
				
				oModel.create("/PATIENT", oEntry, oParams);
	
			}
		
			var hospi_entry = {
			};
			
			/**
			 * get all informations about the hospitalisation 
			 */
			hospi_entry.Mandt = '001';
			hospi_entry.HospitaliznID = 1;
			hospi_entry.TreatPlanID = treat_input.getSelectedKey();
			
			hospi_entry.PatientID = patientid;
			hospi_entry.BedID = bed_input.getValue();
			hospi_entry.DateBegin = new Date(hospi_begin_date.getValue());
			hospi_entry.StartOfTreatmentPlan = new Date(treat_begin_date.getValue());
			hospi_entry.TreatmentRating = 0;
			
			var oParams = {};
			/**
			 * functions to call, when the creation of a new hospit. is successful or when something went wrong
			 */
			oParams.success = function(data, response){
				var hospitaliznID = data['HospitaliznID'];
			
				
				
				var patcon_entry = {
				};	
				
				var patcon_params = {};
				
				patcon_params.success = function(data, response){
						
					/**
					 * Enter all persons who are in contact with the patient 
					 */
					while (aData.length > 0) {
						var hosuse_entry = {
						};
						var getTblData = aData.pop();
						
						
						hosuse_entry.Mandt = '001';
						hosuse_entry.HospitaliznID = hospitaliznID;
						hosuse_entry.UserID =  getTblData['UserID'];
						
						var oModel2 = sap.ui.getCore().getModel(); 

						oModel2.create("/HOSUSE", hosuse_entry);
						
						
						/**
						 * Change status of a bed to istaken=true
						 */
				    	var oModel = sap.ui.getCore().getModel(); 
				    	
				    	oModel.read("/BED(Mandt='001',BedID="+bed_input.getValue()+")" , null, null, true,
								function(data, response){
				            
				                try {
									var test = {
											"Mandt": data['Mandt'],
											"BedID": data['BedID'],
											"RoomID" : data['RoomID'],
											"Isactive" : data['Isactive'],
											"Istaken" : "TRUE"
									};
									
									var oParams2 = {};
								    oParams2.success = function(){
										$.growl.notice({ title: "Meldung", message: "Patient erfolgreich eingewiesen!" });

										var aData = []; 
										
										/**
										 *  Update Combobox in Hospitalization-Displace
										 */
										var oModelInsNr = new sap.ui.model.json.JSONModel();
										oModelInsNr.setData({modelDatas: aData});
								   
										sap.ui.getCore().setModel(oModelInsNr, "myModel");
								        var oModel = sap.ui.getCore().getModel(); 
								        
								        oModel.read("/HOSPTZN?$filter=DateEnd eq datetime'0000-00-00T00:00'" , null, null, false,
												function(data, response){
								        			
								        			for (var i=0; i < data.results.length; i++) {
								        				
								        				var oEntry = {	
								        				};
								        				oEntry.HospitaliznID = data.results[i].HospitaliznID;
								        				oEntry.TreatPlanID = data.results[i].TreatPlanID;
								        				oEntry.PatientID = data.results[i].PatientID;
								        				oEntry.BedID = data.results[i].BedID;
								        				oEntry.DateBegin = data.results[i].DateBegin;
								        				oEntry.StartOfTreatmentPlan = data.results[i].StartOfTreatmentPlan;
								        				oEntry.TreatmentRating = data.results[i].TreatmentRating;
								        				
								        				 var oModel2 = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);
								        					oModel2.refreshSecurityToken(null, null);
								        
								        			        oModel2.read("/PATIENT(Mandt='001',PatientID="+data.results[i].PatientID+")" , null, null, false,
								        							function(data2, response){
								        			        	
								        						var test = {
								        								"Insurancenumber": data2['Insurancenumber'],
								        								"Firstname": data2['Firstname'],
								        								"Lastname": data2['Lastname'],
								        								"HospitalizationID": oEntry.HospitaliznID,
								        								"TreatPlanID": oEntry.TreatPlanID,
								        								"PatientID": oEntry.PatientID, 
								        								"BedID" : oEntry.BedID,
								        								"DateBegin" : oEntry.DateBegin,
								        								"StartOfTreatmentPlan": oEntry.StartOfTreatmentPlan,
								        								"TreatmentRating": oEntry.TreatmentRating,
								        						};
								        						
								        						aData.push(test);
								        						
								        			        });
								        			};
								        				
								        });

						
								        var getinsnr_com_temp = sap.ui.getCore().byId("insnr_com_temp");
								        getinsnr_com_temp.bindProperty("text", "myModel>Insurancenumber");
								        getinsnr_com_temp.bindProperty("key", "myModel>HospitalizationID");
								        getinsnr_com_temp.bindProperty("additionalText", "myModel>Lastname");
								       
								        getInsurnumber_input.setValue("");
								        getInsurnumber_input.bindItems("myModel>/modelDatas", getinsnr_com_temp);
								    
								    	
								    	//Update Notification Bar
								        

								    	
								    };
								    oParams2.async = false;
							    	oParams2.error = function(){};
									var oModel = sap.ui.getCore().getModel(); 
									oModel.update("/BED(Mandt='001',BedID="+data['BedID']+")", test, oParams2);
									oModel.read("/BED?$filter=Istaken eq 'FALSE'");
									var bed_input = sap.ui.getCore().byId("Bed_input");
									
							    	var oFilter = new sap.ui.model.Filter("Istaken", sap.ui.model.FilterOperator.EQ, "FALSE");
									
							    	bed_input.bindItems("/BED", bed_comb_temp, null, [oFilter]);
							    	
							    	
	
									

				                } catch(e) { }
				                

				    	});
						
						
						/**
						 * Refresh-procedure for tables 
						 */
						var hospi_table = sap.ui.getCore().byId("hospitalization_Overview_Table");
							
						var oModel = sap.ui.getCore().getModel();  
						
						hospi_table.setModel(oModel);  
						hospi_table.bindRows('/HOSOV'); 
						
						var hospi_disease_table = sap.ui.getCore().byId("tblHospiDisease");
						
						var oModel = sap.ui.getCore().getModel();  
						
						hospi_disease_table.setModel(oModel);  
						hospi_disease_table.bindRows('/HOSDE'); 
						
						var hospi_table = sap.ui.getCore().byId("hospi");
						
						var id_filter = new sap.ui.model.Filter("UserID", sap.ui.model.FilterOperator.EQ, sap.ui.getCore().byId("globalUserID").getText());
						hospi_table.setModel(oModel);  
						hospi_table.bindRows(   {path: "/HOSPI", filters: id_filter }); 
//				
				
						var Insurancenumber_input = sap.ui.getCore().byId("Insurancenumber_input");
						var insnr_comb_temp = sap.ui.getCore().byId("EinweisComboTemp");
				        insnr_comb_temp.bindProperty("text", "Insurancenumber");
				        insnr_comb_temp.bindProperty("additionalText", "Lastname");
						Insurancenumber_input.bindItems("/PACOM", insnr_comb_temp);
						
						/**
						 * Nill all fields in this View
						 */
						
						sap.ui.getCore().byId("Insurancenumber_input").setValue("");
						sap.ui.getCore().byId("Firstname_input").setValue("");					
						sap.ui.getCore().byId("Lastname_input").setValue("");					
						sap.ui.getCore().byId("Postalcode_input").setValue("");						
						sap.ui.getCore().byId("City_input").setValue("");	
						sap.ui.getCore().byId("Street_input").setValue("");					
						sap.ui.getCore().byId("Country_input").setValue("");
						
						
						
						sap.ui.getCore().byId("Condition_input").setValue("");
						sap.ui.getCore().byId("Treatment_input").setValue("");
						sap.ui.getCore().byId("User_input").setValue("");
						sap.ui.getCore().byId("Bed_input").setValue("");
						
						sap.ui.getCore().byId("user_temp_table").removeAllCustomData();
						
						var notification_bar = sap.ui.getCore().byId("notification_bar");
						var notifier = sap.ui.getCore().byId("notifier");
						
						var patient_data = [];
						var patient = '';
						
						notifier.destroyMessages();
						
						//Update notification bar
						
						var userid = sap.ui.getCore().byId("globalUserID");
						userid = userid.getText();
						
						var hospi_params = {};
						hospi_params.success = function(data, results){
							
							// If hospi request was successful, request dataset from matching TreatmentplanIDs of
							// Tremd to get administration intervals
							var tremd_params = {};
							tremd_params.async = false;
							tremd_params.success = function(data, results){
								patient = patient_data.shift();
								
								for(var i = 0; i < data.results.length; i++){
//						    		alert(patient+" "+data.results[i].MedicationName);
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
							
						
							
							// Store Patient names in array to use them in oMessage
							
							
					    	for(var i = 0; i < data.results.length; i++){
					    		patient_data.push(data.results[i].Patient) ;
					    		
								oModel.read("/TREMD?$filter=TreatPlanID eq "+data.results[i].TreatPlanID, tremd_params);
								
					    	}
					    	
					    };
					    hospi_params.error = function(){};
					       
//						oModel_hospi = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);
						oModel.read("/HOSPI?$filter=UserID eq "+userid, hospi_params);
					
						
					}
					
					

				};
				patcon_params.error = function(){
				};
				
				/**
				 * Information about the condition of a patient
				 */
				patcon_entry.Mandt = '001';
				patcon_entry.HospitaliznID = data['HospitaliznID'];
				patcon_entry.ConditionID = conditn_input.getSelectedKey();
				
				var oModel3 = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);
				oModel3.create("/PATCON", patcon_entry, patcon_params);
				
		    };
		    
		    oParams.error  = function(){
			};

			// Check if data is correct
			
			
			oModel.create("/HOSPTZN", hospi_entry, oParams);

			
			
			
		

		});
		}
		
	},
	
	
	add_user: function(user_input, aData){
	
		
		// Filtern nach Versichertennummer
		var user_temp_table = sap.ui.getCore().byId("user_temp_table");

		var oModel2 = new sap.ui.model.json.JSONModel();
		oModel2.setData({modelData: aData});
		user_temp_table.setModel(oModel2);
		user_temp_table.bindRows("/modelData");
		
		var oModel = sap.ui.getCore().getModel(); 
		oModel.read("/USER(Mandt='001',UserID="+user_input.getSelectedKey()+")" , null, null, true,
				function(data, response){

			try {
				
				
				var test = {
						"UserID": user_input.getSelectedKey(),
						"Username": user_input.getValue(),
						"Firstname" : data['Firstname'],
						"Lastname" : data['Lastname']
				};
				aData.push(test);
				
				user_temp_table.bindRows("/modelData");

			
		} catch(e) { }
		
		});
	},
	
	create_treat: function (){
		var disease_plan_layout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});
		var disease_plan_dialog = new sap.ui.commons.Dialog();
		var oModel = sap.ui.getCore().getModel(); 
		
		
		/**
		*  Create Panels
		*/
		var disease_plan_panel_pop = new sap.ui.commons.Panel();
		disease_plan_panel_pop.setTitle(new sap.ui.core.Title({text: "Schritt 1: Informationen zum Behandlungsplan eintragen",icon : "sap-icon://wounds-doc"}));
		
		var medication_panel_pop = new sap.ui.commons.Panel();
		medication_panel_pop.setTitle(new sap.ui.core.Title({text: "Schritt 2: Medikamente hinzufuegen" ,icon : "sap-icon://pharmacy"}));
		
		var medication_table_panel_pop = new sap.ui.commons.Panel();
		medication_table_panel_pop.setTitle(new sap.ui.core.Title({text: "Schritt 3: Uebersicht ueber die eingefuegten Medikamente" ,icon : "sap-icon://pharmacy"}));
		
		var close_panel_pop = new sap.ui.commons.Panel();
		close_panel_pop.setTitle(new sap.ui.core.Title({text: "Schritt 4: Behandlungsplan anlegen" ,icon : "sap-icon://accept"}));

		/**
		* Define fields and a button to insert a disease 
		*/
		var name_label = new sap.ui.commons.Label({text: "Name: ", width: "205px"});
		var name_input = new sap.ui.commons.TextField({});
		
		var description_label = new sap.ui.commons.Label({text: "Dauer (Tage): " , width: "205px"});
		var description_input = new sap.ui.commons.TextField({});
		
		var medication_label = new sap.ui.commons.Label({text: "Medikamente: ", width: "200px"});
		var medication_comb = new sap.ui.core.ListItem({text:"{Name}", key:"{MedicationID}", additionalText:"{Description}"});
		
		var medication_input = new sap.ui.commons.ComboBox(
				{displaySecondaryValues:true,items: {path: "/MEDICTN",
				 template: medication_comb}});

		var interval_label = new sap.ui.commons.Label({text: "Verabreichungsinterval (Stunden): " , width: "200px"});
		var interval_input = new sap.ui.commons.TextField({});
		
		var add_medi_button = new sap.ui.commons.Button({text: "Zum Behandlungsplan hinzufuegen" });
		add_medi_button.setEnabled(false);
		
		/**
		* Create table to display all available medications 
		*/
		var medication_temp_table = new sap.ui.table.Table({ 
								selectionMode: sap.ui.table.SelectionMode.Single,
								width: "450px",
								height: "250px",
								rowSelectionChange: function(oEvent){
									var currentRowContext = oEvent.getParameter("rowContext").getPath();
									var model = medication_temp_table.getModel();
									data = model.getProperty(currentRowContext);
								}
		});
		
		medication_temp_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Name:"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Name"),  
		          sortProperty: "Name", 
		}));  
	
		medication_temp_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Beschreibung:"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Description"),  
		          sortProperty: "Description",
		         
		}));  
		
		medication_temp_table.addColumn(  
			     new sap.ui.table.Column({  
			          label: new sap.ui.commons.Label({text: "Verabreichungsinterval (Stunden)"}),  
			          template: new sap.ui.commons.TextField().bindProperty("value", "Interval"),  
			          sortProperty: "Interval",
			         
			}));  
		
		var aData = []; 
			
		/**
		 *  Set Data model for temp table
		 */
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData({modelData: aData});
		medication_temp_table.setModel(oModel);
		medication_temp_table.bindRows("/modelData");
		
		var create_button = new sap.ui.commons.Button({text: "Neuen Behandlungsplan anlegen" });

		/**
		 * Place elements on panels
		 */
		disease_plan_dialog.setTitle("Neuen Behandlungsplan anlegen");

		var disease_plan_panel_pop_layout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});
		disease_plan_panel_pop_layout.createRow(name_label, name_input);
		disease_plan_panel_pop_layout.createRow(description_label, description_input);
		disease_plan_panel_pop.addContent(disease_plan_panel_pop_layout);
		
		var medication_panel_pop_layout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});
		medication_panel_pop_layout.createRow(medication_label, medication_input);
		medication_panel_pop_layout.createRow(interval_label, interval_input);
		medication_panel_pop_layout.createRow(add_medi_button);
		medication_panel_pop.addContent(medication_panel_pop_layout);
		
		var medication_table_panel_pop_layout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});
		
		medication_table_panel_pop_layout.createRow(medication_temp_table);
		
		medication_table_panel_pop.addContent(medication_table_panel_pop_layout);
		
		var close_panel_pop_layout = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
			});
		
		close_panel_pop_layout.createRow(null, create_button);
		close_panel_pop.addContent(close_panel_pop_layout);
		disease_plan_layout.createRow(disease_plan_panel_pop);
		disease_plan_layout.createRow(medication_panel_pop);
		disease_plan_layout.createRow(medication_table_panel_pop);
		disease_plan_layout.createRow(close_panel_pop);
		
		
		/** 
		 *  Function to enable / disable button to add medis
		 */
		interval_input.attachChange(function(){
			
			if ((interval_input.getValue() != '') && (medication_input.getValue() != ''))  {
				add_medi_button.setEnabled(true);
			} else { 
				add_medi_button.setEnabled(false);
			}
		});
		
		medication_input.attachChange(function(){
			
			if ((interval_input.getValue() != '') && (medication_input.getValue() != ''))  {
				add_medi_button.setEnabled(true);
			} else { 
				add_medi_button.setEnabled(false);
			}
		});
		
		/**
		 * Define action on press button to add medis
		 */
		add_medi_button.attachPress(function() {
			
			/**
			 * define Data model
			 */
			var oModel = sap.ui.getCore().getModel(); 
			
			// Filtern nach Versichertennummer
			
			oModel.read("/MEDICTN(Mandt='001',MedicationID="+medication_input.getSelectedKey()+")" , null, null, true,
					function(data, response){

				try {
					
					
					var test = {
							"MedicationID": medication_input.getSelectedKey(),
							"Name": medication_input.getValue(),
							"Description" : data['Description'],
							"Interval" : interval_input.getValue()
					};
					aData.push(test);
					medication_temp_table.bindRows("/modelData");

					medication_input.setValue("");
					interval_input.setValue("");
					add_medi_button.setEnabled(false);
				
			} catch(e) { }
			
			});
			
			
		});
		
		
		
		/**
		 * Define action when button create new treatment plan is pressed
		 */
		create_button.attachPress(function(){
			
			/**
			 * define data variable
			 */
			var oEntry = {};	
				
				oEntry.Mandt 		= '001';
				oEntry.Name 		= name_input.getValue();
				oEntry.Isactive 	= 'TRUE';
				oEntry.Duration   	= description_input.getValue();
				
				if ((oEntry.Name == '')||(oEntry.Duration == '') || (aData.length <1)) 
				{
					var messages = "Bitte alle Felder ausfuellen \n";

			    	jQuery.sap.require("sap.ui.commons.MessageBox");
			    	sap.ui.commons.MessageBox.show(messages, sap.ui.commons.MessageBox.Icon.ERROR, "Fehlermeldung");
					
					return;
				}
				
				/**
				 * When the treatment plan is created successful... 
				 */
				var mParameters = {};
				mParameters.success = function(data, response){
					
					/**
					 * ... add all selected medis to the just created treatment plan
					 */
					while (aData.length >0) {
						var getTblData = aData.pop();
						
						var oEntry = {};
						
						// Edit selected value in the view file (newly created treatment plan)
						var treat_comb_temp = new sap.ui.core.ListItem({text:"{Name}", key:"{TreatPlanID}", additionalText:"{Duration}"});
						var treat_input = sap.ui.getCore().byId("Treatment_input");
//						treat_input.setValue(data['TreatPlanID']);
						treat_input.bindItems("/TREATPL", treat_comb_temp);
						treat_input.setSelectedKey(data['TreatPlanID']);
						

						
						oEntry.Mandt 	= '001';
						oEntry.TreatPlanID = data['TreatPlanID'];
						oEntry.MedicationID = getTblData['MedicationID'];
						oEntry.AdministrationInterval = getTblData['Interval'];
						var oModel = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);
						oModel.create("/TREMED", oEntry);
				
					}
					disease_plan_dialog.close(); 
	            };
	            
	            mParameters.error = function(){alert("not");};

			    
			       
				var oModel = sap.ui.getCore().getModel(); 	
			
		        oModel.create("/TREATPL", oEntry, mParameters);
		        
		        
				var medication_table = sap.ui.getCore().byId("tblDiseasePlan");
				medication_table.bindRows('/TREATPL'); 

		});

		disease_plan_dialog.addContent(disease_plan_layout);
		
		disease_plan_dialog.open();
	}, 
	
	check_conditn_exists: function(name){
		
		var oModel = sap.ui.getCore().getModel(); 

		var field;
		var oEntry = {
		};	
		
			oModel.read("/CONDITN?$filter=Name eq '"+name+"'" ,undefined, undefined, true,
					function(data, response){
				
				try{
					if (data.results[0].ConditionID != ''){
								
				
					}
				} catch(e) {
					alert("neu anlegen dude");
				}
						
						
					
						var oParams = {};
					    oParams.fnSuccess = function(){ internal_dialog.close();};
					    oParams.fnError = function(){internal_dialog.open();};
					       
		
				
			});
			 },
	
	lock_patient: function(fields, patient){
	var field;	
	var fields_filled = true;
	
	var text = sap.ui.getCore().byId("Patient_lock_button").getText();

	if(text == "Daten pruefen."){
		for(var i in fields){
			field = sap.ui.getCore().byId(fields[i]+"_input");
			if(field.getValue() == ""){
				fields_filled = false;
				var label = sap.ui.getCore().byId("Patient_lock_label");
				label.setText("");

			}
		}
		if(!fields_filled)
			alert("Bitte alle Felder ausfuellen.");
		else{
			var button = sap.ui.getCore().byId("Patient_lock_button");
			button.setStyle(sap.ui.commons.ButtonStyle.Accept);
			button.setIcon("sap-icon://accept");
			button.setText("Daten korrekt.");
			
			for(var i in fields){
				field = sap.ui.getCore().byId(fields[i]+"_input");
				field.setEnabled(false);
			}
			field = sap.ui.getCore().byId("Insurancenumber_input");
			field.setEnabled(false);
			
			patient.Firstname = sap.ui.getCore().byId(fields[0]+"_input").getValue();
			patient.Lastname = sap.ui.getCore().byId(fields[1]+"_input").getValue();
			patient.Street = sap.ui.getCore().byId(fields[2]+"_input").getValue();
			patient.Postalcode = sap.ui.getCore().byId(fields[3]+"_input").getValue();
			patient.City = sap.ui.getCore().byId(fields[4]+"_input").getValue();
			patient.Country = sap.ui.getCore().byId(fields[5]+"_input").getValue();
			patient.Insurancenumber = sap.ui.getCore().byId("Insurancenumber_input").getValue();

		}
		fixed = true;

	} else{
		
		for(var i in fields){
			field = sap.ui.getCore().byId(fields[i]+"_input");
			field.setEnabled(true);
		}
		
		field = sap.ui.getCore().byId("Insurancenumber_input");
		field.setEnabled(true);
		
		var button = sap.ui.getCore().byId("Patient_lock_button");
		button.setStyle(null);
		button.setIcon("");
		button.setText("Daten pruefen.");
		fixed = false;

	}			
				
		
		
	},
	
	create_patient: function(insnr, fields){
		var oModel = sap.ui.getCore().getModel(); 

		var field;
		var oEntry = {
		};	
		
		if(insnr.length == 10){
			
			oModel.read("/PATIENT?$filter=Insurancenumber eq '"+insnr+"'" ,undefined, undefined, true,
					function(data, response){
				
				try {
					if (data.results[0].PatientID != ''){
						var valid = true;
						/**
						 * Check if patient is not in table hospit
						 */
						var oModel2 = sap.ui.getCore().getModel();
						oModel2.read("/HOSOV", undefined, undefined, false, function(data3, response3) {
							for (var i=0; i < data3.results.length; i++) {
								if (data3.results[i].PatientID == data.results[0].PatientID) {
									
									for(var i in fields){
										field = sap.ui.getCore().byId(fields[i]+"_input");
										field.setEditable(false);
										field.setValue("");
									}
									Insurancenumber_input = sap.ui.getCore().byId("Insurancenumber_input");
									Insurancenumber_input.setValue("");
									
									var messages = "Patient befindet sich bereits im Krankenhaus. \n Bitte waehlen Sie einen anderen Patienten aus. \n";
									sap.ui.commons.MessageBox.alert(messages);
									valid = false;
									return;
								}
							}
						});
					if (valid) {
						for(var i in fields){
							field = sap.ui.getCore().byId(fields[i]+"_input");
							field.setEditable(true);
							
							if(fields[i] == 'Firstname'){
								field.setValue(data.results[0].Firstname);
	//							oEntry.Firstname = field.getValue();
							}
							
							if(fields[i] == 'Lastname'){
								field.setValue(data.results[0].Lastname);
	//							oEntry.Lastname = field.getValue();
							}
							
							if(fields[i] == 'Street'){
								field.setValue(data.results[0].Street);
	//							oEntry.Street = field.getValue();
							}
							if(fields[i] == 'Postalcode'){
								field.setValue(data.results[0].Postalcode);
	//							oEntry.City = field.getValue();
							}
							if(fields[i] == 'City'){
								field.setValue(data.results[0].City);
	//							oEntry.City = field.getValue();
							}
							if(fields[i] == 'Country'){
								field.setValue(data.results[0].Country);
	//							oEntry.City = field.getValue();
							}
							
						}
					}
						
					}

						
						
					
						var oParams = {};
					    oParams.fnSuccess = function(){ internal_dialog.close();};
					    oParams.fnError = function(){internal_dialog.open();};
					       
						
						
					
			
					
				} catch(e) {

					for(var i in fields){
						field = sap.ui.getCore().byId(fields[i]+"_input");
						field.setEditable(true);
						field.setValue("");
						
						
						}
				
						var oEntry = {
						};	
												
						var oParams = {};
					    oParams.fnSuccess = function(){ internal_dialog.close();};
					    oParams.fnError = function(){internal_dialog.open();};	
				
				}
				
			});
			
		
		}
		else{
			
			for(var i in fields){
				field = sap.ui.getCore().byId(fields[i]+"_input");
				field.setValue("");
				field.setEditable(false);
			}
			
			alert("Versicherungsnummer muss 10 Zeichen haben");
			
		}
	},
	
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf zy_ss14_t4_sapui5_kis.hospitalization
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf zy_ss14_t4_sapui5_kis.hospitalization
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf zy_ss14_t4_sapui5_kis.hospitalization
*/
//	onExit: function() {
//
//	}

});