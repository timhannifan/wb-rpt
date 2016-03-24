// var cheerio = Npm.require('cheerio');

// Meteor.startup(function() {
//   if (JobStreetItems.find().count() == 0 && JobStreetSources.find().count() == 0) {
//     var specializationCodes = [
//       {
//         sourceName: 'jobstreet',
//         sourceIndustry: 'Accounting/Finance',
//         sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=130&area=&salary=&src=12',
//         sourceSpecialization: 'Audit & Taxation Jobs',
//         sourceSearchDepth: 2,
//         sourceSpecializationCode: 130
//       },
//       {
//         sourceName: 'jobstreet',
//         sourceIndustry: 'Accounting/Finance',
//         sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=131&area=&salary=&src=12',
//         sourceSpecialization: 'Banking/Financial Jobs',
//         sourceSearchDepth: 2,
//         sourceSpecializationCode: 131
//       },
//       {
//         sourceName: 'jobstreet',
//         sourceIndustry: 'Accounting/Finance',
//         sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=132&area=&salary=&src=12',
//         sourceSpecialization: 'Corporate Finance/Investment Jobs',
//         sourceSearchDepth: 2,
//         sourceSpecializationCode: 132
//       },
//       {
//         sourceName: 'jobstreet',
//         sourceIndustry: 'Accounting/Finance',
//         sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=135&area=&salary=&src=12',
//         sourceSpecialization: 'General/Cost Accounting Jobs',
//         sourceSearchDepth: 2,
//         sourceSpecializationCode: 135
//       },
//       {
//         sourceName: 'jobstreet',
//         sourceIndustry: 'Admin/Human Resources',
//         sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=133&area=&salary=&src=12',
//         sourceSpecialization: 'Clerical/Administrative Jobs',
//         sourceSearchDepth: 2,
//         sourceSpecializationCode: 133
//       },
//       {
//         sourceName: 'jobstreet',
//         sourceIndustry: 'Admin/Human Resources',
//         sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=137&area=&salary=&src=12',
//         sourceSpecialization: 'Human Resources Jobs',
//         sourceSearchDepth: 2,
//         sourceSpecializationCode: 137
//       },
//       {
//         sourceName: 'jobstreet',
//         sourceIndustry: 'Admin/Human Resources',
//         sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=146&area=&salary=&src=12',
//         sourceSpecialization: 'Secretarial Jobs',
//         sourceSearchDepth: 2,
//         sourceSpecializationCode: 146
//       },
//       {
//         sourceName: 'jobstreet',
//         sourceIndustry: 'Admin/Human Resources',
//         sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=148&area=&salary=&src=12',
//         sourceSpecialization: 'Top Management Jobs',
//         sourceSearchDepth: 2,
//         sourceSpecializationCode: 148
//       },
//       {
//         sourceName: 'jobstreet',
//         sourceIndustry: 'Arts/Media/Communications',
//         sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=100&area=&salary=&src=12',
//         sourceSpecialization: 'Advertising Jobs',
//         sourceSearchDepth: 2,
//         sourceSpecializationCode: 100
//       },
//       {
//         sourceName: 'jobstreet',
//         sourceIndustry: 'Arts/Media/Communications',
//         sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=101&area=&salary=&src=12',
//         sourceSpecialization: 'Arts/Creative Design Jobs',
//         sourceSearchDepth: 2,
//         sourceSpecializationCode: 101
//       },
//       {
//         sourceName: 'jobstreet',
//         sourceIndustry: 'Arts/Media/Communications',
//         sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=106&area=&salary=&src=12',
//         sourceSpecialization: 'Entertainment Jobs',
//         sourceSearchDepth: 2,
//         sourceSpecializationCode: 106
//       },
//       {
//         sourceName: 'jobstreet',
//         sourceIndustry: 'Arts/Media/Communications',
//         sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=141&area=&salary=&src=12',
//         sourceSpecialization: 'Public Relations Jobs',
//         sourceSearchDepth: 2,
//         sourceSpecializationCode: 141
//       },
//       {
//         sourceName: 'jobstreet',
//         sourceIndustry: 'Building/Construction',
//         sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=150&area=&salary=&src=12',
//         sourceSpecialization: 'Architect/Interior Design Jobs',
//         sourceSearchDepth: 2,
//         sourceSpecializationCode: 150
//       },
//       {
//         sourceName: 'jobstreet',
//         sourceIndustry: 'Building/Construction',
//         sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=180&area=&salary=&src=12',
//         sourceSpecialization: 'Civil Engineering/Construction Jobs',
//         sourceSearchDepth: 2,
//         sourceSpecializationCode: 180
//       },
//       {
//         sourceName: 'jobstreet',
//         sourceIndustry: 'Building/Construction',
//         sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=184&area=&salary=&src=12',
//         sourceSpecialization: 'Property/Real Estate Jobs',
//         sourceSearchDepth: 2,
//         sourceSpecializationCode: 184
//       },
//       {
//         sourceName: 'jobstreet',
//         sourceIndustry: 'Building/Construction',
//         sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=198&area=&salary=&src=12',
//         sourceSpecialization: 'Quantity Surveying Jobs',
//         sourceSearchDepth: 2,
//         sourceSpecializationCode: 198
//       },

//       // // computer it
//       // , "191"
//       // , "192"
//       // , "193"
//       // // education/training
//       // , "105"
//       // , "121"
//       // // engineering
//       // , "185"
//       // , "186"
//       // , "187"
//       // , "188"  
//       // , "189"
//       // , "190"
//       // , "195"
//       // , "200"
//       // // healthcare
//       // , "111"
//       // , "112"
//       // , "113"
//       // // hotel/rest
//       // , "107"
//       // , "114"
//       // // manufacturing
//       // , "115"
//       // , "140"
//       // , "194"
//       // , "196"  
//       // , "197"
//       // // sales/marketing
//       // , "139"
//       // , "142"
//       // , "143"
//       // , "144"  
//       // , "145"  
//       // , "149"  
//       // , "151"
//       // // sciences
//       // , "102"
//       // , "103"
//       // , "108"
//       // , "109"  
//       // , "181"  
//       // , "182"  
//       // , "183"  
//       // , "199"  
//       // // services
//       // , "118"
//       // , "119"
//       // , "120"
//       // , "134"  
//       // , "138"  
//       // , "147"  
//       // , "152"  
//       // // others
//       // , "90"
//       // , "104"
//       // , "110"
//       // , "116"  
//       // , "117"  
//     ];
//     var subSpecTargets = [];
//     var jobDescriptionTargets = [];
//     var jobContentURLs = [];

//     specializationCodes.each(function(obj, index, callback){

//       JobStreetSources.insert({
//         sourceIndustry: obj.sourceIndustry,
//         sourceUrl: obj.sourceUrl,
//         sourceSpecialization: obj.sourceSpecialization,
//         sourceSearchDepth: obj.sourceSearchDepth,
//         sourceSpecializationCode: obj.sourceSpecializationCode
//       }, function(err, res){
//         if (err)
//           console.log(err);
//       });

//       subSpecTargets.push({
//         sourceUrl: obj.sourceUrl, 
//         sourceSearchDepth: obj.sourceSearchDepth,
//         sourceIndustry: obj.sourceIndustry,
//         sourceSpecialization: obj.sourceSpecialization,
//       });
//       console.log('subSpecTargets' + subSpecTargets);
//     });
      
//     subSpecTargets.each(function(obj,index){
//       var i = 1;
//       // upperLimit defines the pagedepth of the search minus 1
//       var upperLimit = obj.sourceSearchDepth;
//       var pageTarget = "";
//       while (i < upperLimit) {
//           pageTarget = obj.sourceUrl + '&pg=' + i;
//           i++;
//           console.log('pageTarget:' + pageTarget);
        
//         jobDescriptionTargets.push({
//           jobUrl: pageTarget, 
//           sourceIndustry: obj.sourceIndustry,
//           sourceSpecialization: obj.sourceSpecialization
//         });
//       }
//     });

//     var groupedItems = [];
//     var uniqueItems = _.uniq(groupedItems);
//     function insertNewItem (obj) {

//       HTTP.call("GET", obj.jobUrl, function (error, result) {
//         var self = this;
//         var newPost = {};

//         if(error && result.statusCode !== 200){console.log('Request error.');}
        
//         if (result.statusCode == 200 && obj.jobUrl.search("job-classified-ads") == -1){
//           console.log('Successful HTTP request on' + obj.jobUrl);

//           //.position-title-link elements contain target URLS
//           var info = result.content
//           , $ = cheerio.load(info)
//           , $body = $('body');

//           JobStreetItems.insert({
//             title: $body.find('#position_title').text()
//             , url: obj.jobUrl
//             , company: $body.find('#company_name').text()
//             , location: $body.find('#single_work_location').text()
//             , experience: $body.find('#years_of_experience').text()
//             , sourceIndustry: obj.sourceIndustry
//             , sourceSpecialization: obj.sourceSpecialization
//           });
//         }

//       // Classified ads: some post properties are not available
//         if (result.statusCode == 200 && obj.jobUrl.search("job-classified-ads") > 0){
//           console.log('Successful HTTP request, classified job posting, using alternate parse targets');

//           //.position-title-link elements contain target URLS
//           var info = result.content
//           , $ = cheerio.load(info)
//           , $body = $('body');

//           JobStreetItems.insert({
//             title: $body.find('.rRowTitleCls').text()
//             , url: obj.jobUrl
//             , company: $body.find('.rRowCompanyCls').text()
//             , location: $body.find('.rRowLocCls').text()
//             , experience: null
//             , sourceIndustry: obj.sourceIndustry
//             , sourceSpecialization: obj.sourceSpecialization
//           });
//         }

//       });
//     }
//     function findUniques(array) {
//       return (_.uniq(array));
//     }
//     function findUniquesCount(array) {
//       return (_.uniq(array).count());
//     }
//     function insertCleanedArray(array) {
//       array.each(function(i, item) {
//         console.log('insert array i', i);
//         console.log('insert array item', item);
//         var exists = JobStreetItems.findOne({url: i.jobUrl});
//         if (exists){
//           console.log('Found a matching URL. Skipping to next item');
//         } else {
//           console.log('New jobStreetItem found, creating document....');
//           insertNewItem(i);
//         }
//       });
//     }
//     function callbackUnique(array) {
//       var uni = _.uniq(array);
//       insertCleanedArray(uni);
//     }
//     var uniqueJobs = findUniques(groupedItems);

//     // jobDescriptionTargets.each(function(obj,index){
//     //   HTTP.call("GET", obj.jobUrl, function (error, result) {
//     //     var self = this;
//     //     self.items = new Array();
//     //     if(error && result.statusCode !== 200){console.log('Request error.');}
        
//     //     if (result.statusCode == 200){
//     //       console.log('Successful HTTP request!');

//     //       //.position-title-link elements contain target URLS
//     //       var info = result.content
//     //       , $ = cheerio.load(info)
//     //       , $body = $('body')
//     //       , $targets = $body.find('.position-title-link');

//     //       // for each one of those elements found
//     //       $targets.each(function(i, item){
//     //         var $a = $(item).attr('href');
//     //         //and add all that data to my items array
//     //             self.items[i] = { 
//     //           href: $a
//     //         };
//     //         groupedItems.push({
//     //           jobUrl: $a,
//     //           sourceIndustry: obj.sourceIndustry,
//     //           sourceSpecialization: obj.sourceSpecialization
//     //         });
//     //       });
//     //     }
//     //     callbackUnique(groupedItems);
//     //   });
//     // });
//   }
// });
