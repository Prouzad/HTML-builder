const fs = require('fs/promises');
const path = require('path');

const copyFolder = path.join(__dirname, 'files-copy');

async function copyDir(item) {
	fs.rm(copyFolder, { recursive: true, force: true }).then(() => {
		fs.mkdir(copyFolder, { recursive: true });
		fs.readdir(item, { withFileTypes: true }).then((files) => {
			files.forEach((file) => {
				if (file.isFile()) {
					let pathFile = path.join(item, file.name);
					let newFile = path.join(copyFolder, file.name);
					fs.copyFile(pathFile, newFile);
				}
			});
		});
	});
}

copyDir(path.join(__dirname, 'files'));
