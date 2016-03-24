Meteor.publish('Rpt', function() {
	return Rpt.find({});
});
Meteor.publish('Rep', function() {
	return Rep.find({});
});
Meteor.publish('Masco', function() {
	return Masco.find({});
});
