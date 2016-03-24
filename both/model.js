Sources = new Mongo.Collection('Sources');

// // Sources Schema and Permissions
// Sources.schema = new SimpleSchema({
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
// Sources.attachSchema(Sources.schema);
// Sources.allow({
// 	insert: function (userId, doc) {
// 		return true;
// 	},
// 	remove: function (userId, doc) {
// 		return true;
// 	}
// });

// // JobStreetSources Schema and Permissions
// JobStreetSources.schema = new SimpleSchema({
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
// JobStreetSources.attachSchema(JobStreetSources.schema);
// JobStreetSources.allow({
//   insert: function (userId, doc) {
//     return true;
//   },
//   remove: function (userId, doc) {
//     return true;
//   }
// });