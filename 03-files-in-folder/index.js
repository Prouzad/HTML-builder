const path = require('path');
const fs = require('fs');

// console.log(path.extname('03-files-in-folder/secret-foldeer/text.txt'));
function readFile(item) {
	fs.readdir(item, { withFileTypes: true }, (err, files) => {
		if (err) return console.log(err);
		for (let file of files) {
			if (file.isFile()) {
				let str = '';
				let fileName = file.name.split('.')[0];
				let fileFormat = path
					.extname(`03-files-in-folder/secret-folder/${file.name}`)
					.split('.')
					.join('');
				let sizeFile = '';

				fs.stat(
					`03-files-in-folder/secret-folder/${file.name}`,
					(err, stats) => {
						if (err) return console.log(err);
						sizeFile = stats.size;
						str = fileName + ` - ` + fileFormat + ` - ` + sizeFile;

						console.log(str);
					}
				);
			}
		}
	});
}

readFile('03-files-in-folder/secret-folder');
