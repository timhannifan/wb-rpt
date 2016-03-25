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
	'click [data-action=uploadMasco]': function () {
	  Router.go('uploadMasco');
	},
	'click [data-action=export]': function () {
	  Router.go('export');
	}
});