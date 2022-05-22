const fs = require('fs');
const { stdin, stdout } = require('process');

const output = fs.createWriteStream('02-write-file/description.txt');
stdout.write('write anything\n');

stdin.on('data', (data) => {
	if (data.toString == 'exit\r\n') {
		process.exit();
	}
	if (
		process.on('SIGINT', () => {
			process.exit();
		})
	)
		output.write(data);
});

process.on('exit', (e) => {
	if (e === 0) {
		stdout.write('Goodluck!');
	} else {
		stdout.write('error ' + e);
	}
});
