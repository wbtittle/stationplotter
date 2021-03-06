var axios = require('axios')
var convert = require('../src/assets/conversions.json')
var fs = require('fs')

myArgs = process.argv.slice(2)
url = "https://www1.ncdc.noaa.gov/pub/data/ghcn/daily/ghcnd-stations.txt"
url2 = "https://www1.ncdc.noaa.gov/pub/data/ghcn/daily/ghcnd-inventory.txt"
  var output = {}

function processFile( newData ){
  var columns = convert['ghcnd-stations']
  output = newData.data.split("\n").reduce( ( results, item )=> {
   var row = {}
     for (var elem in columns){
       row[elem] = item.substr(columns[elem].start, columns[elem].length).trim()
     }
     if (!results.hasOwnProperty(row['id'])){
       results[row['id']] = row;
     }
     return results
   }, {})

    axios.get(url2).then( response => {
      var columns = convert['ghcnd-inventory']


      response.data.split("\n").forEach( item => {
        var row = {}
        for ( var elem in columns ) {
          row[elem] = item.substr(columns[elem].start, columns[elem].length).trim()
        }
        if (output.hasOwnProperty(row['id']) && row['element'].match(/TAVG|TOBS|TMIN|TMAX/))
        {

            if(!output[row['id']].hasOwnProperty('inventory'))
              output[row['id']]['inventory'] = []
            if (!output[row['id']].hasOwnProperty['data_range'])
              output[row['id']]['data_range'] = 0;

            if (output[row['id']]['data_range'] < parseInt(row['lastyear'])-parseInt(row['firstyear']))
              output[row['id']]['data_range'] = row['lastyear']-row['firstyear']

            output[row['id']]['inventory'].push(row['element'])
        }

      })
      var finalOut = []
      for (item in output){
        if (output[item].hasOwnProperty('inventory') && output[item]['data_range']>30)
          finalOut.push(output[item])
      }
      fs.writeFile("public/data/ghcnd-stations.json", JSON.stringify(finalOut), 'utf8', function (err) {
       if (err) {
           console.log("An error occured while writing JSON Object to File.");
           return console.log(err);
       }

       console.log("JSON file has been saved.");
    })
  }).catch( e=> { console.log(e); });
}

axios.get(url).then( response => processFile(response)).catch( e=> { console.log(e); })
