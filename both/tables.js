
TabularTables = {};


Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

TabularTables.MascoFive = new Tabular.Table({
name: "MascoFive",
collection: MascoFive,
responsive: true,
autoWidth: true,
pageLength: 50,
columns: [
  {data: "id", title: "id", class: "flex-1"},
  {data: "description_5_digit", title: "description", class: "flex-10"},
  {data: "tags", title: "tags", class: "flex-10"}
],

});

TabularTables.MascoFour = new Tabular.Table({
name: "MascoFour",
collection: MascoFour,
responsive: true,
autoWidth: true,
pageLength: 50,
columns: [
  {data: "id", title: "id", class: "flex-2"},
  {data: "description_4_digit", title: "description", class: "flex-10"},
  {data: "tags", title: "tags", class: "flex-10"}
],

});


TabularTables.MascoThree = new Tabular.Table({
name: "MascoThree",
collection: MascoThree,
responsive: true,
autoWidth: true,
pageLength: 50,
columns: [
  {data: "id", title: "masco_3_id", class: "flex-1"},
  {data: "description_3_digit", title: "description_3_digits", class: "flex-10"},
  {data: "tags", title: "tags", class: "flex-10"}
],

});



TabularTables.Rep = new Tabular.Table({
name: "Rep",
collection: Rep,
responsive: true,
autoWidth: true,
pageLength: 50,
columns: [
  {data: "id", title: "id", class: "flex-1"},
  {data: "job1_position", title: "job1_position", class: "flex-3"},
  {data: "job1_employer", title: "job1_employer", class: "flex-3"},
  {data: "masco_4", title: "masco_4", class: "flex-3"}
],

});

TabularTables.Rpt = new Tabular.Table({
name: "Rpt",
collection: Rpt,
responsive: true,
autoWidth: true,
pageLength: 50,
columns: [
  {data: "id", title: "id", class: "flex-1"},
  {data: "occ_title", title: "occ_title"},
  {data: "firm_name", title: "firm_name"},
  // {data: "titleTags", title: "title_keywords" }.
  // {data: "mascoTitleMatchThree", title: "title_m3_exact"},  
  {data: "mascoTitleMatchFour", title: "title_m4_exact"},  
  // {data: "mascoTitleMatchFive", title: "title_m5_exact"},  
  {data: "repTitleMatch", title: "title_REP_exact"},  
],

});
