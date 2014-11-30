var https = require('https');
var crypto = require('crypto');

// Event Hubs parameters
console.log('----------------------------------------------------------------------');
console.log('Please ensure that you have modified the values for: namespace, hubname, partitionKey, eventHubAccessKeyName');
console.log('Please ensure that you have created a Shared Access Signature Token and you are using it in the code')
console.log('----------------------------------------------------------------------');
console.log(''); 

var namespace = 'RobEichDevEventHub-ns';
var hubname ='demoeventhub';
var partitionKey = 'mytessel';
var eventHubAccessKeyName = 'EventHubKey';
var createdSAS = 'SharedAccessSignature sr=https%3A%2F%2FRobEichDevEventHub-ns.servicebus.windows.net%2Fdemoeventhub%2Fpublishers%2Fmytessel%2Fmessages&sig=cmwmWeUD%2FBvXC%2FnzgPqbe1Kx4TB8NrksSZrOQK%2FjbaA%3D&se=1417774602&skn=EventHubKey';

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
