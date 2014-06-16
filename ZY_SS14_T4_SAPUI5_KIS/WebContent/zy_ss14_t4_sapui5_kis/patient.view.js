sap.ui.jsview("zy_ss14_t4_sapui5_kis.patient", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zy_ss14_t4_sapui5_kis.patient
	*/ 
	getControllerName : function() {
		return "zy_ss14_t4_sapui5_kis.patient";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zy_ss14_t4_sapui5_kis.patient
	*/ 
	
	createContent : function(oController) {
		var layout = new sap.ui.commons.layout.MatrixLayout({
			id : 'patient_layout',
			layoutFixed : false,
			});
	
	
		
		var header_label = new sap.ui.commons.Label("patient_header",{text: "Patientendaten"});
		header_label.setDesign(sap.ui.commons.LabelDesign.Bold);

		var line_divider = new sap.ui.commons.HorizontalDivider("patient_divider");
	
		layout.createRow(header_label);
		layout.createRow(line_divider);
	
		var panel = new sap.ui.commons.Panel('rPannel');              
		var title = new sap.ui.commons.Title('rTitle');     
		title.setText('List of all patients');     
		panel.setTitle(title);    
		

		
		
	
		
		function open_create_dialog() {
			

			
		};
	
		var create_button = new sap.ui.commons.Button("patient_create", {
	        text : "Register new patient",
	        icon : "sap-icon://wounds-doc",
	        press : function() {open_create_dialog();
			}
	    	
		});
		
		var update_button = new sap.ui.commons.Button("patient_update", {
	        text : "Update patient master data",
	        icon : "sap-icon://activity-individual",
	        press : function() {;}
		});
		
		layout.createRow(create_button);
		layout.createRow(update_button);
		
		var patient_table = new sap.ui.table.Table();  
		patient_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Firstname"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Firstname"),  
		          sortProperty: "Firstname"  
		}));  
		
		patient_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Lastname"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Lastname"),  
		          sortProperty: "Lastname"  
		}));  
		
		patient_table.addColumn(  
			     new sap.ui.table.Column({  
			          label: new sap.ui.commons.Label({text: "Insurancenumber"}),  
			          template: new sap.ui.commons.TextField().bindProperty("value", "Insurancenumber"),  
			          sortProperty: "Insurancenumber"  
			})); 
		
		patient_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Street"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Street"),  
		          sortProperty: "Street"  
		}));  
  
		patient_table.addColumn(  
			     new sap.ui.table.Column({  
			          label: new sap.ui.commons.Label({text: "Postalcode"}),  
			          template: new sap.ui.commons.TextField().bindProperty("value", "Postalcode"),  
			          sortProperty: "Postalcode"  
			})); 
		
		patient_table.addColumn(  
			     new sap.ui.table.Column({  
			          label: new sap.ui.commons.Label({text: "City"}),  
			          template: new sap.ui.commons.TextField().bindProperty("value", "City"),  
			          sortProperty: "City"  
			})); 
		
		patient_table.addColumn(  
			     new sap.ui.table.Column({  
			          label: new sap.ui.commons.Label({text: "Country"}),  
			          template: new sap.ui.commons.TextField().bindProperty("value", "Country"),  
			          sortProperty: "Country"  
			})); 
		
		var oModel = new sap.ui.model.odata.ODataModel(  
				sap.ui.getCore().byId("path").getText(),  
		                                                  false);  
		
		patient_table.setModel(oModel);  
		patient_table.bindRows('/PATIENT');  
		
		panel.addContent(patient_table);    
		layout.createRow(panel);  
		
		return layout;  
		
		 function open_create_dialog (){
				alert("fuck");
				var patient_create_layout = new sap.ui.commons.layout.MatrixLayout({
					id : 'patient_create_layout',
					layoutFixed : false,
					});
				
				var patient_create_dialog = new sap.ui.commons.Dialog();
				var text = new sap.ui.commons.TextView({text: "Please enter insurance number: "});
				var input = new sap.ui.commons.TextField('insnr_input');
				
				patient_create_dialog.setTitle("First step");
				
				input.setValue("AB123");
				input.setTooltip("Fill in insurance number");
				//input.attachChange(function(){alert('Text changed to :'+ input.getValue());});
		
				patient_create_layout.createRow(text);
				patient_create_layout.createRow(input);
				patient_create_layout.createRow(new sap.ui.commons.Button({text: "OK", 
					
					press:function(){lookup_insnr(input.getValue());
									 patient_create_dialog.close();}}));
		
				
				patient_create_dialog.addContent(patient_create_layout);
		
				patient_create_dialog.open();
			}
		 
		 function lookup_insnr(insnr) {
				
				var oModel = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);
				oModel.refreshSecurityToken(null, null);
				alert("/PATIENT?$filter=Insurancenumber eq '"+insnr+"'");
				
				oModel.read("/PATIENT?$filter=Insurancenumber eq '"+insnr+"'" ,undefined, undefined, true,
						function(response){
					alert(response[1].PatientID);
					if (response.PatiendID != ''){
						
						var internal_layout = new sap.ui.commons.layout.MatrixLayout({
							layoutFixed : false,
							});
						
						var internal_dialog = new sap.ui.commons.Dialog();
						var text = new sap.ui.commons.TextView({text: "Please enter insurance number: "});
						var input = new sap.ui.commons.TextField();
						
						internal_dialog.setTitle("First step");
						
						text.setText();
						internal_layout.createRow(text);
						
						internal_dialog.addContent(internal_layout);
						
						internal_dialog.open();
						
					} else {
						var patient_create_layout = new sap.ui.commons.layout.MatrixLayout({
							layoutFixed : false,
							});
						
						var patient_create_dialog = new sap.ui.commons.Dialog();
						var text = new sap.ui.commons.TextView({text: "Please enter insurance number: "});
						var input = new sap.ui.commons.TextField('insnr_input');
						
						patient_create_dialog.setTitle("First step");
						

						patient_create_layout.createRow(input);
						patient_create_dialog.open();
					}
					
					
				});
				
			}
	},

	
		
		
	
});
