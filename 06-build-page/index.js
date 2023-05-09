const fs = require('fs');
const path = require('path');

let templatePath = path.resolve(__dirname, 'template.html');
let componentsPath = path.resolve(__dirname, 'components');



let componentsArr = [];

let directoryPath = path.resolve(__dirname, 'project-dist');

fs.mkdir(directoryPath, () => {
  console.log('Directory created successfully!');
});

const stream = fs.createReadStream(templatePath, 'utf-8');

stream.on('data', data2 =>  {
  fs.readdir(componentsPath,  { withFileTypes: true }, (err, files) => { 
    if (err) 
      console.log(err); 
    else { 
      files.forEach(file => {
        componentsArr.push(file.name);      
      });
    }
      
    componentsArr.forEach(component => {
      let componentsFilesPath = path.resolve(__dirname, 'components', component);
      const input = fs.createReadStream(componentsFilesPath, 'utf-8');  
      input.on('data', data => {
      let b = `{{${component.slice(0, -5)}}}`
      data2 = data2.replace(b, data);
      const output = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'index.html'));
      output.write(data2);
      })      
    })
   })
})

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
    const output = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'styles.css'));
    cssArr.forEach((file) => {
      const input = fs.createReadStream(path.resolve(__dirname, 'styles', file), 'utf-8');
      input.on('data', data => output.write(data));
    })
})

let toPath2 = path.resolve(__dirname, 'project-dist', 'assets');
let fromPath2 = path.resolve(__dirname,  'assets' );

console.log(fromPath2)
 
let assets = 'assets';

function copyFiles (fromPathCurrent, folderName, toPath){
  console.log(`this one ${fromPathCurrent}`)
  console.log(folderName)
  console.log(toPath)
  fs.mkdir(toPath, () => {
    console.log('Directory created successfully!');
  });
  fs.readdir(fromPathCurrent,  { withFileTypes: true }, (err, filesFrom) => { 
  if (err) {
    console.log(err);
  } 
    let arrNames = [];
    filesFrom.forEach(file => {
      if(file.isFile()){
        let fromFullPath = path.join(__dirname,  `${folderName}`, file.name );
        let toFullPath = path.join(__dirname, 'project-dist', `${folderName}`, file.name);
        arrNames.push(file.name)
         fs.copyFile(fromFullPath, toFullPath, () =>
         console.log(`file ${fromFullPath} copied to ${toFullPath}`));
      } else {
        let currentFolder = `\\${assets}\\${file.name}`;
        let fromPath = path.join(__dirname, currentFolder );
        
        let toPath = path.join(__dirname, 'project-dist', currentFolder);
        copyFiles(fromPath, currentFolder, toPath);
      }
    })   
})      
}
copyFiles(fromPath2, assets, toPath2)
