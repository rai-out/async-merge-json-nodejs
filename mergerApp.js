var fs = require('fs');
var async = require('async');
var bothPeople = {people1: "/people1.json", people2: "/people2.json"};
var configs = {};

async.forEachOf(bothPeople, function (value, key, callback) {
  fs.readFile(__dirname + value, "utf8", function (err, data) {
    if (err) return callback(err);
    try {
      configs[key] = JSON.parse(data);
    } catch (e) {
      return callback(e);
    }
    callback();
  })
}, function (err) {
	  if (err) console.error(err.message);
	  // configs is now a map of JSON data
	  // doSomethingWith(configs);
		fs.writeFile('bothPeopleMerged.txt', `${configs.people1},${configs.people2}`, function (err) {
		  if (err) return console.log(err);
		  console.log('Finished Writing File');
		});
})
