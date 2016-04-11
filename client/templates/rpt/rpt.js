
Template.rpt.onCreated(function() {
  Template.instance().uploading = new ReactiveVar( false );
});

Template.rpt.helpers({
  uploading: function() {
    return Template.instance().uploading.get();
  },
  uploads: function() {
    return Uploads.find().fetch();
  },
});

Template.rpt.events({
  'change [name="uploadCSV"]': function( event, template ) {
    template.uploading.set( true );

    Papa.parse( event.target.files[0], {
      header: true,
      complete: function( results, file ) {
        Meteor.call( 'insertRpt', results.data, function( error, response ) {
          if ( error ) {
            console.log( error.reason );
          } else {
            template.uploading.set( false );
          }
        });
      }
    });
  }
});