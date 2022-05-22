const fs = require('fs');
const path = require('path');
const fileBund = fs.createWriteStream(
	path.join(__dirname, 'project-dist', 'bundle.css')
);
function copyStyles(item) {
	fs.readdir(item, (err, files) => {
		if (err) return err;
		files.forEach((file) => {
			let forma = path.extname(item + file);
			if (forma == '.css') {
				appendCssStyles(file);
			}
		});
	});
}

function appendCssStyles(item) {
	const rs = fs.createReadStream(path.join(__dirname + '/styles/' + item));
	rs.pipe(fileBund);
	rs.on('error', (err) => console.log(err));
}

copyStyles('05-merge-styles/styles');
