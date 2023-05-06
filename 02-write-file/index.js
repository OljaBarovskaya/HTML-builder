const fs = require('fs');
const path = require('path');

let neededPath = path.resolve(__dirname, 'destination.txt');
fs.appendFile(neededPath, '', function (err) {
  if (err) throw err;
});

const { stdin, stdout } = process;
stdout.write('Приветствую Вас! Введите текст \n');

process.on('SIGINT', ()=> {
  stdout.write('Удачи в изучении Node.js!');
  process.exit(0);
});

stdin.on('data', data => {
  if (data.toString().trim() == 'exit'){
    stdout.write('Удачи в изучении Node.js!')
    process.exit();
  } else {
    fs.appendFile(neededPath, data, function (err) {
      if (err) throw err;
    })
  }
}
);

