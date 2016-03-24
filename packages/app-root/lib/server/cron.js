Meteor.startup(function() {
  SyncedCron.options = {
    log: false,
    collectionName: 'cronHistory',
    utc: false, 
    collectionTTL: 172800
  }

  SyncedCron.start();

  var addJob = function () {
    SyncedCron.add({
      name: 'RSS job',
      schedule: function(parser) {
        return parser.text('every 30 minutes');
      }, 
      job: function() {
        if (Sources.find().count()) {
          fetchSources();
        }
      }
    });
  }

  addJob();
});