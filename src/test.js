function readFile(filePath) {
  var fs = require('fs');
  fs.readFile(filePath, 'utf-8', function(err, data) {
    if (err) {
      console.log('Error:', err);
      return;
    }
    console.log('File contents:', data);
  });
}

readFile()