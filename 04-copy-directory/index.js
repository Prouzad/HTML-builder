const fs = require('fs');
const path = require('path');
const copyFileDir = path.join(__dirname, 'files-copy/');
fs.mkdir(copyFileDir, { recursive: true }, (err) => err);

function copyFileFunc(item) {
	fs.readdir(item, (err, files) => {
		if (err) return err;
		files.forEach((file) => {
			fs.copyFile(item + '/' + file, copyFileDir + file, (err) => err);
		});
	});
	console.log(`Операция прошла успешно`);
}

copyFileFunc('04-copy-directory/files');
