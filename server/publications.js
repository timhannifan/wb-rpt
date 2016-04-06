Meteor.publish('Rpt', function() {
	return Rpt.find({},{fields: {
		// _id: 0,
		// id: 0,
		occ_title: 0,
		occ_desc: 0,
		firm_name: 0,
		sector: 0,
		// cleanTitle: 0,
		titleTags: 0,
		tagsOnly: 0,
		// cleanDesc: 0,
		descTags: 0,
		// cleanTitleTags: 0,
		// cleanTagsOnly: 0,
		cleanDescTags: 0,
		repTitleTagMatchStrong: 0,
		titleEqTitle: 0,
		titleInKeywords: 0,
		percentMatchTitleKeywords: 0,
		percentMatchDescKeywords: 0,
		mascoTitleTagFourStrong: 0,
		mascoTitleTagFourWeak: 0,
		mascoTitleTagFiveStrong: 0,
		mascoTitleTagFiveWeak: 0,
		repTitleTagMatchStrong: 0,
		repTitleTagMatchWeak: 0
	}});
});
Meteor.publish('Rep', function() {
	return Rep.find({});
});
Meteor.publish('MascoFive', function() {
	return MascoFive.find({});
});

Meteor.publish('MascoFour', function() {
	return MascoFour.find({});
});


Meteor.publish('MascoKey', function() {
	return MascoKey.find({});
});

Meteor.publish('RptIntersections', function() {
	return Rpt.find({},{fields: {
		// _id: 0,
		// id: 0,
		occ_title: 0,
		occ_desc: 0,
		firm_name: 0,
		sector: 0,
		cleanTitle: 0,
		titleTags: 0,
		tagsOnly: 0,
		cleanDesc: 0,
		descTags: 0,
		cleanTitleTags: 0,
		cleanTagsOnly: 0,
		cleanDescTags: 0,
		repTitleTagMatchStrong: 0,
		titleEqTitle: 0,
		titleInKeywords: 0,
		// percentMatchTitleKeywords: 0,
		// percentMatchDescKeywords: 0,
		mascoTitleTagFourStrong: 0,
		mascoTitleTagFourWeak: 0,
		mascoTitleTagFiveStrong: 0,
		mascoTitleTagFiveWeak: 0,
		repTitleTagMatchStrong: 0,
		repTitleTagMatchWeak: 0
	}});
});