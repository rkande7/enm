//npm install mocha validator chai mochawesome request
//source enm_test.conf


var testCase   = require('mocha').describe;
var pre        = require('mocha').before;
var preEach    = require('mocha').beforeEach;
var post       = require('mocha').after;
var postEach   = require('mocha').afterEach;
var assertions = require('mocha').it;
var assert     = require('chai').assert;
var validator  = require('validator');
var exec       = require('child_process').execSync;
var request = require("request");
var exec = require('child_process').exec;


var registeredDeviceList = [];


var ip = process.env.IP;
var userid = process.env.USERID;
var token = process.env.TOKEN;
var dtid = process.env.DTID;
var latestFwPath = process.env.LATEST_FW_PATH;



testCase('Edge node manager testing', function() {

	testCase('Set Configuration', function(done) {
	       
		assertions('userid and token should set', function(done) {
			dtid = process.env.DTID;
			var requestURL = createUrlFor("/service/conf");
			console.log("URL = "+requestURL);
            console.log("token ="+token);
            console.log("user_id = "+user_id);
			request({
			  uri: requestURL,
			  method: "PUT",
			  json: {
				"token": token,
				"user_id":userid
			  }
			}, function(error, response, body) {
			  console.log(body);
			  assert.equal(body.success, true);
			  assert.isNotNull(body);
			  done();
			});
          });

         });
});

//default config
console.log("Starting Edge node manager testing");

/*
Function to create request URL for Rest API request
*/
function createUrlFor(path){
	var url = "http://"+ip+":80/v1.0"+path;
	return url;
}








