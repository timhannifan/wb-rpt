Template.export.events({
	"click #export": function() {
		MyAppExporter.exportAllRpt();
	},
	"click #exportPercentTitle": function() {
		console.log('clicked exportPercentTitle');
		MyAppExporter.exportPercentTitle();
	},
});
