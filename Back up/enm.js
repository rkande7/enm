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
	
	/*testCase('Get Configuration', function(done) {
	       
		assertions('userid and token should get and compare with set values', function(done) {
			
			var requestURL = createUrlFor("/service/conf");
			console.log("URL = "+requestURL);
			request({
			  uri: requestURL,
			  method: "GET"
			}, function(error, response, body) {
				console.log(body);
				var response = JSON.parse(body);
				assert.equal(response.user_id , userid);
				assert.equal(response.token , token);
				done();
				
			});
	

		});

	});
	
	testCase('Set Discovery', function(done) {
	       
		assertions('Set discovery to true', function(done) {
			
			var requestURL = createUrlFor("/service");
			console.log("URL = "+requestURL);
			request({
			  uri: requestURL,
			  method: "PUT",
			  json: {
				"DiscoveryStarted": true
			  }
			}, function(error, response, body) {
				
				assert.equal(body.discoverystarted , true);
				done();
			  
			});
	

		});

	});
	
	testCase('Stop Discovery', function(done) {
	       
		assertions('Stop discovery to true', function(done) {
			
			var requestURL = createUrlFor("/service");
			console.log("URL = "+requestURL);
			request({
			  uri: requestURL,
			  method: "PUT",
			  json: {
				"DiscoveryStarted": false
			  }
			}, function(error, response, body) {
				
				assert.equal(body.discoverystarted , false);
				done();
			  
			});
	

		});

	});
	
	
	testCase('Get all edge node devices', function(done) {
	       
		assertions('Get all edge node devices and check is there are any A0 family', function(done) {
			
			var requestURL = createUrlFor("/devices");
			console.log("URL = "+requestURL);
			request({
			  uri: requestURL,
			  method: "GET"
			}, function(error, response, body) {
				body = JSON.parse(body);
				console.log(body);
				
				assert.isNotNull(body);
				var a0devicesFound = false;
				for(var i=0;i< body.length;i++)
				{
					var device = body[i];
					console.log("\n device "+i+" details = "+ JSON.stringify(device));
					if(device.manufacturermodelnum == "ARTIK-030" && device.state == "Online"){
						
						a0devicesFound = true;
						
					}
				}
				assert.equal(a0devicesFound, true);
				done();
				
				
			});
	

		});

	});
	
	
	testCase('registerDevice', function(done) {
	       
		assertions('registerDevice should set uuid and dtid', function(done) {
            var name = "Artik0-Radhika";
			var requestURL = createUrlFor("/service/AKCProvision");
			console.log("URL = "+requestURL);
				request({
	               uri: requestURL,
	               json: {
					"uuid": userid,
					"dtid": dtid
				   },
	               method: "POST",
					"name": name
                  
	            }, function(error, response, body) {
					console.log(body);
					assert.isNotNull(body);
				    assert.equal(body.success, true);
				    done();
				});
		});

	});
	
	testCase('deleteDevice', function(done) {
	       
		assertions('deleteDevice', function(done) {
			var requestURL = createUrlFor("/service/AKCProvision");
			console.log("URL = "+requestURL);
				request({
					uri: requestURL,
					method: "DELETE",
					json: {
						"uuid": userid
					}
				}, function(error, response, body) {
					console.log(body);
					assert.isNotNull(body);
					assert.equal(body.success, true);
				    done();
				});
		});

	});
	
	testCase('getFirmwareVersionForUUID', function(done) {
	       
		assertions('getFirmwareVersionForUUID', function(done) {
			var requestURL = createUrlFor("/devices");
			    requestURL = requestURL +"/"+ userid + "/firmware"
			console.log("URL = "+requestURL);
				request({
	              uri: requestURL,
	              method: "GET"
	            }, function(error, response, body) {
					assert.isNotNull(body); 
                    done();
	            });
		});

	});
	
	testCase('sendMessages', function(done) {
	       
		assertions('sendMessages', function(done) {
			var requestURL = createUrlFor("/devices/"+dtid+"/messages");
			console.log("URL = "+requestURL);
				request({
					uri: requestURL,
					method: "POST",
					json: {
						"data": {"reboot": true }
					}
				}, function(error, response, body) {
					console.log(body);
					assert.isNotNull(body);
                    assert.equal(body.success, true);
                    done();
					
				});
		});

	});
	
	testCase('sendActions', function(done) {
	       
		assertions('sendActions', function(done) {
			var requestURL = createUrlFor("/devices/"+dtid+"/messages");
			console.log("URL = "+requestURL);
				request({
					uri: requestURL,
					method: "POST",
					json: {
						"data": {"actions":[{"name":"setOn"}]} 
					}
				}, function(error, response, body) {
					console.log(body);
					assert.isNotNull(body);
                     assert.equal(body.success, true);
                    done();
					
				});
		});

	
});

testCase('upgradeFirmware', function(done) {     
		assertions('upgradeFirmware', function(done) {
	console.log("---------- upgrade firmware ----------");
	var child;
	var requestURL = createUrlFor("/devices");
	requestURL = requestURL +"/"+ userid + "/firmware"
	
	var cmd = "curl "+requestURL+" --upload-file "+filePath;
	console.log(cmd);
	child = exec(cmd,
		function (error, stdout, stderr) {
            assert.isNotNull(stdout);
			var response = JSON.parse(stdout);
            assert.isNotNull(response);
			assert.equal(response.success, true);
					
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








