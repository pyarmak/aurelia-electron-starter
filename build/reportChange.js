// outputs changes to files to the console
exports.reportChange = function(event){
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
};
