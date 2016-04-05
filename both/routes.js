Meteor.startup(function () {

  console.log('/////configuring router/////');

  Router.configure({
    layoutTemplate: 'applicationLayout',
    loadingTemplate: 'loading',
    not_foundTemplate: 'notFound',
    action: function () {
      if (this.ready()) {
        this.render();
      } else {
        this.render('loading');
      }
    }
  });

  Router.map(function(){
    this.route('home', {
      path: '/',
      template:'home'
    });
    this.route('rpt', {
      path: '/rpt',
      template:'rpt',
      waitOn: function() {
        return Meteor.subscribe('Rpt');
      }    
    });
    this.route('rep', {
      path: '/rep',
      template:'rep',
      waitOn: function() {
        return Meteor.subscribe('Rep');
      }
    });
    this.route('mascoFive', {
      path: 'masco-5',
      template:'mascoFive',
      waitOn: function() {
        return Meteor.subscribe('MascoFive');
      }
    });
    this.route('mascoFour', {
      path: '/masco-4',
      template:'mascoFour',
      waitOn: function() {
        return Meteor.subscribe('MascoFour');
      }
    });
    this.route('mascoKey', {
      path: '/masco-key',
      template:'mascoKey',
      waitOn: function() {
        return Meteor.subscribe('MascoKey');
      }
    });
    this.route('export', {
      path: '/export',
      template:'export',
      waitOn: function() {
        return Meteor.subscribe('RptIntersections');
      }
    });
  });
});