Template.export.events({
	"click #export": function() {
		MyAppExporter.exportAllRpt();
	},
	"click #exportPercent": function() {
		MyAppExporter.exportPercentTitle();
	},
});
