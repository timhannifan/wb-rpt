Package.describe({
  name: "blast-text",
  summary: "blast.js http://julian.com/research/blast ",
  version: "2.0.0"
});

Package.onUse(function(api) {

  api.versionsFrom(['METEOR@1.0']);

  var packages = [
      'jquery'  
  ];

  api.use(packages);

  api.imply(packages);

  api.addFiles([
    'jquery.blast.js'
  ], ['client']);

  
});
