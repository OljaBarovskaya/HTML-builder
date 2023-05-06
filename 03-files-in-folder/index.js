const path = require('path'); 
const fs = require('fs'); 

let neededPath = path.resolve(__dirname, 'secret-folder'); 

fs.readdir(neededPath,  { withFileTypes: true }, (err, files) => { 
  if (err) 
    console.log(err); 
  else { 
    for (let i = files.length - 1; i >= 0; i--) {
      if(!files[i].isFile()){
        files.splice(i,1);
      }
    }
  } 
  

  files.forEach(file => { 
    let currentPath = path.resolve(__dirname, 'secret-folder', file.name);   
    fs.stat(currentPath, (err, stats) => { 
     if (err) throw err;
         size=stats.size;
         let name = file.name.split('.')[0];
         let extension = path.extname(currentPath).substring(1);
         console.log(`${name} - ${extension} - ${size} bytes`); 
     });
  }) 
}) 


