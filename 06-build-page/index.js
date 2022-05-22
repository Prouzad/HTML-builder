const fs = require('fs');
const path = require('path');

fs.mkdir(
	path.join(__dirname, 'project-dist'),
	{ recursive: true },
	(err) => err
);

let copyAssets = path.join(__dirname, 'project-dist', 'assets');
fs.mkdir(copyAssets, { recursive: true }, (err) => err);

function copyFileFunc(item) {
	fs.readdir(item, (err, files) => {
		if (err) return err;
		files.forEach((file) => {
			fs.copyFile(item + '/' + file, copyAssets + file, (err) => err);
		});
	});
}

copyFileFunc('06-build-page/assets');
