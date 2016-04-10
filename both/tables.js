
TabularTables = {};


Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);


TabularTables.MascoFive = new Tabular.Table({
  name: "MascoFive",
  collection: MascoFive,
  responsive: true,
  autoWidth: false,
  pageLength: 50,
  columns: [
    {data: "id", title: "OfficialId", class: "flex-4"},
    {data: "cleanTitle", title: "Title", class: "flex-4"},
    {data: "titleTags", title: "Keywords", class: "flex-4"}
  ]
});

TabularTables.MascoFour = new Tabular.Table({
  name: "MascoFour",
  collection: MascoFour,
  responsive: true,
  autoWidth: false,
  pageLength: 50,
  columns: [
    {data: "id", title: "Masco4", class: "flex-4"},
    {data: "cleanTitle", title: "Title", class: "flex-4"},
    {data: "titleTags", title: "Keywords", class: "flex-4"}
  ]
});

TabularTables.MascoKey = new Tabular.Table({
  name: "MascoKey",
  collection: MascoKey,
  responsive: true,
  autoWidth: false,
  pageLength: 50,
  columns: [
    {data: "officialCode", title: "Masco4", class: "flex-4"},
    {data: "officialTitle", title: "Title", class: "flex-4"},
    {data: "keywords", title: "Keywords", class: "flex-4"}
  ]
});

TabularTables.Rep = new Tabular.Table({
  name: "Rep",
  collection: Rep,
  responsive: true,
  autoWidth: false,
  pageLength: 50,
  columns: [
    {data: "mapToFour", title: "Masco4", class: "flex-4"},
    {data: "cleanTitle", title: "Title", class: "flex-4"},
    {data: "tagsOnly", title: "Keywords", class: "flex-4"}
  ]
});

TabularTables.Rpt = new Tabular.Table({
  name: "Rpt",
  collection: Rpt,
  responsive: true,
  autoWidth: false,
  pageLength: 50,
  columns: [
    {data: "cleanTitle", title: "Title"},
    {data: "tagsOnly", title: "TitleTags"},
    {data: "descTags", title: "DescTags"},
  ]
});
