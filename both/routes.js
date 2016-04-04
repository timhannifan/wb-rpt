Meteor.startup(function () {

  console.log('/////configuring router/////');

  Router.configure({
    layoutTemplate: 'applicationLayout',
    loadingTemplate: 'loading',
    not_foundTemplate: 'notFound',
    // autoRender: true,
    // autoStart: false,
    waitOn: function() {
      Meteor.subscribe('Rpt');
      Meteor.subscribe('Rep');
      Meteor.subscribe('MascoKey');
      Meteor.subscribe('MascoFive');
      Meteor.subscribe('MascoFour');
      // this.next();
    },
  });

  Router.map(function(){
    this.route('home', {
      path: '/',
      template:'home'
    });
    this.route('rpt', {
      path: '/rpt',
      template:'rpt'
    });
    this.route('rep', {
      path: '/rep',
      template:'rep'
    });
    this.route('mascoFive', {
      path: 'masco-5',
      template:'mascoFive'
    });
    this.route('mascoFour', {
      path: '/masco-4',
      template:'mascoFour'
    });
    this.route('mascoThree', {
      path: '/masco-3',
      template:'mascoThree'
    });
    this.route('mascoKey', {
      path: '/masco-key',
      template:'mascoKey'
    });
    this.route('export', {
      path: '/export',
      template:'export'
    });
  });
});