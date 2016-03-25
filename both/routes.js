Meteor.startup(function () {

  console.log('/////configuring router/////');

  Router.configure({
    layoutTemplate: 'applicationLayout',
    loadingTemplate: 'loading',
    not_foundTemplate: 'notFound'
    // autoRender: true,
    // autoStart: false
    // waitOn: function () {this.next();},
  });

  Router.map(function(){
    this.route('home', {
      path: '/',
      template:'home'
    });
    this.route('uploadRpt', {
      path: '/uploadRpt',
      // waitOn: function() {
      //   // Meteor.subscribe('Uploads');
      // },
      template:'uploadRpt'
    });
    this.route('uploadRep', {
      path: '/uploadRep',
      // waitOn: function() {
      //   Meteor.subscribe('Uploads');
      // },
      template:'uploadRep'
    });
    this.route('uploadMasco', {
      path: '/uploadMasco',
      // waitOn: function() {
      //   Meteor.subscribe('Uploads');
      // },
      template:'uploadMasco'
    });
  });
});