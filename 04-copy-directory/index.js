let fs = require('fs');
let path = require('path');

let toPath = path.resolve(__dirname, 'files-copy');
let fromPath = path.resolve(__dirname,  'files' );

fs.mkdir(toPath, () => {
  console.log('Directory created successfully!');
});

fs.readdir(fromPath,  { withFileTypes: true }, (err, filesFrom) => { 
  if (err) 
    {console.log(err);} 
    let arrNames = [];
  filesFrom.forEach(file => {
   let fromFullPath = path.resolve(__dirname,  'files', file.name );
   let toFullPath = path.resolve(__dirname, 'files-copy',file.name);
   arrNames.push(file.name)
    fs.copyFile(fromFullPath, toFullPath, () =>
    console.log(`file ${fromFullPath} copied to ${toFullPath}`));
  })
  
  fs.readdir(toPath,  { withFileTypes: true }, (err, filesTo) => { 
    if (err) 
    {console.log(err);}
    filesTo.forEach(file => {
      if(!arrNames.includes(file.name)){
        let toFullPath = path.resolve(__dirname, 'files-copy', file.name);
        fs.unlink(toFullPath,   err => {
          if(err) throw err;
        })
      }
    }) 
  })    
})      








