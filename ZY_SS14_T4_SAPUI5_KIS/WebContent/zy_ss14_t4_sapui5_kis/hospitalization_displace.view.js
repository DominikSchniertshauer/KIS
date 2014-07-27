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
        
		var aData = []; 
		
		/**
		 *  Set Data model for temp table
		 */
		var oModelInsNr = new sap.ui.model.json.JSONModel();
		oModelInsNr.setData({modelDatas: aData});
        
		sap.ui.getCore().setModel(oModelInsNr, "myModel");
        var oModel = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);
		oModel.refreshSecurityToken(null, null);
        
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
        
        
        var insurancenumber_label = new sap.ui.commons.Label({text: "Versichertennummer: "});
        var insnr_comb_temp = new sap.ui.core.ListItem("insnr_com_temp");
        insnr_comb_temp.bindProperty("text", "myModel>Insurancenumber");
        insnr_comb_temp.bindProperty("key", "myModel>HospitalizationID");
        insnr_comb_temp.bindProperty("additionalText", "myModel>Lastname");
        var insurancenumber_input = new sap.ui.commons.ComboBox("Insurnumber_input", {displaySecondaryValues:true});
        insurancenumber_input.bindItems("myModel>/modelDatas", insnr_comb_temp);
        
        
        

        
        
        var fields = ["Fname", "Lname"];
        insurancenumber_input.attachChange(null, function(){ 
            oController.get_patient(insurancenumber_input.getValue(), fields);
           });
        
        var firstname_label = new sap.ui.commons.Label({text: "Vorname: "});
        var firstname_input = new sap.ui.commons.TextField("Fname_input");
        
        var lastname_label = new sap.ui.commons.Label({text: "Nachname: "});
        var lastname_input = new sap.ui.commons.TextField("Lname_input");
        
        var rating_label = new sap.ui.commons.Label({text: "Bewertung: "});
        var rating_input = new sap.ui.commons.RatingIndicator("hospi_rating", {
        	maxValue: 5,
        	visualMode: sap.ui.commons.RatingIndicatorVisualMode.Full
        });
        
        var patient_displace_panel_layout = new sap.ui.commons.layout.MatrixLayout({
            layoutFixed : false,
            });
        
        
        var hospi_displace_button = new sap.ui.commons.Button({
            text : "Patient entlassen",
            icon : "sap-icon://accept",
            press : function() {
            	oController.displace_patient(insurancenumber_input.getSelectedKey(), aData, String(rating_input.getValue()));
            },
            
        });
        
        patient_displace_panel_layout.createRow(insurancenumber_label, insurancenumber_input);
        patient_displace_panel_layout.createRow(firstname_label, firstname_input.setEditable(false));
        patient_displace_panel_layout.createRow(lastname_label, lastname_input.setEditable(false));
        patient_displace_panel_layout.createRow(rating_label, rating_input);
        patient_displace_panel_layout.createRow(hospi_displace_button);
        patient_displace_panel.addContent(patient_displace_panel_layout);
        
        left_layout.createRow(patient_displace_panel);
        
        layout.createRow(left_layout, right_layout);
        
        return layout;
    }

});
