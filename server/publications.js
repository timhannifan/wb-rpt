Meteor.publish('Rpt', function() {
	return Rpt.find({});
});
Meteor.publish('Rep', function() {
	return Rep.find({});
});
Meteor.publish('MascoFive', function() {
	return MascoFive.find({});
});

Meteor.publish('MascoFour', function() {
	return MascoFour.find({});
});