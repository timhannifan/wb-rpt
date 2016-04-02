
TabularTables = {};


Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);


TabularTables.MascoFive = new Tabular.Table({
  name: "MascoFive",
  collection: MascoFive,
  responsive: true,
  autoWidth: false,
  pageLength: 50,
  columns: [
    {data: "id", title: "OfficialId", class: "flex-2"},
    {data: "cleanTitle", title: "Position", class: "flex-4"},
    {data: "titleTags", title: "Keywords", class: "flex-6"}
  ]
});

TabularTables.MascoFour = new Tabular.Table({
  name: "MascoFour",
  collection: MascoFour,
  responsive: true,
  autoWidth: false,
  pageLength: 50,
  columns: [
    {data: "id", title: "OfficialId", class: "flex-2"},
    {data: "cleanTitle", title: "Position", class: "flex-4"},
    {data: "titleTags", title: "Keywords", class: "flex-6"}
  ]
});

TabularTables.MascoKey = new Tabular.Table({
  name: "MascoKey",
  collection: MascoKey,
  responsive: true,
  autoWidth: false,
  pageLength: 50,
  columns: [
    {data: "officialCode", title: "Official Code", class: "flex-2"},
    {data: "officialTitle", title: "Position", class: "flex-4"},
    {data: "keywords", title: "Keywords", class: "flex-6"}
  ]
});

TabularTables.Rep = new Tabular.Table({
  name: "Rep",
  collection: Rep,
  responsive: true,
  autoWidth: false,
  pageLength: 50,
  columns: [
    {data: "mapToFour", title: "Masco4", class: "flex-1"},
    {data: "cleanTitle", title: "Position", class: "flex-2"},
    {data: "cleanTags", title: "Keywords", class: "flex-4"}
  ]
});

TabularTables.Rpt = new Tabular.Table({
  name: "Rpt",
  collection: Rpt,
  responsive: true,
  autoWidth: false,
  pageLength: 50,
  columns: [
    {data: "cleanTitle", title: "Postion", class: "flex-3"},
    {data: "cleanTitleTags", title: "TitleTags", class: "flex-4"},
    {data: "cleanDescTags", title: "DescriptionTags", class: "flex-4 overflow-x-scroll"}
  ]
});
