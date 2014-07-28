sap.ui.jsview("zy_ss14_t4_sapui5_kis.hospitalization_disease", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zy_ss14_t4_sapui5_kis.hospitalization_disease
	*/ 
	getControllerName : function() {
		return "zy_ss14_t4_sapui5_kis.hospitalization_disease";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf zy_ss14_t4_sapui5_kis.hospitalization_disease
	*/ 
	createContent : function(oController) {
		var layout = new sap.ui.commons.layout.MatrixLayout({
			id : 'hospitalization_disease_layout',
			layoutFixed : false,
			});

		
		var header_label = new sap.ui.commons.Label("hospitalization_disease_header",{text: "Aktuelle Krankheiten"});
		header_label.setDesign(sap.ui.commons.LabelDesign.Bold);

		var line_divider = new sap.ui.commons.HorizontalDivider("hospitalization_disease_divider");
	
		layout.createRow(header_label);
		layout.createRow(line_divider);
		
		
		
		var panel = new sap.ui.commons.Panel('hospitalization_disease_panel');  
		var title = new sap.ui.commons.Title('hospitalization_disease_title');     
		title.setText('Liste der aktuell im Krankenhaus zu behandelnden Krankheiten');     
		panel.setTitle(title);  
		
		var hospi_disease_table = new sap.ui.table.Table("hospitalization_disease_Table", {
			id: "Mandt",
			selectionMode: sap.ui.table.SelectionMode.Single,
		}); 


		var hospi_disease_table = new sap.ui.table.Table("tblHospiDisease",{
			selectionMode: sap.ui.table.SelectionMode.Single,
			rowSelectionChange: function(oEvent){
				var currentRowContext = oEvent.getParameter("rowContext").getPath();
				var model = disease_table.getModel();
				data = model.getProperty(currentRowContext);
			}});    
		hospi_disease_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Name"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Name"),  
		          sortProperty: "Name", 
		          width: "250px"
		}));  
		
		hospi_disease_table.addColumn(  
		     new sap.ui.table.Column({  
		          label: new sap.ui.commons.Label({text: "Symptome"}),  
		          template: new sap.ui.commons.TextField().bindProperty("value", "Description"),  
		          sortProperty: "Description"  
		}));  


  
		var oModel = sap.ui.getCore().getModel();  
		
		
		
		hospi_disease_table.setModel(oModel);  
		hospi_disease_table.bindRows('/HOSDE');  
		
		panel.addContent(hospi_disease_table);    
		layout.createRow(panel);  
		
		
		return layout;  
		
		
	}

});
