Package.describe({
  name: 'app-root',
  summary: 'Base configuration for application, dependency manager.',
  version: '0.0.1'
});

Npm.depends({
  'he': '0.5.0',
  'fs': '0.0.2',
  'striptags': '2.1.1',
  'cheerio': '0.20.0',
  'babyparse': '0.4.5'
});

Package.onUse(function (api) {
  api.versionsFrom(['METEOR@1.0']);

  var packages = [
    'meteor-platform',  
    'app-lib',
    'nefiltari:yaki',
    'anonyfox:scrape'
  ];
  api.use(packages);
  api.imply(packages);

  api.addFiles([
    'lib/server/babyparse.js',
    'lib/server/cheerio.js',
    'lib/server/data/masco_1digit.csv',
    'lib/server/data/masco_3digit.csv',
    'lib/server/data/masco_2digit.csv',  
    'lib/server/data/masco_4digit.csv',
    'lib/server/data/masco_all.csv',
    'lib/server/data/rep_data.csv',
    'lib/server/data/rpt_data.csv'
  ], ['server']);

  api.export('cheerio');
  api.export('Baby');
});
