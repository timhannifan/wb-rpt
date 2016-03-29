
TabularTables = {};


Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

TabularTables.MascoFive = new Tabular.Table({
name: "MascoFive",
collection: MascoFive,
responsive: true,
autoWidth: false,
columns: [
  {data: "id", title: "masco_5_id", class: "flex-1"},
  {data: "description_5_digit", title: "description_5_digits", class: "flex-10"}
],

});

TabularTables.MascoFour = new Tabular.Table({
name: "MascoFour",
collection: MascoFour,
responsive: true,
autoWidth: false,
columns: [
  {data: "id", title: "masco_4_id", class: "flex-2"},
  {data: "description_4_digit", title: "description_4_digits", class: "flex-10"}
],

});


TabularTables.MascoThree = new Tabular.Table({
name: "MascoThree",
collection: MascoThree,
responsive: true,
autoWidth: false,
columns: [
  {data: "id", title: "masco_3_id", class: "flex-1"},
  {data: "description_3_digit", title: "description_3_digits", class: "flex-10"}
],

});
