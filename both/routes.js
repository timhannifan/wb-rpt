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
    
    // this.route('sources', {
    //   path: '/sources/monster',
    //   template:'sources',
    //   waitOn: function() {
    //     Meteor.subscribe('Sources');
    //   },
    //   data: function () {
    //     return Sources.find().fetch();
    //   }
    // });
  });
});