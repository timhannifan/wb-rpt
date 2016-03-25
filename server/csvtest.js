
Meteor.methods({
  parseUploadRpt: function( data) {
    check( data, Array );

    for ( i = 0; i < data.length; i++ ) {
      item   = data[ i ],
      exists = Rpt.findOne( { id: item.id } );

      if ( !exists ) {
        Rpt.insert( item );
      } else {
        console.warn( 'Rejected. This item already exists in Rpt.' );
        console.log(item);      
      }
    }
  },
  parseUploadRep: function( data) {
    check( data, Array );

    for ( i = 0; i < data.length; i++ ) {
      item   = data[ i ],
      exists = Rep.findOne( { masco: item.masco } );

      if ( !exists ) {
        Rep.insert( item );
      } else {
        console.warn( 'Rejected. This item already exists in Rep.' );
        console.log(item);      
      }
    }
  },
  parseUploadMasco: function( data) {
    check( data, Array );

    for ( i = 0; i < data.length; i++ ) {
      item   = data[ i ],
      Masco.insert( item );
      // exists = Masco.findOne( { name: item.name } );

      // if ( !exists ) {
      //   Masco.insert( item );
      // } else {
      //   console.warn( 'Rejected. This item already exists in masco.' );
      //   console.log(item);      
      // }
    }
  },
});