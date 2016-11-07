const fs = require('fs');
const socks = require('./data/socks.json');

yearHistogram = {}
for (var i = 0; i < socks.length; i++) {
  var sock = socks[i];
  var year = new Date(Date.parse(sock.completed)).getFullYear();
  if (yearHistogram[year] !== undefined) {
    yearHistogram[year].push(sock);
  } else {
    yearHistogram[year] = [ sock ];
  }
}

for (var year in yearHistogram) {
  if (yearHistogram.hasOwnProperty(year)) {
    console.log("{ name: " + year + ", value: " + yearHistogram[year].length + " },");
  }
}

yarnHistogram = {}
for (var i = 0; i < socks.length; i++) {
  var sock = socks[i];
  fullSock = JSON.parse(fs.readFileSync(`data/${sock.id}.json`, 'utf8'));
  //console.log(fullSock);
  var yarn = 'none';
  if (fullSock.packs[0] != undefined) {
    yarn = fullSock.packs[0].yarn_name;
  }
  if (yarnHistogram[yarn] !== undefined) {
    yarnHistogram[yarn].push(sock);
  } else {
    yarnHistogram[yarn] = [ sock ];
  }
}

for (var year in yarnHistogram) {
  if (yarnHistogram.hasOwnProperty(year)) {
    console.log("{ name: \"" + year + "\", value: " + yarnHistogram[year].length + " },");
  }
}