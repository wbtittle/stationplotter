# stationplotter

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

I have made scripts to run to go get support files from the rootset so you don't have to devote cycles to transforming the txt files to json.

These are the files that can be processed with scripts/loadfiles.js

countries
states
stations

command to process the file is

node scripts/loadfiles.js [name]

But the stations are a little problematic so I have one specifically for them.

the command for stations is.

node scripts/loadstations.js
