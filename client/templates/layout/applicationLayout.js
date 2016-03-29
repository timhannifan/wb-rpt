Template.applicationLayout.events({
	'click [data-action=home]': function () {
	  Router.go('home');
	},
	'click [data-action=uploadRpt]': function () {
	  Router.go('uploadRpt');
	},
	'click [data-action=uploadRep]': function () {
	  Router.go('uploadRep');
	},
	'click [data-action=uploadMascoFive]': function () {
	  Router.go('uploadMascoFive');
	},
	'click [data-action=uploadMascoFour]': function () {
	  Router.go('uploadMascoFour');
	},
	'click [data-action=uploadMascoThree]': function () {
	  Router.go('uploadMascoThree');
	},
	'click [data-action=export]': function () {
	  Router.go('export');
	}
});