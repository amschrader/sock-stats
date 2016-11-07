const secrets = require('./secrets.js');
const request = require('request');
const jsonfile = require('jsonfile');

jsonfile.spaces = 2;
var baseUrl = "https://api.ravelry.com/projects/amschrader/list.json";
var auth = "Basic " + new Buffer(secrets.username + ":" + secrets.password).toString("base64");

request({
    url: `https://api.ravelry.com/projects/amschrader/list.json`,
    headers: {
      "Authorization": auth
    }
  },
  function(error, response, body) {
    if (error) {
      console.log(error)
    } else {
      var json = JSON.parse(body);
      var projects = json.projects;
      processProjects(projects);
    }
  }
);

var processProjects = function(projects) {
  // write to file
  jsonfile.writeFile('data/projects.json', projects, function (error) {
    if (error) {
      console.error(error)
    }
  });

  // Filter only socks
  var socks = projects.filter(function(project) {
    return project.tag_names.indexOf('socks') > -1;
  });

  jsonfile.writeFile('data/socks.json', socks, function (error) {
    if (error) {
      console.error(error)
    }
  });

  // request details for each sock
  socks.forEach(sock => requestProjectDetails(sock));
}

var requestProjectDetails = function(sock) {
  request({
      url: `https://api.ravelry.com/projects/amschrader/${sock.id}.json`,
      headers: {
        "Authorization": auth
      }
    },
    function(error, response, body) {
      if (error) {
        console.log(error)
      } else {
        var json = JSON.parse(body);
        var project = json.project;
        processProject(project);
      }
    }
  );
}

var processProject = function(project) {
  jsonfile.writeFile(`data/${project.id}.json`, project, function (error) {
    if (error) {
      console.error(error)
    }
  });
}
