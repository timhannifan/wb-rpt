Template.mascoKey.onCreated(function() {
  // Template.instance().uploading = new ReactiveVar( false );
});

Template.mascoKey.helpers({
  // uploading: function() {
  //   return Template.instance().uploading.get();
  // }
});

Template.mascoKey.events({
});

Template.mascoFive.onCreated(function() {
  Template.instance().uploading = new ReactiveVar( false );
});

Template.mascoFive.helpers({
  uploading: function() {
    return Template.instance().uploading.get();
  }
});

Template.mascoFive.events({
  'change [name="uploadCSV"]': function( event, template ) {
    template.uploading.set( true );

    Papa.parse( event.target.files[0], {
      header: true,
      complete: function( results, file ) {
        Meteor.call( 'insertMascoFive', results.data, function( error, response ) {
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

Template.mascoFour.onCreated(function() {
  Template.instance().uploading = new ReactiveVar( false );
});

Template.mascoFour.helpers({
  uploading: function() {
    return Template.instance().uploading.get();
  }
});

Template.mascoFour.events({
  'change [name="uploadCSV"]': function( event, template ) {
    template.uploading.set( true );

    Papa.parse( event.target.files[0], {
      header: true,
      complete: function( results, file ) {
        Meteor.call( 'parseUploadMascoFour', results.data, function( error, response ) {
          if ( error ) {
            console.log( error.reason );
          } else {
            template.uploading.set( false );
            // Bert.alert( 'Upload complete!', 'success', 'growl-top-right' );
          }
        });
      }
    });
  }
});