const fs = require('fs');
const request = require('request');
const readLine = require('readline');
const stdin = process.stdin;
const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdin
});  
stdin.setRawMode(true);
stdin.setEncoding('utf8');

const web1 = process.argv.slice(2)[0];
const web2 = process.argv.slice(2)[1];


request(web1, (error, response, body) => {
  if (error) {
    console.log('Please input correct address.');
    rl.close();
  } else {
    fs.access(web2, fs.F_OK, (err) => {
      if (!err) {
        rl.question('File existed. Do you want to overwrite it? (Y/N)', (answer) => {
          if (answer === 'N' || answer === 'n') {
            rl.close();
          } else if (answer === 'Y' || answer === 'y') {
            fs.writeFile(web2, body, function(err) {
              if (err) {rl.close();}
              else {
                console.log('Overwritten successfully!');
                rl.close();
              }
            });
          } else throw err;
        });
      } else {
        fs.writeFile(web2, body, function(err) {
          if (err) {
            console.log('Invalid path')
            rl.close();
          } else {
            console.log('File saved');
            rl.close();
          }
        });
      }
    });  
  }
});

