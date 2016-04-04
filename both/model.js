Rpt = new Mongo.Collection('Rpt');
Rep = new Mongo.Collection('Rep');
MascoFive = new Mongo.Collection('MascoFive');
MascoFour = new Mongo.Collection('MascoFour');
MascoKey = new Mongo.Collection('MascoKey');


// Collection = new Mongo.Collection('Collection');
// // Collection Schema and Permissions
// Collection.schema = new SimpleSchema({
//   sourceName: {
//     type: String,
//     optional: true,
//     defaultValue: 'monster',
//   },
//   sourceIndustry: {
//     type: String,
//     optional: true,
//   },
//   sourceUrl: {
//     type: String,
//     regEx: SimpleSchema.RegEx.Url,
//     optional: true
//   },
//   sourceSpecialization: {
//     type: String,
//     optional: true,
//     defaultValue: null
//   }
// });
// Collection.attachSchema(Collection.schema);
// Collection.allow({
// 	insert: function (userId, doc) {
// 		return true;
// 	},
// 	remove: function (userId, doc) {
// 		return true;
// 	}
// });

// // OtherCollection Schema and Permissions
// OtherCollection.schema = new SimpleSchema({
//   sourceName: {
//     type: String,
//     optional: true,
//     defaultValue: 'jobstreet'
//   },
//   sourceIndustry: {
//     type: String,
//     optional: true
//   },
//   sourceUrl: {
//     type: String,
//     regEx: SimpleSchema.RegEx.Url,
//     optional: true
//   },
//   sourceSpecialization: {
//     type: String,
//     optional: true
//   },
//   sourceSearchDepth: {
//     type: Number,
//     optional: true
//   },
//   sourceSpecializationCode: {
//     type: Number,
//     optional: true
//   }
// });
// OtherCollection.attachSchema(OtherCollection.schema);
// OtherCollection.allow({
//   insert: function (userId, doc) {
//     return true;
//   },
//   remove: function (userId, doc) {
//     return true;
//   }
// });