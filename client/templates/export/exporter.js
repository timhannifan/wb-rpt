var agnes;
(function() {
var handbag = function(purse) {
	var _agnes = this;
	var _p = {};
	var _myUsualPurse = {
		trimFields : true,
		fieldDelim : ",",
		rowDelim : "\n",
		stripQuote : true,
		qual : '"'
	};
	_p.purse = purse || _myUsualPurse;
	_p.trinkets = {
		trim:function(val) {
			if (val === null) { 
				return ""; 
			}
			return val.toString().replace(/^\s+|\s+$/, "");
		},
		escapeCsv:function(rawText, rowDelim, fieldDelim, qual) {
			//if it contains a fieldDelimeter, a rowDelimiter or a qualfier
			// then it needs to be qualified.
			//(and first: any embedded qualifiers need to be doubled)
			var needsQualifying = false;
			if (rawText == null || rawText == undefined) return "";
			
			if (!rawText.indexOf) { // typeof rawText === "number"
				//maybe a number! no need to escape it.
				return rawText;
			}
			
			if (rawText.indexOf(fieldDelim) != -1) {
				needsQualifying = true;
			}
			
			if (rawText.indexOf(rowDelim) != -1) {
				needsQualifying = true;
			}
			
			if (rawText.indexOf(qual) != -1) {
				needsQualifying = true;
				rawText = rawText.replace(new RegExp(qual, 'g'), qual + qual);
			}
			
			if (needsQualifying) {
				rawText = qual + rawText + qual;
			}
			return rawText;
		},
		rtrim:function (val, of) {
				if (!of) {
					of = '\s';
				}
				//if it ends with spaces... remove them!
				of = of.replace('|','\\|');
				of = of.replace('+','\\+');
				//alert(of);
				return val.replace(new RegExp(of + '+$', 'gm'), '');
		}
	}
	
	_agnes.settings = function(settings) {
	  _p.purse = settings || _p.purse;
	  return _p.purse;
	};
	_agnes.csvToJson = function(csvString, rowDelim, fieldDelim) {
		var array2d = this.csvToArray2d(csvString, rowDelim, fieldDelim);
		return this.array2dToJson(array2d);
	},
	
	_agnes.jsonToCsv = function(allObjects, rowDelim, fieldDelim, qual) {
		var properties, result, arr, headings, items, i, prop;
		rowDelim = rowDelim || this.rowDelimiter();
		fieldDelim = fieldDelim || ',';
		qual = qual || '"';
		properties = [];
		result = "";
		headings = "";
		//if it's not an array, convert it to one now.
		//caveat: what happens if it's a string? (i.e. still has length property)
		if (!allObjects.length) {
		  arr = [];
		  arr[0] = allObjects;
		  allObjects = arr;
		}
		
		for (i in allObjects) {
			items = allObjects[i];
			for (prop in items) {
				if (i == 0)
				{
					headings += _p.trinkets.escapeCsv(prop, rowDelim, fieldDelim, qual) + fieldDelim;
				}
				//Note: this assumes each object has exactly the same properties as the first object.
				//Note: further assumes that all properties are in the same order as the first object!
				//Note: further, performs no formatting of the property... even if it is an object itself.
				result+=_p.trinkets.escapeCsv(items[prop], rowDelim, fieldDelim, qual);
				result+=fieldDelim;
			}
			
			result = _p.trinkets.rtrim(result, fieldDelim);
			result += rowDelim;
		}
		return _p.trinkets.rtrim(headings, fieldDelim) + rowDelim + result;
	},
	_agnes.csvToArray2d = function(lines, rowDelim, fieldDelim) {
		var i, numLines, array2d;
		var lineArray;
		rowDelim = rowDelim || this.rowDelimiter();
		fieldDelim =  fieldDelim || ",";
		lineArray = this.toArray(lines, rowDelim, null, false);
		numLines = lineArray.length;
		array2d = [];
		j = 0;
		for (i = 0; i < numLines; i = i + 1) {
			// skip empty rows.
			if (lineArray[i] == null) { continue;}
			array2d[j] = this.toArray(lineArray[i], fieldDelim);
			j++;
		}
		
		return array2d;
    },	
	_agnes.array2dToJson = function(array2d) {
		var fields, i, numRows, header, jarray, json;
		numRows = array2d.length;
		jarray = [];
		for (i = 0; i < numRows; i = i + 1) {
			fields = (array2d[i]);
			if (i === 0) {
				header=fields;
			} else {
				json = this.rowToJson(header, fields);
				jarray[i-1] = json;
			}
		}
		return jarray;
	},
	_agnes.toArray = function(line, splitOn, unclosedQuoteObject, stripQuote) { 
		//Note: unclosedQuoteObject is an object, rather than a boolean, so that 
		//      callers can check its inner value after calling toArray, to see if 
		//      the line ended with an unclosed quote.
		//      In other languages it would be a ByRef boolean parameter.
		var unclosedQuote, qual, trimFields, parts, i, iStart, linei, lineQual, trimmed;
		
		if (unclosedQuoteObject != undefined) {
			unclosedQuote = (unclosedQuoteObject.unclosed || false);
		} else {
			unclosedQuote = false;
		}
		
		if (stripQuote == undefined) {
			stripQuote = _p.purse.stripQuote || _myUsualPurse.stripQuote;
		}
		
		qual = _p.purse.qual || _myUsualPurse.qual;
		splitOn = splitOn || _p.purse.fieldDelim || _myUsualPurse.fieldDelim;
		trimFields = _p.purse.trimFields || _myUsualPurse.trimFields;
		
		parts = [];
		i = 0;
		iStart = 0;
		
		if (line == undefined) {
			return parts;
		}
			
		for (i = 0; i < line.length; i = i + 1) {
			linei = line.substr(i, splitOn.length);
			
			lineQual = line.substr(i, qual.length);	
			if (linei == splitOn) {
				if (!unclosedQuote) {
				    if (trimFields) {
						trimmed = _p.trinkets.trim(line.substr(iStart, i - iStart));
						parts.push(this.unescapeCsv(trimmed, qual, stripQuote));
					} else {
						parts.push(this.unescapeCsv(line.substr(iStart, i - iStart), qual, stripQuote));
					}
					
					iStart = i + splitOn.length;
				}
			} else if (lineQual == qual) {
				unclosedQuote = !unclosedQuote;
				//Maybe... if qual.Length > 1 then
				//iStart = i - 1 + qual.Length;
			}
		}

		if (trimFields) {
		    parts.push(this.unescapeCsv(_p.trinkets.trim(line.substr(iStart, i - iStart)), qual, stripQuote));
		} else {
		    parts.push(this.unescapeCsv(line.substr(iStart, i - iStart), qual, stripQuote));
		}

		if (unclosedQuoteObject != undefined) {
			unclosedQuoteObject.unclosed = unclosedQuote;
		}

		return parts;
	},
	_agnes.rowDelimiter = function() {
		//determine the standard row delimiter used by this browser
		inputElem = document.createElement('textarea');
		//assign a \r\n to the textarea...
		inputElem.value = "\r\n";
		//then see what value comes back...
		return inputElem.value;
		//strange fact that the browsers silently convert the line endings of a textarea into 
		//the line ending of their choice.
		//So far I've only confirmed that chrome and ie do this. ie 10, strangely, is different from other ie's.
	},
	_agnes.unescapeCsv = function(value, qual, stripQuote) {
			if (value === undefined || value === "") {
				return null;
			}
			
			if (!stripQuote) {
				return value;
			}
			
			qual = (qual || '"');
			
			//Remove leading and trailing whitespace. i.e. spaces and tabs
			if (this.trimFields) {
				value = _p.trinkets.trim(value);
			}
			
			//If it begins AND ends with quotes -- remove them.
			if (value.substr(0, qual.length) === qual && value.substr(value.length - qual.length) === qual) {
				value = value.substr(qual.length);
				value = value.substr(0, value.length - qual.length);
			}
			
			//turn double quotes into single quotes
			value = value.replace(new RegExp(qual + qual, 'g'), qual);
			return value;
	},
	_agnes.arrayToJson = function(dataRows) {
		var fields, i, numRows, header, jarray, json;
		numRows = dataRows.length;
		jarray = [];
		for (i = 0; i < numRows; i = i + 1) {
			fields = this.toArray(dataRows[i]);
			if (i === 0) {
				header=fields;
			} else {
				json = this.rowToJson(header, fields);
				jarray[i-1] = json;
			}
		}
		return jarray;
	},
	_agnes.rowToJson = function(properties, values) {
  		var i,j,o;//, result;
		o={};
		for (j = 0; j < properties.length; j = j + 1) {
			o[properties[j]]=values[j];
		}
		return o;
	}
  }
  //creates a default handbag for agnes
  /*
  var _defaultHandbag = function() { 
    return {
	  trimFields : true,
      fieldDelim : ",",
      rowDelim : "\n",
	  stripQuote : true,
	  qual : '"'
	};
  };
  */
  agnes = new handbag();//_defaultHandbag());
})();

MyAppExporter = {
	exportAllRpt: function() {
		var self = this;
		Meteor.call("exportAllRpt", function(error, data) {
 
			if ( error ) {
				alert(error); 
				return false;
			}
			
			var csv = Papa.unparse(data);
			var title = "rpt_descriptive.csv";
			self._downloadCSV(csv, title);
		});
	},
	exportPercentTitle: function() {
		var self = this;
		var jsonData, csvData, fullData;
		// fullData = [{
		//     "_id" : "Rh6Pm7wp69c9ZHz4T",
		//     "id" : "4641",
		//     "occ_title" : "string",
		//     "occ_desc" : "string",
		//     "firm_name" : "string",
		//     "sector" : "string",
		//     "cleanTitle" : "string",
		//     "titleTags" : [ 
		//     ],
		//     "tagsOnly" : [ 
		//     ],
		//     "cleanDesc" : "string",
		//     "descTags" : [ 
		//     ],
		//     "cleanTitleTags" : [ 
		//     ],
		//     "cleanTagsOnly" : [ 
		//     ],
		//     "cleanDescTags" : [ 
		//     ],
		//     "repTitleTagMatchStrong" : [ 
		//     ],
		//     "titleInKeywords" : [ 
		//     ],
		//     "percentMatchTitleKeywords" : [ 
		//         {
		//             "mascoCode" : "2310",
		//             "rptArrayL" : 1,
		//             "intersection" : [ 
		//                 "consultant"
		//             ],
		//             "intersectionL" : 1,
		//             "mascoArrayL" : 89,
		//             "percentVsMascoRptSize" : 0.0112359550561798,
		//             "percentVsRptSize" : 1
		//         }, 
		//         {
		//             "mascoCode" : "2153",
		//             "rptArrayL" : 1,
		//             "intersection" : [ 
		//                 "consultant"
		//             ],
		//             "intersectionL" : 1,
		//             "mascoArrayL" : 52,
		//             "percentVsMascoRptSize" : 0.0192307692307692,
		//             "percentVsRptSize" : 1
		//         }, 
		//         {
		//             "mascoCode" : "2511",
		//             "rptArrayL" : 1,
		//             "intersection" : [ 
		//                 "consultant"
		//             ],
		//             "intersectionL" : 1,
		//             "mascoArrayL" : 74,
		//             "percentVsMascoRptSize" : 0.0135135135135135,
		//             "percentVsRptSize" : 1
		//         }, 
		//         {
		//             "mascoCode" : "2212",
		//             "rptArrayL" : 1,
		//             "intersection" : [ 
		//                 "consultant"
		//             ],
		//             "intersectionL" : 1,
		//             "mascoArrayL" : 162,
		//             "percentVsMascoRptSize" : 0.0061728395061728,
		//             "percentVsRptSize" : 1
		//         }, 
		//         {
		//             "mascoCode" : "2519",
		//             "rptArrayL" : 1,
		//             "intersection" : [ 
		//                 "consultant"
		//             ],
		//             "intersectionL" : 1,
		//             "mascoArrayL" : 36,
		//             "percentVsMascoRptSize" : 0.0277777777777778,
		//             "percentVsRptSize" : 1
		//         }, 
		//         {
		//             "mascoCode" : "2171",
		//             "rptArrayL" : 1,
		//             "intersection" : [ 
		//                 "consultant"
		//             ],
		//             "intersectionL" : 1,
		//             "mascoArrayL" : 34,
		//             "percentVsMascoRptSize" : 0.0294117647058824,
		//             "percentVsRptSize" : 1
		//         }, 
		//         {
		//             "mascoCode" : "1221",
		//             "rptArrayL" : 1,
		//             "intersection" : [ 
		//                 "consultant"
		//             ],
		//             "intersectionL" : 1,
		//             "mascoArrayL" : 140,
		//             "percentVsMascoRptSize" : 0.0071428571428571,
		//             "percentVsRptSize" : 1
		//         }, 
		//         {
		//             "mascoCode" : "1435",
		//             "rptArrayL" : 1,
		//             "intersection" : [ 
		//                 "consultant"
		//             ],
		//             "intersectionL" : 1,
		//             "mascoArrayL" : 32,
		//             "percentVsMascoRptSize" : 0.0312500000000000,
		//             "percentVsRptSize" : 1
		//         }, 
		//         {
		//             "mascoCode" : "2146",
		//             "rptArrayL" : 1,
		//             "intersection" : [ 
		//                 "consultant"
		//             ],
		//             "intersectionL" : 1,
		//             "mascoArrayL" : 178,
		//             "percentVsMascoRptSize" : 0.0056179775280899,
		//             "percentVsRptSize" : 1
		//         }, 
		//         {
		//             "mascoCode" : "1120",
		//             "rptArrayL" : 1,
		//             "intersection" : [ 
		//                 "consultant"
		//             ],
		//             "intersectionL" : 1,
		//             "mascoArrayL" : 152,
		//             "percentVsMascoRptSize" : 0.0065789473684211,
		//             "percentVsRptSize" : 1
		//         }, 
		//         {
		//             "mascoCode" : "2421",
		//             "rptArrayL" : 1,
		//             "intersection" : [ 
		//                 "consultant"
		//             ],
		//             "intersectionL" : 1,
		//             "mascoArrayL" : 89,
		//             "percentVsMascoRptSize" : 0.0112359550561798,
		//             "percentVsRptSize" : 1
		//         }, 
		//         {
		//             "mascoCode" : "2611",
		//             "rptArrayL" : 1,
		//             "intersection" : [ 
		//                 "consultant"
		//             ],
		//             "intersectionL" : 1,
		//             "mascoArrayL" : 54,
		//             "percentVsMascoRptSize" : 0.0185185185185185,
		//             "percentVsRptSize" : 1
		//         }, 
		//         {
		//             "mascoCode" : "1330",
		//             "rptArrayL" : 1,
		//             "intersection" : [ 
		//                 "consultant"
		//             ],
		//             "intersectionL" : 1,
		//             "mascoArrayL" : 138,
		//             "percentVsMascoRptSize" : 0.0072463768115942,
		//             "percentVsRptSize" : 1
		//         }, 
		//         {
		//             "mascoCode" : "2141",
		//             "rptArrayL" : 1,
		//             "intersection" : [ 
		//                 "consultant"
		//             ],
		//             "intersectionL" : 1,
		//             "mascoArrayL" : 74,
		//             "percentVsMascoRptSize" : 0.0135135135135135,
		//             "percentVsRptSize" : 1
		//         }, 
		//         {
		//             "mascoCode" : "2269",
		//             "rptArrayL" : 1,
		//             "intersection" : [ 
		//                 "consultant"
		//             ],
		//             "intersectionL" : 1,
		//             "mascoArrayL" : 42,
		//             "percentVsMascoRptSize" : 0.0238095238095238,
		//             "percentVsRptSize" : 1
		//         }, 
		//         {
		//             "mascoCode" : "2211",
		//             "rptArrayL" : 1,
		//             "intersection" : [ 
		//                 "consultant"
		//             ],
		//             "intersectionL" : 1,
		//             "mascoArrayL" : 25,
		//             "percentVsMascoRptSize" : 0.0400000000000000,
		//             "percentVsRptSize" : 1
		//         }, 
		//         {
		//             "mascoCode" : "2412",
		//             "rptArrayL" : 1,
		//             "intersection" : [ 
		//                 "consultant"
		//             ],
		//             "intersectionL" : 1,
		//             "mascoArrayL" : 43,
		//             "percentVsMascoRptSize" : 0.0232558139534884,
		//             "percentVsRptSize" : 1
		//         }, 
		//         {
		//             "mascoCode" : "2151",
		//             "rptArrayL" : 1,
		//             "intersection" : [ 
		//                 "consultant"
		//             ],
		//             "intersectionL" : 1,
		//             "mascoArrayL" : 85,
		//             "percentVsMascoRptSize" : 0.0117647058823529,
		//             "percentVsRptSize" : 1
		//         }, 
		//         {
		//             "mascoCode" : "2529",
		//             "rptArrayL" : 1,
		//             "intersection" : [ 
		//                 "consultant"
		//             ],
		//             "intersectionL" : 1,
		//             "mascoArrayL" : 22,
		//             "percentVsMascoRptSize" : 0.0454545454545455,
		//             "percentVsRptSize" : 1
		//         }, 
		//         {
		//             "mascoCode" : "1323",
		//             "rptArrayL" : 1,
		//             "intersection" : [ 
		//                 "consultant"
		//             ],
		//             "intersectionL" : 1,
		//             "mascoArrayL" : 56,
		//             "percentVsMascoRptSize" : 0.0178571428571429,
		//             "percentVsRptSize" : 1
		//         }, 
		//         {
		//             "mascoCode" : "2142",
		//             "rptArrayL" : 1,
		//             "intersection" : [ 
		//                 "consultant"
		//             ],
		//             "intersectionL" : 1,
		//             "mascoArrayL" : 149,
		//             "percentVsMascoRptSize" : 0.0067114093959732,
		//             "percentVsRptSize" : 1
		//         }, 
		//         {
		//             "mascoCode" : "2431",
		//             "rptArrayL" : 1,
		//             "intersection" : [ 
		//                 "consultant"
		//             ],
		//             "intersectionL" : 1,
		//             "mascoArrayL" : 48,
		//             "percentVsMascoRptSize" : 0.0208333333333333,
		//             "percentVsRptSize" : 1
		//         }, 
		//         {
		//             "mascoCode" : "2411",
		//             "rptArrayL" : 1,
		//             "intersection" : [ 
		//                 "consultant"
		//             ],
		//             "intersectionL" : 1,
		//             "mascoArrayL" : 122,
		//             "percentVsMascoRptSize" : 0.0081967213114754,
		//             "percentVsRptSize" : 1
		//         }, 
		//         {
		//             "mascoCode" : "2654",
		//             "rptArrayL" : 1,
		//             "intersection" : [ 
		//                 "consultant"
		//             ],
		//             "intersectionL" : 1,
		//             "mascoArrayL" : 23,
		//             "percentVsMascoRptSize" : 0.0434782608695652,
		//             "percentVsRptSize" : 1
		//         }, 
		//         {
		//             "mascoCode" : "2432",
		//             "rptArrayL" : 1,
		//             "intersection" : [ 
		//                 "consultant"
		//             ],
		//             "intersectionL" : 1,
		//             "mascoArrayL" : 15,
		//             "percentVsMascoRptSize" : 0.0666666666666667,
		//             "percentVsRptSize" : 1
		//         }, 
		//         {
		//             "mascoCode" : "2120",
		//             "rptArrayL" : 1,
		//             "intersection" : [ 
		//                 "consultant"
		//             ],
		//             "intersectionL" : 1,
		//             "mascoArrayL" : 56,
		//             "percentVsMascoRptSize" : 0.0178571428571429,
		//             "percentVsRptSize" : 1
		//         }, 
		//         {
		//             "mascoCode" : "4221",
		//             "rptArrayL" : 1,
		//             "intersection" : [ 
		//                 "consultant"
		//             ],
		//             "intersectionL" : 1,
		//             "mascoArrayL" : 4,
		//             "percentVsMascoRptSize" : 0.2500000000000000,
		//             "percentVsRptSize" : 1
		//         }
		//     ]
		// }];
		// fullData = Rpt.find({},{$exists: {percentMatchTitleKeywords: true}}).fetch();
		fullData = Rpt.find({percentMatchTitleKeywords: {$exists: true}}).fetch();

		jsonData = [];

		function pushData(data, userId){
			var pushThese = data;

			for (var i = 0; i < pushThese.length; i++) {
				pushThese[i].userId = userId;
				// for (var attrname in pushThese[i]) { 
				// 	// console.log(attrname);
				// }
				// console.dir(pushThese[i]);
				jsonData.push(pushThese[i]);
			}
		}

		for (var i = 0; i < fullData.length; i++) {
			//array of objects
			var percents = fullData[i].percentMatchTitleKeywords;
			var userId = fullData[i].id;

			if (percents && userId){
				pushData(percents, userId);				
			}

		}

		csvData = Papa.unparse(jsonData);
		// $ = agnes;
		// csvData = $.jsonToCsv(jsonData);
		var title = "rpt_percents.csv";
		self._downloadCSV(csvData, title);
	},
 
	_downloadCSV: function(csv, title) {
		var blob = new Blob([csv]);
		var a = window.document.createElement("a");
	    a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
	    a.download = title;
	    document.body.appendChild(a);
	    a.click();
	    document.body.removeChild(a);
	}
}

// exportPercentTitle: function() {
// 	var self = this;
// 	var jsonData, csvData;
// 	jsonData = [ 
// 	        {
// 	            "mascoCode" : "2310",
// 	            "rptArrayL" : 1,
// 	            "intersection" : [ 
// 	                "consultant"
// 	            ],
// 	            "intersectionL" : 1,
// 	            "mascoArrayL" : 89,
// 	            "percentVsMascoRptSize" : 0.0112359550561798,
// 	            "percentVsRptSize" : 1
// 	        }, 
// 	        {
// 	            "mascoCode" : "2153",
// 	            "rptArrayL" : 1,
// 	            "intersection" : [ 
// 	                "consultant"
// 	            ],
// 	            "intersectionL" : 1,
// 	            "mascoArrayL" : 52,
// 	            "percentVsMascoRptSize" : 0.0192307692307692,
// 	            "percentVsRptSize" : 1
// 	        }, 
// 	        {
// 	            "mascoCode" : "2511",
// 	            "rptArrayL" : 1,
// 	            "intersection" : [ 
// 	                "consultant"
// 	            ],
// 	            "intersectionL" : 1,
// 	            "mascoArrayL" : 74,
// 	            "percentVsMascoRptSize" : 0.0135135135135135,
// 	            "percentVsRptSize" : 1
// 	        }, 
// 	        {
// 	            "mascoCode" : "2212",
// 	            "rptArrayL" : 1,
// 	            "intersection" : [ 
// 	                "consultant"
// 	            ],
// 	            "intersectionL" : 1,
// 	            "mascoArrayL" : 162,
// 	            "percentVsMascoRptSize" : 0.0061728395061728,
// 	            "percentVsRptSize" : 1
// 	        }, 
// 	        {
// 	            "mascoCode" : "2519",
// 	            "rptArrayL" : 1,
// 	            "intersection" : [ 
// 	                "consultant"
// 	            ],
// 	            "intersectionL" : 1,
// 	            "mascoArrayL" : 36,
// 	            "percentVsMascoRptSize" : 0.0277777777777778,
// 	            "percentVsRptSize" : 1
// 	        }, 
// 	        {
// 	            "mascoCode" : "2171",
// 	            "rptArrayL" : 1,
// 	            "intersection" : [ 
// 	                "consultant"
// 	            ],
// 	            "intersectionL" : 1,
// 	            "mascoArrayL" : 34,
// 	            "percentVsMascoRptSize" : 0.0294117647058824,
// 	            "percentVsRptSize" : 1
// 	        }, 
// 	        {
// 	            "mascoCode" : "1221",
// 	            "rptArrayL" : 1,
// 	            "intersection" : [ 
// 	                "consultant"
// 	            ],
// 	            "intersectionL" : 1,
// 	            "mascoArrayL" : 140,
// 	            "percentVsMascoRptSize" : 0.0071428571428571,
// 	            "percentVsRptSize" : 1
// 	        }, 
// 	        {
// 	            "mascoCode" : "1435",
// 	            "rptArrayL" : 1,
// 	            "intersection" : [ 
// 	                "consultant"
// 	            ],
// 	            "intersectionL" : 1,
// 	            "mascoArrayL" : 32,
// 	            "percentVsMascoRptSize" : 0.0312500000000000,
// 	            "percentVsRptSize" : 1
// 	        }, 
// 	        {
// 	            "mascoCode" : "2146",
// 	            "rptArrayL" : 1,
// 	            "intersection" : [ 
// 	                "consultant"
// 	            ],
// 	            "intersectionL" : 1,
// 	            "mascoArrayL" : 178,
// 	            "percentVsMascoRptSize" : 0.0056179775280899,
// 	            "percentVsRptSize" : 1
// 	        }, 
// 	        {
// 	            "mascoCode" : "1120",
// 	            "rptArrayL" : 1,
// 	            "intersection" : [ 
// 	                "consultant"
// 	            ],
// 	            "intersectionL" : 1,
// 	            "mascoArrayL" : 152,
// 	            "percentVsMascoRptSize" : 0.0065789473684211,
// 	            "percentVsRptSize" : 1
// 	        }, 
// 	        {
// 	            "mascoCode" : "2421",
// 	            "rptArrayL" : 1,
// 	            "intersection" : [ 
// 	                "consultant"
// 	            ],
// 	            "intersectionL" : 1,
// 	            "mascoArrayL" : 89,
// 	            "percentVsMascoRptSize" : 0.0112359550561798,
// 	            "percentVsRptSize" : 1
// 	        }, 
// 	        {
// 	            "mascoCode" : "2611",
// 	            "rptArrayL" : 1,
// 	            "intersection" : [ 
// 	                "consultant"
// 	            ],
// 	            "intersectionL" : 1,
// 	            "mascoArrayL" : 54,
// 	            "percentVsMascoRptSize" : 0.0185185185185185,
// 	            "percentVsRptSize" : 1
// 	        }, 
// 	        {
// 	            "mascoCode" : "1330",
// 	            "rptArrayL" : 1,
// 	            "intersection" : [ 
// 	                "consultant"
// 	            ],
// 	            "intersectionL" : 1,
// 	            "mascoArrayL" : 138,
// 	            "percentVsMascoRptSize" : 0.0072463768115942,
// 	            "percentVsRptSize" : 1
// 	        }, 
// 	        {
// 	            "mascoCode" : "2141",
// 	            "rptArrayL" : 1,
// 	            "intersection" : [ 
// 	                "consultant"
// 	            ],
// 	            "intersectionL" : 1,
// 	            "mascoArrayL" : 74,
// 	            "percentVsMascoRptSize" : 0.0135135135135135,
// 	            "percentVsRptSize" : 1
// 	        }, 
// 	        {
// 	            "mascoCode" : "2269",
// 	            "rptArrayL" : 1,
// 	            "intersection" : [ 
// 	                "consultant"
// 	            ],
// 	            "intersectionL" : 1,
// 	            "mascoArrayL" : 42,
// 	            "percentVsMascoRptSize" : 0.0238095238095238,
// 	            "percentVsRptSize" : 1
// 	        }, 
// 	        {
// 	            "mascoCode" : "2211",
// 	            "rptArrayL" : 1,
// 	            "intersection" : [ 
// 	                "consultant"
// 	            ],
// 	            "intersectionL" : 1,
// 	            "mascoArrayL" : 25,
// 	            "percentVsMascoRptSize" : 0.0400000000000000,
// 	            "percentVsRptSize" : 1
// 	        }, 
// 	        {
// 	            "mascoCode" : "2412",
// 	            "rptArrayL" : 1,
// 	            "intersection" : [ 
// 	                "consultant"
// 	            ],
// 	            "intersectionL" : 1,
// 	            "mascoArrayL" : 43,
// 	            "percentVsMascoRptSize" : 0.0232558139534884,
// 	            "percentVsRptSize" : 1
// 	        }, 
// 	        {
// 	            "mascoCode" : "2151",
// 	            "rptArrayL" : 1,
// 	            "intersection" : [ 
// 	                "consultant"
// 	            ],
// 	            "intersectionL" : 1,
// 	            "mascoArrayL" : 85,
// 	            "percentVsMascoRptSize" : 0.0117647058823529,
// 	            "percentVsRptSize" : 1
// 	        }, 
// 	        {
// 	            "mascoCode" : "2529",
// 	            "rptArrayL" : 1,
// 	            "intersection" : [ 
// 	                "consultant"
// 	            ],
// 	            "intersectionL" : 1,
// 	            "mascoArrayL" : 22,
// 	            "percentVsMascoRptSize" : 0.0454545454545455,
// 	            "percentVsRptSize" : 1
// 	        }, 
// 	        {
// 	            "mascoCode" : "1323",
// 	            "rptArrayL" : 1,
// 	            "intersection" : [ 
// 	                "consultant"
// 	            ],
// 	            "intersectionL" : 1,
// 	            "mascoArrayL" : 56,
// 	            "percentVsMascoRptSize" : 0.0178571428571429,
// 	            "percentVsRptSize" : 1
// 	        }, 
// 	        {
// 	            "mascoCode" : "2142",
// 	            "rptArrayL" : 1,
// 	            "intersection" : [ 
// 	                "consultant"
// 	            ],
// 	            "intersectionL" : 1,
// 	            "mascoArrayL" : 149,
// 	            "percentVsMascoRptSize" : 0.0067114093959732,
// 	            "percentVsRptSize" : 1
// 	        }, 
// 	        {
// 	            "mascoCode" : "2431",
// 	            "rptArrayL" : 1,
// 	            "intersection" : [ 
// 	                "consultant"
// 	            ],
// 	            "intersectionL" : 1,
// 	            "mascoArrayL" : 48,
// 	            "percentVsMascoRptSize" : 0.0208333333333333,
// 	            "percentVsRptSize" : 1
// 	        }, 
// 	        {
// 	            "mascoCode" : "2411",
// 	            "rptArrayL" : 1,
// 	            "intersection" : [ 
// 	                "consultant"
// 	            ],
// 	            "intersectionL" : 1,
// 	            "mascoArrayL" : 122,
// 	            "percentVsMascoRptSize" : 0.0081967213114754,
// 	            "percentVsRptSize" : 1
// 	        }, 
// 	        {
// 	            "mascoCode" : "2654",
// 	            "rptArrayL" : 1,
// 	            "intersection" : [ 
// 	                "consultant"
// 	            ],
// 	            "intersectionL" : 1,
// 	            "mascoArrayL" : 23,
// 	            "percentVsMascoRptSize" : 0.0434782608695652,
// 	            "percentVsRptSize" : 1
// 	        }, 
// 	        {
// 	            "mascoCode" : "2432",
// 	            "rptArrayL" : 1,
// 	            "intersection" : [ 
// 	                "consultant"
// 	            ],
// 	            "intersectionL" : 1,
// 	            "mascoArrayL" : 15,
// 	            "percentVsMascoRptSize" : 0.0666666666666667,
// 	            "percentVsRptSize" : 1
// 	        }, 
// 	        {
// 	            "mascoCode" : "2120",
// 	            "rptArrayL" : 1,
// 	            "intersection" : [ 
// 	                "consultant"
// 	            ],
// 	            "intersectionL" : 1,
// 	            "mascoArrayL" : 56,
// 	            "percentVsMascoRptSize" : 0.0178571428571429,
// 	            "percentVsRptSize" : 1
// 	        }, 
// 	        {
// 	            "mascoCode" : "4221",
// 	            "rptArrayL" : 1,
// 	            "intersection" : [ 
// 	                "consultant"
// 	            ],
// 	            "intersectionL" : 1,
// 	            "mascoArrayL" : 4,
// 	            "percentVsMascoRptSize" : 0.2500000000000000,
// 	            "percentVsRptSize" : 1
// 	        }
//     ];
// 	$ = agnes;
// 	csvData = $.jsonToCsv(jsonData);
// 	// console.log(csvData);
// 	var title = "rpt_percents.csv";
// 	self._downloadCSV(csvData, title);


// },