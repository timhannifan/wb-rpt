Template.applicationLayout.events({
	'click [data-action=home]': function () {
	  Router.go('home');
	},
	'click [data-action=rpt]': function () {
	  Router.go('rpt');
	},
	'click [data-action=rep]': function () {
	  Router.go('rep');
	},
	'click [data-action=mascoFive]': function () {
	  Router.go('mascoFive');
	},
	'click [data-action=mascoFour]': function () {
	  Router.go('mascoFour');
	},
	'click [data-action=mascoThree]': function () {
	  Router.go('mascoThree');
	},
	'click [data-action=export]': function () {
	  Router.go('export');
	}
});