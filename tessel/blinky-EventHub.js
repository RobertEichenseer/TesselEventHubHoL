var https = require('https');
var crypto = require('crypto');

// Event Hubs parameters
console.log('----------------------------------------------------------------------');
console.log('Please ensure that you have modified the values for: namespace, hubname, partitionKey, eventHubAccessKeyName');
console.log('Please ensure that you have created a Shared Access Signature Token and you are using it in the code')
console.log('----------------------------------------------------------------------');
console.log(''); 

var namespace = 'YourNameSpaceHere';
var hubname ='YourHubNameHere';
var partitionKey = 'mytessel';
var eventHubAccessKeyName = 'YourEventHubKeyNameHere';
var createdSAS = 'YourSharedAccessKeyTokenHere';

console.log('Namespace: ' + namespace);
console.log('hubname: ' + hubname);
console.log('partitionKey: ' + partitionKey);
console.log('eventHubAccessKeyName: ' + eventHubAccessKeyName);
console.log('SAS Token: ' + createdSAS);
console.log('----------------------------------------------------------------------');
console.log('');
 
// Payload to send
var payload = '{\"Temperature\":\"37.0\",\"Humidity\":\"0.4\"}';

 
// Send the request to the Event Hub
var options = {
  hostname: namespace + '.servicebus.windows.net',
  port: 443,
  path: '/' + hubname + '/publishers/' + partitionKey + '/messages',
  method: 'POST',
  headers: {
    'Authorization': createdSAS,
    'Content-Length': payload.length,
    'Content-Type': 'application/atom+xml;type=entry;charset=utf-8'
  }
};

var req = https.request(options, function(res) {
  console.log('----------------------------------------------------------------------');
  console.log("statusCode: ", res.statusCode);
  console.log('----------------------------------------------------------------------');
  console.log('');
  res.on('data', function(d) {
    process.stdout.write(d);
  });
});
 
req.on('error', function(e) {
  console.log('error');
  console.error(e);
});
 
req.write(payload);
req.end();
