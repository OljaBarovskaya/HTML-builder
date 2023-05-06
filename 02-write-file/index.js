const fs = require('fs');
const path = require('path');

let neededPath = path.resolve(__dirname, 'destination.txt');
fs.appendFile(neededPath, '', function (err) {
  if (err) throw err;
});

const { stdin, stdout } = process;
stdout.write('Приветствую Вас! Введите текст \n');

process.on('exit', () => stdout.write('Удачи в изучении Node.js!'));

stdin.on('data', data => {
  if (data.toString().trim() == 'exit'){
    process.exit();
  } else {
    fs.appendFile(neededPath, data, function (err) {
      if (err) throw err;
    })
  }
}
);

