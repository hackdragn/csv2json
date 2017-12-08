//********************************************************
//csv2json.js
//Author: HackDragn
//Date: 08/12/17
//Description: Accepts a .csv filename as the only argument
//then converts to .json with the original filename
//********************************************************

//load modules
var fs = require('fs');

//extract the filename from argv without the extension
var fileSplit = process.argv[2].split('/');
var fileNameExt = fileSplit[fileSplit.length-1].split('.');
var fileName = fileNameExt[0];

//read the file synchronosly and split on line breaks
var array = fs.readFileSync(process.argv[2]).toString().split("\r\n");

//remove any blank lines
array = array.filter((entry) => { return entry.trim() != ''; });

//extract the field names from the first line
var fieldNames = array[0].split(",");

//set the formatting that needs to be inserted for a valid JSON file
var startJSON = "[\r\n\  {\r\n";
var midJSON = "  },\r\n  {\r\n"
var endJSON = "  }\r\n]";

var dataString = startJSON;

//loop through each line in the array
for(var i=1; i<array.length; i++) {
  var fieldData = array[i].split(",");
  for(var j=0; j<fieldNames.length; j++) {
    dataString += '    ' + '"' + fieldNames[j] + '": "' + fieldData[j] + '"';
    //only insert a comma if there is another field name
    if(j != fieldNames.length-1) dataString += ",";
    dataString += "\r\n";
  }
  if(i<array.length-1) dataString += midJSON;
}

dataString += endJSON;

//write to the new file with the same filename but a .json extension
fs.writeFile(fileName + '.json', dataString, (err) => {
  if(err) throw err
  console.log('File conversion complete')
});
