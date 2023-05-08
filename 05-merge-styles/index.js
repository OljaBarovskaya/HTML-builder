let fs = require('fs');
let path = require('path');

let data = '';


let fromPath = path.resolve(__dirname,  'styles' );

fs.readdir(fromPath,  { withFileTypes: true }, (err, filesFrom) => { 
  if (err) 
    {console.log(err);}
    let cssArr = [];
    filesFrom.forEach((file) =>{
      let currentPath = path.resolve(__dirname, 'styles', file.name);
      let extension = path.extname(currentPath);
      if(file.isFile() && extension === '.css'){
        cssArr.push(file.name);
      } 
    })
    const output = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'bundle.css'));
    cssArr.forEach((file) => {
      const input = fs.createReadStream(path.resolve(__dirname, 'styles', file), 'utf-8');
      input.on('data', data => output.write(data));
      console.log(file)
    })
    
})