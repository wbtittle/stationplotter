var axios = require('axios')
var convert = require('../src/assets/conversions.json')
var fs = require('fs')

myArgs = process.argv.slice(2)
url = "https://www1.ncdc.noaa.gov/pub/data/ghcn/daily/ghcnd-"+myArgs[0]+".txt"

function processFile( newData ){
  var columns = convert['ghcnd-'+myArgs[0]]
  var output = newData.data.split("\n").reduce( ( results, item )=> {
   var row = {}
     for (var elem in columns){
       row[elem] = item.substr(columns[elem].start, columns[elem].length).trim()
     }
     results.push(row);
     return results
   }, [])
   fs.writeFile("public/data/ghcnd-"+myArgs[0]+".json", JSON.stringify(output), 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }

    console.log("JSON file has been saved.");
});
}

axios.get(url).then( response => processFile(response)).catch( e=> { console.log(e); })
