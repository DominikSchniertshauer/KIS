sap.ui.controller("zy_ss14_t4_sapui5_kis.hospitalization_displace", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf zy_ss14_t4_sapui5_kis.hospitalization_displace
*/
//    onInit: function() {
//
//    },

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf zy_ss14_t4_sapui5_kis.hospitalization_displace
*/
//    onBeforeRendering: function() {
//
//    },

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf zy_ss14_t4_sapui5_kis.hospitalization_displace
*/
//    onAfterRendering: function() {
//
//    },

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf zy_ss14_t4_sapui5_kis.hospitalization_displace
*/
//    onExit: function() {
//
//    }
    
    get_patient: function(insnr, fields){
        var oModel = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);

        var field;
        var oEntry = {
        };    
        
        if(insnr.length == 10){
        
            oModel.read("/PATIENT?$filter=Insurancenumber eq '"+insnr+"'" ,undefined, undefined, true,
                    function(data, response){
            
                try {
                    if (data.results[0].PatientID != ''){
                        
        
                        for(var i in fields){
                            field = sap.ui.getCore().byId(fields[i]+"_input");
                            field.setEditable(false);
                        
                            if(fields[i] == 'Fname'){
                                field.setValue(data.results[0].Firstname);
//                                oEntry.Firstname = field.getValue();
                            }    
                        
                            if(fields[i] == 'Lname'){
                                field.setValue(data.results[0].Lastname);
//                                oEntry.Lastname = field.getValue();
                            }
                            
                        
                        }
                        window.tmpPatientID= data.results[0].PatientID;
                    }
                    
                } catch(e) {
                    
                };
                
            });
            
           
        }
    },
    
    displace_patient : function (hospitalizationID, tmpaData, rating) {
        
    	if (hospitalizationID != '') {
			// Übergabewerte für oModel.update Funktion
			var oEntry = {
			};	
			var getEntry = tmpaData.pop();
			while (getEntry.HospitalizationID != hospitalizationID) {
				getEntry=tmpaData.pop();
			}
			
			var Jetzt = new Date();
			oEntry.Mandt = '001';
			oEntry.HospitaliznID = hospitalizationID;
			oEntry.TreatPlanID = getEntry.TreatPlanID;
			oEntry.PatientID = getEntry.PatientID;
			oEntry.BedID = getEntry.BedID;
			oEntry.DateBegin = getEntry.DateBegin;
			oEntry.StartOfTreatmentPlan = getEntry.StartOfTreatmentPlan;
			oEntry.TreatmentRating = rating;
			
			oEntry.DateEnd = Jetzt.getFullYear()+"-"+(Jetzt.getMonth()+1)+"-"+Jetzt.getDate()+"T"+Jetzt.getHours()+":"+Jetzt.getMinutes();
			


			
			
			
			var oParams = {};
		    oParams.success = function(){ 
		    	var oModel = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);
		    	oModel.read("/BED(Mandt='001',BedID="+oEntry.BedID+")" , null, null, true,
						function(data, response){
		            
		                try {
							var test = {
									"Mandt": data['Mandt'],
									"BedID": data['BedID'],
									"RoomID" : data['RoomID'],
									"Isactive" : data['Isactive'],
									"Istaken" : "FALSE"
							};
		                    
					        var oModel = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);
							oModel.refreshSecurityToken(null, null);
							oModel.update("/BED(Mandt='001',BedID="+oEntry.BedID+")", test, oParams2);
							
							var getInsurnumber_input = sap.ui.getCore().byId("Insurnumber_input");
							
							
							
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
					        
			
					        var getinsnr_com_temp = sap.ui.getCore().byId("insnr_com_temp");
					        getinsnr_com_temp.bindProperty("text", "myModel>Insurancenumber");
					        getinsnr_com_temp.bindProperty("key", "myModel>HospitalizationID");
					        getinsnr_com_temp.bindProperty("additionalText", "myModel>Lastname");
					       
					        getInsurnumber_input.setValue("");
					        var getFname_input = sap.ui.getCore().byId("Fname_input");
					        var getLname_input = sap.ui.getCore().byId("Lname_input");
					        getFname_input.setValue("");
					        getLname_input.setValue("");
					        getInsurnumber_input.bindItems("myModel>/modelDatas", getinsnr_com_temp);
							
					        $.growl.notice({ title: "Meldung", message: "Patient erfolgreich entlassen!" });

		                } catch(e) {
		                    
		                };
		                
		            });
		    	
				var oParams2 = {};
			    oParams2.fnSuccess = function(){};
		    	oParams2.fnError = function(){ };
		    	
		    	

		    	
		    };
		    oParams.fnError = function(){ };
		       
	        var oModel = new sap.ui.model.odata.ODataModel( sap.ui.getCore().byId("path").getText(),false);
			oModel.refreshSecurityToken(null, null);
			oModel.update("/HOSPTZN(Mandt='001',HospitaliznID="+hospitalizationID+")", oEntry, oParams);
    		
    	}
    	
        
    }

});

