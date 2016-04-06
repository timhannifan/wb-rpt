MyAppExporter = {
	exportAllRpt: function() {
		var self = this;
		Meteor.call("exportAllRpt", function(error, data) {
 
			if ( error ) {
				alert(error); 
				return false;
			}
			
			var csv = Papa.unparse(data);
			var title = "rpt_descriptive.csv";
			self._downloadCSV(csv, title);
		});
	},
	methodExportPercentTitle: function() {
		var self = this;

		Meteor.call("exportPercentTitle", function(error, data) {
		
			if ( error ) {
				alert(error); 
				return false;
			}
			
			var csv = Papa.unparse(data);
			var title = "rpt_percent_title.csv";
			self._downloadCSV(csv, title);
		});
	},
	methodExportPercentDescription: function() {
		var self = this;

		Meteor.call("exportPercentDescription", function(error, data) {
		
			if ( error ) {
				alert(error); 
				return false;
			}
			
			var csv = Papa.unparse(data);
			var title = "rpt_percent_description.csv";
			self._downloadCSV(csv, title);
		});
	},
	methodExportFourTitleStrong: function() {
		var self = this;

		Meteor.call("exportFourTitleStrong", function(error, data) {
		
			if ( error ) {
				alert(error); 
				return false;
			}
			
			var csv = Papa.unparse(data);
			var title = "rpt_four_title_strong.csv";
			self._downloadCSV(csv, title);
		});
	},	
	methodExportFiveTitleStrong: function() {
		var self = this;

		Meteor.call("exportFiveTitleStrong", function(error, data) {
		
			if ( error ) {
				alert(error); 
				return false;
			}
			
			var csv = Papa.unparse(data);
			var title = "rpt_five_title_strong.csv";
			self._downloadCSV(csv, title);
		});
	},		
	methodExportRepTitleStrong: function() {
		var self = this;

		Meteor.call("exportRepTitleStrong", function(error, data) {
		
			if ( error ) {
				alert(error); 
				return false;
			}
			
			var csv = Papa.unparse(data);
			var title = "rpt_rep_title_strong.csv";
			self._downloadCSV(csv, title);
		});
	},		 
	methodExportMasco4: function() {
		var self = this;

		Meteor.call("exportMasco4", function(error, data) {
		
			if ( error ) {
				alert(error); 
				return false;
			}
			
			var csv = Papa.unparse(data);
			var title = "masco4.csv";
			self._downloadCSV(csv, title);
		});
	},
	methodExportMasco5: function() {
		var self = this;

		Meteor.call("exportMasco5", function(error, data) {
		
			if ( error ) {
				alert(error); 
				return false;
			}
			
			var csv = Papa.unparse(data);
			var title = "masco5.csv";
			self._downloadCSV(csv, title);
		});
	},
	methodExportMascoKey: function() {
		var self = this;

		Meteor.call("exportMascoKey", function(error, data) {
		
			if ( error ) {
				alert(error); 
				return false;
			}
			
			var csv = Papa.unparse(data);
			var title = "masco_key.csv";
			self._downloadCSV(csv, title);
		});
	},
	methodExportRep: function() {
		var self = this;

		Meteor.call("exportRep", function(error, data) {
		
			if ( error ) {
				alert(error); 
				return false;
			}
			
			var csv = Papa.unparse(data);
			var title = "Rep.csv";
			self._downloadCSV(csv, title);
		});
	},
	_downloadCSV: function(csv, title) {
		var blob = new Blob([csv]);
		var a = window.document.createElement("a");
	    a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
	    a.download = title;
	    document.body.appendChild(a);
	    a.click();
	    document.body.removeChild(a);
	}
}