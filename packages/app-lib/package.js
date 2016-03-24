Package.describe({
  name: 'app-lib',
  summary: 'Application dependencies',
  version: '0.0.1'
});

Package.onUse(function (api) {

  api.versionsFrom(['METEOR@1.0']);

  var packages = [
      // 'meteor-base',
      // 'mongo',
      // 'blaze-html-templates',
      // 'es5-shim',
      // 'ecmascript',
      'meteor-platform',  
      'blaze',
      'tracker',
      'jquery',
      'underscore',
      'check',
      'reactive-dict',
      'reactive-var',
      'session',
      'http',
      'coffeescript',
      'reywood:publish-composite',
      'aldeed:simple-schema',
      'aldeed:collection2',
      'aldeed:autoform',
      'aldeed:template-extension',
      'dburles:collection-helpers',
      'matb33:collection-hooks',
      'anti:fake',
      'd3js:d3',
      'percolatestudio:synced-cron@1.1.0'    
  ];

  api.use(packages);

  api.imply(packages);

  api.addFiles([
    'lib/routes.js'
  ], ['client', 'server']);

  api.export([
    '_'
  ]);

});
